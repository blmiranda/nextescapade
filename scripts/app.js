// INITIALIZING FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyC66WdaLKnrp5dZmKEaLZoAAkpW4SaVFxM",
  authDomain: "nextescapade-ab9d4.firebaseapp.com",
  projectId: "nextescapade-ab9d4",
  storageBucket: "nextescapade-ab9d4.appspot.com",
  messagingSenderId: "95167174641",
  appId: "1:95167174641:web:9ad6fb0b882772ee115650",
  measurementId: "G-06P14KEP7M",
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
      location.replace("../pages/my-destinations.html");
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
          location.replace("../pages/my-destinations.html");
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
          location.replace("../pages/my-destinations.html");
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
      .collection("destinations")
      .doc("ignore") // useless document to delete
      .delete()
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .collection("destinations")
          .get()
          .then((snapshot) => {
            data.userData = snapshot.docs;
            integrateData(data);
          });
      });
  });
}

//  CREATE NEW CATEGORY
function newCategory(categoryName, categoryIMG) {
  bucketRef
    .child(`/Images/${auth.currentUser.uid}/${categoryName}`)
    .child(categoryIMG.name)
    .put(categoryIMG)
    .then((snapshot) => {
      bucketRef
        .child(snapshot.ref.fullPath)
        .getDownloadURL()
        .then((URL) => {
          db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("destinations")
            .doc(categoryName)
            .set({
              imgURL: URL,
            })
            .then(() => {
              location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        });
    });
}

//  DELETE CATEGORY
function deleteExistingCategory(selectedCategory) {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("destinations")
    .doc(selectedCategory)
    .delete()
    .then(() => {
      bucketRef
        .child(`/Images/${auth.currentUser.uid}/${selectedCategory}`)
        .listAll()
        .then((res) => {
          res.items.forEach((item) => {
            bucketRef
              .child(
                `/Images/${auth.currentUser.uid}/${selectedCategory}/${item.name}`
              )
              .delete()
              .then(() => {
                location.reload();
              });
          });
        });
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
