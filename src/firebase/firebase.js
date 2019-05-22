import firebase from "firebase/app";
import store from "@/Vuex/store";

import "firebase/auth";
import "firebase/firestore";
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
  } else {
    console.log("not signed in");
    store.commit("setAuthUser", false);
  }
});
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
console.log("firebase initialized");
