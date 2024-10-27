import { Chart } from 'chart.js/auto';
import { fetchData } from '../../main.js';

let currentChart = null;
let currentClubChart = null;

const ctxProgression = document.getElementById('overallChart').getContext('2d');
const ctxClub = document.getElementById('clubChart').getContext('2d');

const fullClubNames = {
  portugal: 'Portugal National Team',
  madeira: 'Sporting CP',
  manchester: 'Manchester United',
  madrid: 'Real Madrid',
  turin: 'Juventus',
  riyadh: 'Al-Nassr'
};

function goalChart(years, goals) {
  return new Chart(ctxProgression, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Total Goals by Year',
          data: goals,
          fill: false,
          borderColor: '#de7835',
          tension: 0.3,
          pointStyle: 'circle',
          pointRadius: 5,
          backgroundColor: '#ffffff',
          pointHoverRadius: 10
        }
      ]
    },
    options: chartOptions('Goals Scored')
  });
}

function assistChart(years, assists) {
  return new Chart(ctxProgression, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Total Assists by Year',
          data: assists,
          fill: false,
          borderColor: '#4287f5',
          tension: 0.3,
          pointStyle: 'circle',
          pointRadius: 5,
          backgroundColor: '#ffffff',
          pointHoverRadius: 10
        }
      ]
    },
    options: chartOptions('Assists Given')
  });
}

function appearanceChart(years, appearances) {
  return new Chart(ctxProgression, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Total Appearances by Year',
          data: appearances,
          fill: false,
          borderColor: '#4fc949',
          tension: 0.3,
          pointStyle: 'circle',
          pointRadius: 5,
          backgroundColor: '#ffffff',
          pointHoverRadius: 10
        }
      ]
    },
    options: chartOptions('Matches Played')
  });
}

function clubChart(clubname, seasons, goals, linecolor) {
  return new Chart(ctxClub, {
    type: 'line',
    data: {
      labels: seasons,
      datasets: [
        {
          label: `Goals for ${fullClubNames[clubname] || clubname}`,
          data: goals,
          fill: false,
          borderColor: linecolor,
          tension: 0.3,
          pointStyle: 'circle',
          pointRadius: 5,
          backgroundColor: '#ffffff',
          pointHoverRadius: 10
        }
      ]
    },
    options: chartOptions('Goals Scored')
  });
}

function chartOptions(yAxisLabel) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        titleFont: { weight: 'bold', family: 'Roboto Condensed', size: 16 },
        padding: 10,
        caretSize: 0,
        caretPadding: 15,
        bodyFont: { family: 'Roboto Condensed', size: 14 },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: 'black',
        bodyColor: 'black',
        displayColors: false
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
          color: 'white',
          font: {
            family: 'Roboto Condensed',
            size: 16
          }
        },
        grid: {
          color: '#212121'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          color: 'white',
          font: {
            family: 'Roboto Condensed',
            size: 16
          }
        },
        grid: {
          color: '#212121'
        }
      }
    }
  };
}

function clearChart(chartRef) {
  if (chartRef) {
    chartRef.destroy();
  }
}

const progressionBar = document.querySelectorAll('.options button');
const statFunctions = {
  goals: (data, years) => goalChart(years, Object.values(data.overall.goals)),
  assists: (data, years) => assistChart(years, Object.values(data.overall.assists)),
  appearances: (data, years) => appearanceChart(years, Object.values(data.overall.apps))
};

progressionBar.forEach(item => {
  item.addEventListener('click', function () {
    progressionBar.forEach(button => button.classList.remove('active'));
    item.classList.toggle('active');

    const statType = item.getAttribute('data-stat');

    fetchData()
      .then(data => {
        const years = Object.keys(data.overall.goals);
        clearChart(currentChart);

        if (statFunctions[statType]) {
          currentChart = statFunctions[statType](data, years);
        }
      })
      .catch(console.error);
  });
});

document.querySelector('.options button[data-stat="goals"]').click();
window.addEventListener('resize', () => {
  document.querySelector('.options button[data-stat="goals"]').click();
});

const clubButtons = document.querySelectorAll('.club-options button');

clubButtons.forEach(button => {
  button.addEventListener('click', function () {
    clubButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.toggle('active');

    const clubname = button.getAttribute('data-club');
    let linecolor;

    switch (clubname) {
      case 'portugal':
        linecolor = '#E42518';
        break;
      case 'madeira':
        linecolor = '#8B4513';
        break;
      case 'manchester':
        linecolor = '#DA020E';
        break;
      case 'madrid':
        linecolor = '#004996';
        break;
      case 'turin':
        linecolor = '#FFFFFF';
        break;
      case 'riyadh':
        linecolor = '#FED32C';
        break;
      default:
        linecolor = '#000000';
    }

    fetchData()
      .then(data => {
        let goals;
        let years;
        if (clubname == 'portugal') {
          const stats = data.international.byYear.goals;
          years = Object.keys(stats);
          goals = Object.values(stats);
        } else {
          const clubGoals = data.clubs[clubname].goals;
          years = Object.keys(clubGoals);
          goals = Object.values(clubGoals);
        }
        clearChart(currentClubChart);
        currentClubChart = clubChart(clubname, years, goals, linecolor);
      })
      .catch(console.error);
  });
});

document.querySelector('.club-options button[data-club="portugal"]').click();
window.addEventListener('resize', () => {
  document.querySelector('.club-options button[data-club="portugal"]').click();
});
