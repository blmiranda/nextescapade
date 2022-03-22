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
const storage = firebase.storage();
const bucketRef = storage.ref();

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
    .then((createdUser) => {
      db.collection("users")
        .doc(createdUser.user.uid)
        .collection("wishlists")
        .doc("ignore")
        .set({})
        .then(() => {
          location.replace("../pages/my-wishlist.html");
        });
    })
    .catch((error) => {
      alert(error);
    });
}

// LOGIN
function signIn(userEmail, userPassword) {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
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
    let data = {};

    data.userAuth = user;

    db.collection("users")
      .doc(user.uid)
      .collection("wishlists")
      .doc("ignore") // useless document to delete
      .delete()
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .collection("wishlists")
          .get()
          .then((snapshot) => {
            data.userData = snapshot.docs;
            integrateData(data);
          });
      });
  });
}

//  CREATE NEW CATEGORY
function newCategory(categoryName, categoryDescription) {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("wishlists")
    .doc(categoryName)
    .set({
      description: categoryDescription,
    })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

//  DELETE CATEGORY
function deleteExistingCategory(selectedCategory) {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("wishlists")
    .doc(selectedCategory)
    .delete()
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
========================
STORAGE
========================
*/
