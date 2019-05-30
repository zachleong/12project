import firebase from "firebase/app";
import store from "@/Vuex/store";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCBOySSw3riF7HEgU2rJgp4aONEvxZhwsk",
  authDomain: "vue-firebase-4cc1a.firebaseapp.com",
  databaseURL: "https://vue-firebase-4cc1a.firebaseio.com",
  projectId: "vue-firebase-4cc1a",
  storageBucket: "vue-firebase-4cc1a.appspot.com",
  messagingSenderId: "809699793301"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(`user is ${user.email}`);
    store.commit("setAuthUser", true);
    store.commit("setUserEmail", user.email);
    store.commit("setUserName", user.displayName);
    getProfilePictureURL(user.displayName).then(url => {
      store.commit("setUserPictureURL", url);
    });
    // store.commit("setUserPictureURL", user.photoURL);
  } else {
    console.log("not signed in");
    store.commit("setAuthUser", false);
  }
});
export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      store.commit("setAuthUser", false);
      store.commit("setUserEmail", "");
    })
    .catch(error => {
      console.log(error);
    });
};
const projectFromDoc = doc => {
  return {
    id: doc.id,
    title: doc.data().projectTitle,
    desc: doc.data().projectDesc,
    userID: doc.data().userID,
    userName: doc.data().userName
  };
};
export const getProjectFromDB = docID => {
  const db = firebase.firestore();
  return db
    .collection("Projects")
    .doc(docID)
    .get()
    .then(doc => {
      const newproject = projectFromDoc(doc);
      return newproject;
    });
};
export const getProjectsFromDB = col => {
  const db = firebase.firestore();
  return db
    .collection(col)
    .get()
    .then(allDocs => {
      const projects = [];
      allDocs.forEach(doc => {
        const newproject = projectFromDoc(doc);
        projects.push(newproject);
      });
      return projects;
    });
};
export const setProject = project => {
  const db = firebase.firestore();
  project.userID = firebase.auth().currentUser.uid;
  project.userName = firebase.auth().currentUser.displayName;
  return db.collection("Projects").add(project);
};
export const uploadProfilePic = file => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const newfilename = firebase.auth().currentUser.displayName;
  // NOTE: Make sure there are no xss or similiar vulnerabitlies here
  // Also usernames may be duplicate
  const fileRef = storageRef.child(`profilePictures/${newfilename}`);
  fileRef
    .put(file)
    .then(() => {
      console.log("file uploaded");
    })
    .catch(() => {
      console.log("file didn't upload");
    });
};
export const getProfilePictureURL = username => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`profilePictures/${username}`);
  return imageRef.getDownloadURL();
};
console.log("firebase initialized");
