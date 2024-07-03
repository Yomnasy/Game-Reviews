"use strict";

class Ui {
  constructor() { }
  displayGames(games) {
    let cartona = ``;
    for (let game of games) {

      let { title, thumbnail, short_description, genre, platform, id } = game;
      cartona += `
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div class="game-box h-100" id="${id}" >
                <div class="game-box-body p-3 pb-2">
                  <img
                    class="w-100 h-100 rounded-2"
                    src="${thumbnail}"
                    alt=""
                  />
                  <div
                    class="game-box-content pt-3 d-flex align-items-start justify-content-between "
                  >
                    <h2 class="fs-6">${title}</h2>
                    <p class="px-2 py-1 rounded-2">Free</p>
                  </div>
                  <p class="small opacity-50 text-center">
                  ${short_description}
                  </p>
                </div>
                <footer
                  class="game-box-footer p-2 d-flex align-items-start justify-content-between w-100 "
                >
                  <span class="px-2 py-1 rounded-2 smaller badge-color"
                    >${genre}</span
                  >
                  <span class="px-2 py-1 rounded-2 smaller badge-color"
                    >${platform}</span
                  >
                </footer>
              </div>
            </div>
            `;
    }

    gamesRow.innerHTML = cartona;

    gameCards = document.querySelectorAll(".game-box");

    for (var j = 0; j < gameCards.length; j++) {
      gameCards[j].addEventListener("click", function (e) {
        console.log(this.id);
        console.log(ui);
        getGameDetails(this.id);
      });
    }
  }

  displayDetails(gameDetail) {
    gamesSection.classList.add("d-none");
    nav.classList.add("d-none");
    header.classList.add("d-none");
    detailsSection.classList.remove("d-none");

    console.log(gameDetail);

    let { thumbnail, title, genre, platform, status, description, game_url } =
      gameDetail;

    detailsSection.innerHTML = `
    <div class="d-flex justify-content-between">
          <h1 class="h3">Details Game:</h1>
          <i class="fa-solid fa-xmark fa-2x close-icon opacity-50" id="closeIcon"></i>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="details-img mt-2">
              <img class="w-100" src="${thumbnail}" alt="" />
            </div>
          </div>
          <div class="col-md-8">
            <div class="details-content">
              <div class="d-flex fs-3">
                <p>Title :</p>
                <p class="mx-1">${title}</p>
              </div>
              <div class="d-flex">
                <p>Category :</p>
                <p
                  class="px-2 py-1 mx-1 rounded-2 smaller text-dark fw-bolder detail-badge-color"
                >
                  ${genre}
                </p>
              </div>
              <div class="d-flex">
                <p>Platform :</p>
                <p
                  class="px-2 py-1 mx-1 rounded-2 smaller text-dark fw-bolder detail-badge-color"
                >
                  ${platform}
                </p>
              </div>
              <div class="d-flex">
                <p>Status :</p>
                <p
                  class="px-2 py-1 mx-1 rounded-2 smaller text-dark fw-bolder detail-badge-color"
                >
                  ${status}
                </p>
              </div>

              <p class="description">
                ${description}
              </p>
              <a href="${game_url}" class="text-decoration-none text-light" target="_blank">
              <button class="btn btn-outline-warning text-light">
              Show Game
              </button></a>
            </div>
          </div>
        </div>
    
    `;

    let closeIcon = document.getElementById("closeIcon");
    closeIcon.addEventListener("click", function (e) {
      gamesSection.classList.remove("d-none");
      nav.classList.remove("d-none");
      header.classList.remove("d-none");
      detailsSection.classList.add("d-none");
    });
  }
}

let ui = new Ui();
let navLinks = document.querySelectorAll(".nav-link");
let gameCards;
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let gamesRow = document.getElementById("gamesRow");
let gamesSection = document.getElementById("gamesSection");
let detailsSection = document.getElementById("details");

getGames("mmorpg");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    // console.log(this.id);
    getActiveClass(this.id);
    getGames(this.id);
  });
}

function getActiveClass(id) {
  for (let element of navLinks) {
    if (element.id == id) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
}

async function getGames(category) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "467a8d3013msh9d8242c028fe8c1p1af8dbjsn281d12986c6d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );

    const result = await response.json();
    console.log(result);

    manageClasses();
    ui.displayGames(result);
  } catch (error) {
    console.error(error);
  }
}

/* to remove loader that is by default shown when data are fetched successfully and display header and nav */
function manageClasses() {
  gamesRow.classList.remove("vh-100");
  gamesRow.classList.remove("align-items-center");
  nav.classList.remove("d-none");
  header.classList.remove("d-none");
}

async function getGameDetails(gameId) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "467a8d3013msh9d8242c028fe8c1p1af8dbjsn281d12986c6d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
      options
    );
    const result = await response.json();
    console.log(result);

    ui.displayDetails(result);
  } catch (error) {
    console.error(error);
  }
}
