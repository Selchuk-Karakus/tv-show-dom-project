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

let allEpisodes = [];
const allEpisodesCounter = getAllEpisodes().length;

const setup = () => {
  allEpisodes = getAllEpisodes();
  getEpisodeOfTvShows(allEpisodes);
};

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
  rootElem.innerHTML = "";

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
    image.addEventListener(
      "click",
      (e) => {
        let removeTarget = e.target.parentNode;
        removeTarget.parentNode.removeChild(removeTarget);
      },
      false
    );
  });
};

// Create search bar component //
const divSearchEl = document.createElement("div");
divSearchEl.classList.add("search-bar-root");
const inputSearchEl = document.createElement("input");
inputSearchEl.classList.add("search-query");
inputSearchEl.setAttribute("type", "text");
inputSearchEl.setAttribute("placeholder", "Search for any episode");
const paragraphCounterEl = document.createElement("p");
paragraphCounterEl.innerHTML = `Displaying ${allEpisodesCounter} / 0 episodes`;
divSearchEl.appendChild(inputSearchEl);
divSearchEl.appendChild(paragraphCounterEl);
document.body.prepend(divSearchEl);

// Filter out episodes matching search term within episode title or episode summary
const handleSearchQuery = (e) => {
  const searchQuery = e.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter(({ name, summary }) => {
    return (
      name.toLocaleLowerCase().includes(searchQuery) ||
      summary.toLocaleLowerCase().includes(searchQuery)
    );
  });
  getEpisodeOfTvShows(filteredEpisodes);

  const filteredEpisodesCounter = filteredEpisodes.length;
  const para = `${allEpisodesCounter} / ${filteredEpisodesCounter}`;
  paragraphCounterEl.innerHTML = `Displaying ${para} episodes`;
};

inputSearchEl.addEventListener("keyup", handleSearchQuery);

window.onload = setup;
