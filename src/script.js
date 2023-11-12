const hamburger = document.querySelector(".navbar-toggler");
const stickyTop = document.querySelector(".sticky-top");
const offCanvas = document.querySelector(".offcanvas");
const rootElement = document.querySelector(":root");
const song = document.querySelector("#song");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
let isPlaying = false;
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("name") || "";
const pronoun = urlParams.get("pronoun") || "Bapak/Ibu/Saudara/i";
const nameContainer = document.querySelector(".hero h4 span");

nameContainer.innerText = `${pronoun} ${guestName},`.replace(/ ,$/, ",");
document.querySelector("#name").value = guestName;

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

// turn the value of scrollBehavior back to smooth after the scroll feature was enable and play the audio at the same time
function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // localStorage.setItem("opened", "true");
  playAudio();
}

// if (localStorage.getItem("opened")) {
//   disableScroll();
// }
disableScroll();

// declare the playAudio function that are put inside enableScroll
function playAudio() {
  song.volume = 0.24;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// Giving on/off switch feature on clicking the icon and changing the icon at the same time
audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-pause");
    audioIcon.classList.add("bi-play-circle-fill");
  } else {
    song.play();
    audioIcon.classList.remove("bi-play-circle-fill");
    audioIcon.classList.add("bi-pause");
  }

  isPlaying = !isPlaying;
};

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
