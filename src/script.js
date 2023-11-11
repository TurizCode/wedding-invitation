const hamburger = document.querySelector(".navbar-toggler");
const stickyTop = document.querySelector(".sticky-top");
const offCanvas = document.querySelector(".offcanvas");
const rootElement = document.querySelector(":root");

// fixing the sticky navbar (on form of hamburger)
hamburger.addEventListener("click", function () {
  stickyTop.style.overflow = "visible";
});

offCanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// lock the screen scroll for the user at their very first time loading the page
function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";

  localStorage.setItem("opened", "true");
}

if (!localStorage.getItem("opened")) {
  disableScroll();
}

// Form Script: Make the user not dragged into the webApp after submit through button
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Terima kasih telah mengkonfirmasi kehadiran anda!");
    });
  });
});
