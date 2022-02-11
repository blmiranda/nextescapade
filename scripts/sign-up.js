function createUser() {
  let newUserEmail = document.getElementById("email").value;
  let newUserPassword = document.getElementById("password").value;

  signUp(newUserEmail, newUserPassword);
}
