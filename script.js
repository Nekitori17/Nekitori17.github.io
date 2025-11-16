const DEFAULT_PAGE = "home";
const MAX_MOBILE_WIDTH = 786;

const CHARACTERS = {
  0: {
    name: "Nekitori17",
    palette: "nekitori17",
    hideElements: ["nav a#works"],
  },
  1: {
    name: "Plinkatsu",
    palette: "plinkatsu",
    hideElements: ["nav a#projects"],
  },
};

let prevScrollPos = window.pageYOffset;
window.onscroll = () => {
  if (window.innerWidth <= MAX_MOBILE_WIDTH) {
    const currentScrollPos = window.pageYOffset;
    const header = document.querySelector(".header");
    header.style.bottom = currentScrollPos > prevScrollPos ? "-100%" : "0";
    prevScrollPos = currentScrollPos;
  }
};

let currentPage = DEFAULT_PAGE;
let currentCharacter =
  parseInt(sessionStorage.getItem("character-switch")) || 0;

function initializeCharacter() {
  const character = CHARACTERS[currentCharacter];

  document
    .querySelector("link#color-palette")
    .setAttribute("href", `/css/palettes/${character.palette}.css`);

  updateTitles();
  toggleCharacterElements();
}

function updateTitles() {
  const character = CHARACTERS[currentCharacter];
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  const fullTitle = `${character.name} - ${pageTitle}`;

  document.title = fullTitle;
  document.querySelector(".title h1").innerText = fullTitle;
}

function toggleCharacterElements() {
  const character = CHARACTERS[currentCharacter];

  Object.values(CHARACTERS).forEach((char) => {
    char.hideElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.style.display = "";
      });
    });
  });

  character.hideElements.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
    });
  });
}

EventBus.on("switchCharacter", () => {
  currentCharacter = currentCharacter === 0 ? 1 : 0;

  sessionStorage.setItem("character-switch", currentCharacter);

  const character = CHARACTERS[currentCharacter];

  document
    .querySelector("link#color-palette")
    .setAttribute("href", `/css/palettes/${character.palette}.css`);

  updateTitles();
  toggleCharacterElements();
});

const BASE_SPEED = 40;
const BASE_WIDTH = 412;
window.addEventListener("DOMContentLoaded", () => {
  initializeCharacter();

  document.body.style.backgroundSize = `${-0.05 * window.innerWidth + 100}%`;
  gsap.to(document.body, {
    duration: (BASE_SPEED / BASE_WIDTH) * window.innerWidth,
    backgroundPosition: `${window.innerWidth}px ${window.innerHeight}px`,
    repeat: -1,
    ease: "linear",
  });

  if (window.location.hash) {
    const pageName = window.location.hash.slice(1);
    document
      .querySelector(`.header .navigation #${pageName}`)
      .classList.add("active");
    return loadPage(pageName);
  }

  const pageSession = sessionStorage.getItem("pageSession");
  if (pageSession) {
    document
      .querySelector(`.header .navigation #${pageSession}`)
      .classList.add("active");
    window.location.hash = pageSession;
  }

  document
    .querySelector(`.header .navigation #${DEFAULT_PAGE}`)
    .classList.add("active");
  window.location.hash = DEFAULT_PAGE;
});

const linkNavs = document.querySelectorAll(".header .navigation a");
linkNavs.forEach((item) => {
  item.addEventListener("click", (event) => {
    const pageName = event.currentTarget.id;
    if (window.location.hash.slice(1) == pageName) return;

    linkNavs.forEach((element) => {
      element.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    window.location.hash = pageName;
  });
});

window.addEventListener("hashchange", () => {
  const pageName = window.location.hash.slice(1);
  linkNavs.forEach((element) => {
    element.classList.remove("active");
  });
  document.querySelector(`.navigation a#${pageName}`).classList.add("active");

  loadPage(pageName);
});

async function loadPage(pageName) {
  currentPage = pageName;

  const pageSrc = `/pages/${pageName}/index.html`;
  const containerContent = document.querySelector("main.container");

  const pageContent = await fetch(pageSrc).then((res) => res.text());

  if (!containerContent.innerHTML) document.body.style.overflow = "hidden";

  containerContent.style.cssText = "transform: translateY(50%); opacity: 0";

  updateTitles();

  clearAutoLoadedScripts();
  await delay(500);
  containerContent.innerHTML = pageContent;

  toggleCharacterElements();

  const pageScript = containerContent.querySelectorAll("script#pageScripts");
  for (const script of pageScript) {
    const newScript = document.createElement("script");
    newScript.setAttribute("src", script.src);
    newScript.setAttribute("type", script.type || "text/javascript");
    newScript.setAttribute("id", "pageScripts");

    document.body.appendChild(newScript);
    script.remove();
  }

  sessionStorage.setItem("pageSession", pageName);

  containerContent.style.cssText = "transform: translateY(0); opacity: 1";
}

function clearAutoLoadedScripts() {
  const existPageScript = document.querySelectorAll("script#pageScripts");
  existPageScript.forEach((script) => script.remove());
}
