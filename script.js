const rootElem = document.getElementById("root");
const footerEl = document.createElement("footer");
const paragraphEl = document.createElement("p");
const footerLinkEl = document.createElement("a");

paragraphEl.innerText =
  "Please note that the data has (originally) been pulled in from: ";
footerLinkEl.setAttribute("href", "https://www.tvmaze.com/api#licensing");
footerLinkEl.setAttribute("target", "_blank");
footerEl.classList.add("footer-root");
footerLinkEl.innerText = "TV MAZE";

footerEl.append(paragraphEl);
paragraphEl.appendChild(footerLinkEl);
document.body.appendChild(footerEl);

function setup() {
  const allEpisodes = getAllEpisodes();
  getEpisodeOfTvShows(allEpisodes);
}

// Render each episode to the website //
const renderEpisodeToWebsite = (name, season, number, image, summary) => {
  divCardH1El.innerText = `${name} - S${season
    .toString()
    .padStart(2, "0")}E${number.toString().padStart(2, "0")}`;
  imgCardEl.src = `${image.medium}`;
  divCardBodyEl.innerHTML = `${summary}`;

  rootElem.append(divCardEl);
};

// Create all episodes of tv shows //
const getEpisodeOfTvShows = (episodeList) => {
  episodeList.forEach(({ name, season, number, image, summary }) => {
    divCardEl = document.createElement("div");
    divCardEl.classList.add("card");
    divCardH1El = document.createElement("h1");
    divCardH1El.classList.add("card-header");
    imgCardEl = document.createElement("img");
    imgCardEl.classList.add("card-img-top");
    imgCardEl.setAttribute("alt", `A image from ${name}`);
    divCardBodyEl = document.createElement("div");
    divCardBodyEl.classList.add("card-body");
    divCardEl.appendChild(divCardH1El);
    divCardEl.appendChild(imgCardEl);
    divCardEl.appendChild(divCardBodyEl);

    renderEpisodeToWebsite(name, season, number, image, summary);
  });

  // Add and wait for action to remove the watched episode by clicking on corresponding image //
  let imageEl = document.getElementsByClassName("card-img-top");
  Array.from(imageEl).forEach((image) => {
    image.addEventListener("click", (e) => {
      let removeTarget = e.target.parentNode;
      removeTarget.parentNode.removeChild(removeTarget);
    }, false);
  });
};

window.onload = setup;
