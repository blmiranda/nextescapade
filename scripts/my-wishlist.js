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
  let emptyList = document.getElementsByClassName("empty-list")[0];
  let itemsList = document.getElementsByClassName("items-list")[0];

  username.innerText = data.userAuth.email;

  if (data.userData.length > 0) {
    emptyList.classList.remove("active");
    itemsList.classList.add("active");

    data.userData.forEach((item) => {
      let codeBlock = `<div class="item">
          <div class="photo"></div>

          <div class="details">
              <h2 class="title">${item.id}</h2>
              <hr>
              <p class="description">${item.data().description}</p>
          </div>

          <div class="trash">
              <i class="fa-regular fa-trash-can fa-xl" onclick="openDeleteConfirmation(this)"></i>
          </div>
      </div>`;

      itemsList.innerHTML += codeBlock;
    });
  } else {
    emptyList.classList.add("active");
    itemsList.classList.remove("active");
  }
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

function openCreateWindow() {
  createPopup.classList.add("active");
  createMenu.classList.add("active");
}

function closeCreateWindow() {
  createPopup.classList.remove("active");
  createMenu.classList.remove("active");
}

function createCategory() {
  let categoryName = document.getElementById("category-name");
  let categoryDescription = document.getElementById("category-description");

  if (categoryName.value && categoryDescription.value != "") {
    newCategory(categoryName.value, categoryDescription.value);
  } else {
    alert("Oups! There seems to be some empty fields!");
  }
}

/*
========================
POPUP DELETE WINDOW
========================
*/

let deletePopup = document.getElementsByClassName("delete-popup")[0];
let deleteMenu = document.getElementsByClassName("delete-menu")[0];
let selectedCategory;

function openDeleteConfirmation(element) {
  deletePopup.classList.add("active");
  deleteMenu.classList.add("active");

  selectedCategory =
    element.parentNode.parentNode.childNodes[3].firstElementChild.innerText;
}

function closeDeleteConfirmation() {
  deletePopup.classList.remove("active");
  deleteMenu.classList.remove("active");
}

function deleteCategory() {
  deleteExistingCategory(selectedCategory);
}
