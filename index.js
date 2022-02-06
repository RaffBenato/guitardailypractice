const btnGamesEl = document.querySelector(`.btnGames`);
const menuEl = document.querySelector(`.menu`);

btnGamesEl.addEventListener(`click`, function () {
  menuEl.style.display = `flex`;
});
