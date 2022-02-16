// INITIALIZING FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD61MQ18ibGkA_wsxB_KG2Lc5Jpp0qZY3Q",
  authDomain: "wishingto.firebaseapp.com",
  projectId: "wishingto",
  storageBucket: "wishingto.appspot.com",
  messagingSenderId: "994257848607",
  appId: "1:994257848607:web:52501d863d9c934465c82a",
  measurementId: "G-K8KJ559BXZ",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

/*
========================
AUTHENTIFICATION
========================
*/

// VERIFY CURRENT USER EXISTENCE
function verifyCurrentUser() {
  auth.onAuthStateChanged(() => {
    if (auth.currentUser != null) {
      location.replace("../pages/my-wishlist.html");
    }
  });
}

// REGISTRATION
function signUp(newUserEmail, newUserPassword) {
  auth
    .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
    .then((user) => {
      if (user) {
        location.replace("../pages/account-created.html");
      }
    })
    .catch((error) => {
      alert(error);
    });
}

// LOGIN
function signIn(userEmail, userPassword) {
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        if (user) {
          location.replace("../pages/my-wishlist.html");
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
}

// LOGOUT
function signOut() {
  auth
    .signOut()
    .then(() => {
      location.replace("../index.html");
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
========================
DATABASE
========================
*/

// GET USER DATA
function fetchUserData() {
  auth.onAuthStateChanged((user) => {
    document.getElementsByTagName(
      "h1"
    )[0].innerHTML = `My wishlist ${user.email}`;
  });
}
