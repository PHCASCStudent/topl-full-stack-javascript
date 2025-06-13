import "./styles.css";
import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadContact from "./contact.js";

function clearContent() {
  document.getElementById("content").innerHTML = "";
}

function setActiveTab(tabId) {
  document
    .querySelectorAll("nav button")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

document.getElementById("home-tab").addEventListener("click", () => {
  clearContent();
  loadHome();
  setActiveTab("home-tab");
});
document.getElementById("menu-tab").addEventListener("click", () => {
  clearContent();
  loadMenu();
  setActiveTab("menu-tab");
});
document.getElementById("contact-tab").addEventListener("click", () => {
  clearContent();
  loadContact();
  setActiveTab("contact-tab");
});

// Load home by default
clearContent();
loadHome();
setActiveTab("home-tab");
