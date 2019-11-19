import BackEnd from './backend.js';
const database = new BackEnd();

var firebaseConfig = {
    apiKey: "AIzaSyBm-lSl1g1XvzblxlF1eZJDht_v8yOB0qk",
    authDomain: "final-1c393.firebaseapp.com",
    databaseURL: "https://final-1c393.firebaseio.com",
    projectId: "final-1c393",
    storageBucket: "final-1c393.appspot.com",
    messagingSenderId: "957024138512",
    appId: "1:957024138512:web:78fcd128830fc176042195",
    measurementId: "G-3VL4NZZ0RF"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

let currentUser;
firebase.auth().onAuthStateChanged(function(user) {
    currentUser = user;
});

function loadHome() {
    console.log('Loading home page...');
    let menubtn = document.getElementById("menu");
    menubtn.addEventListener("click", toggleSideBar);
    //Add listener to document ready to get userdata
}

/**
 * Currently getting current user properly.
 * TODO: (1) Need to index database and match user UID with data
 * and populate side bar with that data
 * (2) create methods for accessing/updating user data within the backend class
 */
function toggleSideBar() { //Add animation for side-bar display
    let user;
    if(currentUser) {
        user = database.getUserByUID(currentUser.uid);
    }
    let sideBar = document.getElementById("side-bar");
    if(sideBar.style.display === "none") {
        sideBar.style.display = "flex";
    } else {
        sideBar.style.display = "none";
    }
}

function populateSideBar() {

}


async function getUserData() { //may want to encapsulate in a class
    let userDetails;
    if(currentUser) {
        userDetails = await database.getUserByUID(currentUser.uid);
    }
}

loadHome();

