import constants from "../constants.js";

export default () => {
  let prevScrollPos = window.pageYOffset;

  /** @type {HTMLElement | null} */
  const header = document.querySelector(".header");
  /** @type {NodeListOf<HTMLElement>} */
  const linkNavs = document.querySelectorAll(".header .navigation a");

  window.addEventListener("scroll", () => {
    if (window.innerWidth <= constants.MAX_MOBILE_WIDTH && header) {
      const currentScrollPos = window.pageYOffset;
      header.style.bottom = currentScrollPos > prevScrollPos ? "-100%" : "0";
      prevScrollPos = currentScrollPos;
    }
  });

  const setActiveByHash = () => {
    const currentPage = window.location.hash.slice(1);

    linkNavs.forEach((link) => {
      link.classList.toggle("active", link.id === currentPage);
    });
  };

  linkNavs.forEach((item) => {
    item.addEventListener("click", (event) => {
      const target = event.currentTarget;

      if (!(target instanceof HTMLElement)) return;

      const pageName = target.id;
      if (!pageName) return;

      if (window.location.hash.slice(1) === pageName) return;
      window.location.hash = pageName;
    });
  });

  if (!window.location.hash && linkNavs.length > 0) {
    window.location.hash = linkNavs[0].id;
  } else {
    setActiveByHash();
  }

  window.addEventListener("hashchange", setActiveByHash);
};
