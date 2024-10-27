import { fetchData } from '../../main.js';

function createTable(data, tableId) {
  const tableContainer = document.getElementById(tableId);

  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  const headers = ['Season', 'Appearances', 'Goals'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  Object.keys(data.apps).forEach(season => {
    const row = document.createElement('tr');

    const seasonCell = document.createElement('td');
    seasonCell.textContent = season;
    row.appendChild(seasonCell);

    const appearanceCell = document.createElement('td');
    appearanceCell.textContent = data.apps[season];
    row.appendChild(appearanceCell);

    const goalsCell = document.createElement('td');
    goalsCell.textContent = data.goals[season];
    row.appendChild(goalsCell);

    table.appendChild(row);
  });

  const totalRow = document.createElement('tr');
  const totalSeasonCell = document.createElement('td');
  totalSeasonCell.textContent = 'Total';
  totalRow.appendChild(totalSeasonCell);

  const totalAppearanceCell = document.createElement('td');
  totalAppearanceCell.textContent = data.total.apps;
  totalRow.appendChild(totalAppearanceCell);

  const totalGoalsCell = document.createElement('td');
  totalGoalsCell.textContent = data.total.goals;
  totalRow.appendChild(totalGoalsCell);

  table.appendChild(totalRow);
  tableContainer.appendChild(table);
}

function createInternationalTable(data, totals) {
  const tableBody = document.querySelector('#internationalTable tbody');

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
                <td>${item.year}</td>
                <td>${item.competitive.apps === null ? '—' : item.competitive.apps}</td>
                <td>${item.competitive.goals === null ? '—' : item.competitive.goals}</td>
                <td>${item.friendly.apps === null ? '—' : item.friendly.apps}</td>
                <td>${item.friendly.goals === null ? '—' : item.friendly.goals}</td>
                <td>${item.total.apps}</td>
                <td>${item.total.goals}</td>
            `;

    tableBody.appendChild(row);
  });

  document.getElementById('totalCompetitiveApps').innerText = totals.competitive.apps;
  document.getElementById('totalCompetitiveGoals').innerText = totals.competitive.goals;
  document.getElementById('totalFriendlyApps').innerText = totals.friendly.apps;
  document.getElementById('totalFriendlyGoals').innerText = totals.friendly.goals;
  document.getElementById('totalOverallApps').innerText = totals.overall.apps;
  document.getElementById('totalOverallGoals').innerText = totals.overall.goals;
}

fetchData()
  .then(data => {
    const laligaStats = data.leagues['laliga'];
    const premierLeagueStats = data.leagues['premier-league'];
    const serieAStats = data.leagues['serie-a'];
    const saudiLeagueStats = data.leagues['saudi-league'];

    createTable(laligaStats, 'laligaTable');
    createTable(premierLeagueStats, 'premierTable');
    createTable(serieAStats, 'serieTable');
    createTable(saudiLeagueStats, 'saudiTable');

    const yearwideData = data.international['data'];
    const total = data.international['total'];
    createInternationalTable(yearwideData, total);
  })
  .catch(console.error);
