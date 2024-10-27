import { fetchData } from '../../main.js';

const updateStats = (sectionClass, stats) => {
  const goalElement = document.querySelector(`.${sectionClass} .goals`);
  const appsElement = document.querySelector(`.${sectionClass} .apps`);

  goalElement.innerHTML = stats.goals;
  appsElement.innerHTML = stats.apps;
};

fetchData()
  .then(data => {
    updateStats('international', {
      goals: data.international.total.overall.goals,
      apps: data.international.total.overall.apps
    });

    updateStats('laliga', {
      goals: data.leagues.laliga.total.goals,
      apps: data.leagues.laliga.total.apps
    });

    updateStats('pl', {
      goals: data.leagues['premier-league'].total.goals,
      apps: data.leagues['premier-league'].total.apps
    });

    updateStats('seriea', {
      goals: data.leagues['serie-a'].total.goals,
      apps: data.leagues['serie-a'].total.apps
    });

    updateStats('ucl', {
      goals: data.leagues.ucl.total.goals,
      apps: data.leagues.ucl.total.apps
    });

    updateStats('overall', {
      goals: data.overall.total.goals,
      apps: data.overall.total.apps
    });
  })
  .catch(console.error);
