// JavaScript for mobile menu toggle
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu ul");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
