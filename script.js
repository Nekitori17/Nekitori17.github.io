let prevScrollPos = window.pageYOffset;

window.onscroll = () => {
  if (window.innerWidth <= 786) {
    const currentScrollPos = window.pageYOffset;
    const header = document.querySelector(".header");
    header.style.bottom = currentScrollPos > prevScrollPos ? "-100%" : "0";
    prevScrollPos = currentScrollPos;
  }
};

const defaultPage = "home";

window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  gsap.to(body, {
    duration: window.innerWidth <= 786 ? 7 : 70,
    backgroundPosition: "200% 200%",
    repeat: -1,
    ease: "linear",
  });

  if (window.location.hash) {
    const pageName = window.location.hash.slice(1)
    document.querySelector(`.header .navigation .${pageName}`).classList.add("active");
    return loadPage(pageName)
  }

  const pageSession = sessionStorage.getItem("pageSession");
  if (pageSession) {
    document.querySelector(`.header .navigation .${pageSession}`).classList.add("active");
    window.location.hash = pageSession
  }

  document.querySelector(`.header .navigation .${defaultPage}`).classList.add("active");
  window.location.hash = defaultPage
});

const linkNavs = document.querySelectorAll(".header .navigation a");

linkNavs.forEach(item => {
  item.addEventListener("click", event => {
    const pageName = event.currentTarget.classList[0];
    if (window.location.hash.slice(1) === pageName) return;

    linkNavs.forEach(element => {
      element.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    window.location.hash = pageName
  });
});

window.addEventListener('hashchange', () => {
  const pageName = window.location.hash.slice(1);

  linkNavs.forEach(element => {
    element.classList.remove("active");
  });
  document.querySelector(`.navigation a.${pageName}`).classList.add("active");

  loadPage(pageName)
});

async function loadPage(pageName) {
  const pageSrc = `/pages/${pageName}/index.html`;
  const containerContent = document.querySelector("div.container");

  containerContent.style.cssText = "transform: translateY(50%); opacity: 0";

  const headerTitle = `Nekitori17 - ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
  document.title = headerTitle;
  document.querySelector(".title h1").innerText = headerTitle;

  clearAutoLoadedScripts()

  const pageContent = await fetch(pageSrc)
    .then(res => {
      if (res.status === 404) {
        window.location = "404.html";
      }
      return res.text();
    })

  originalSetTimeout(() => {
    containerContent.innerHTML = pageContent;
    containerContent.style.cssText = "transform: translateY(0); opacity: 1";

    const pageScript = containerContent.querySelectorAll("script#pageScripts")
    for (const script of pageScript) {
      const newScript = document.createElement("script")
      newScript.setAttribute("src", script.src)
      newScript.setAttribute("type", script.type || "text/javascript")
      newScript.setAttribute("id", "pageScripts")

      document.body.appendChild(newScript)
      script.remove()
    }
  }, 500)
  sessionStorage.setItem("pageSession", pageName);
}

function clearAutoLoadedScripts() {
  TimeoutIntervalManager.clearAll();

  const existPageScript = document.querySelectorAll(`script#pageScript`);
  existPageScript.forEach(script => script.remove());
}