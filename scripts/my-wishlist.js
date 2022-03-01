/*
========================
FETCH USER DATA
========================
*/

window.onload = () => {
  fetchUserData();
};

/*
========================
INTEGRATING DATA
========================
*/

function integrateData(data) {
  let username = document.getElementById("username");
  username.innerText = data.userAuth.email;
}

/*
========================
POPUP LOGOUT WINDOW
========================
*/

let logoutPopup = document.getElementsByClassName("logout-popup")[0];
let logoutMenu = document.getElementsByClassName("logout-menu")[0];

function showMenu() {
  logoutPopup.classList.add("active");
  logoutMenu.classList.add("active");
}

function closeMenu() {
  logoutPopup.classList.remove("active");
  logoutMenu.classList.remove("active");
}

function logOut() {
  signOut();
}

/*
========================
POPUP CREATE WINDOW
========================
*/

let createPopup = document.getElementsByClassName("create-popup")[0];
let createMenu = document.getElementsByClassName("create-menu")[0];

function showCreateWindow() {
  createPopup.classList.add("active");
  createMenu.classList.add("active");
}

function cancelCreation() {
  createPopup.classList.remove("active");
  createMenu.classList.remove("active");
}
