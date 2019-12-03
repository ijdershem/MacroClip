import BackEnd from '/backend.js'
// TODO: 
// (1) Set display automatically based on current user status
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

// var db = firebase.firestore();
const backend = new BackEnd();

firebase.auth().onAuthStateChanged(async function(user) {
    let logindiv = document.getElementById("login-div");
    if (user) {
        // User is signed in.
        //TODO: hide log in div and display a div displaying users account
        logindiv.style.display = 'none';

        let userDisplay = document.getElementById("user-div");
        let user = firebase.auth().currentUser;

        if(user != null) {
            let userDoc = await backend.getUserDataByUID(user.uid);
            let userName = userDoc.username;
            //console.log(userName);
            userDisplay.children[0].textContent = userName; //Want this to be display name - implement fields to set displayname in signup
        }

        userDisplay.style.display = "flex"; 
        await displayUserAccount();
        let signOutBtn = document.createElement("button");
        signOutBtn.setAttribute("id", "sign-out-btn");
        signOutBtn.addEventListener('click', signout);
        signOutBtn.textContent = "Sign Out";
        userDisplay.appendChild(signOutBtn);
    } else {
        // No user is signed in.
        //TODO: show log in div and hide div displaying users account
        if(logindiv.style.display == 'none') {
            logindiv.style.display == 'flex';
        } else {
            logindiv.style.display == 'none'; 
        }

        document.getElementById("login-div").style.display = "flex";
        document.getElementById("user-div").style.display = "none";
    }
});

function login() {
    let userEmail = document.getElementById("email-field").value;
    let userPass = document.getElementById("password-field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error: " + errorMessage);
    });
}

async function displaySignup() {
    let createAccountDiv = document.getElementById("login-div");

    let usernameInput = document.createElement("input");
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('placeholder', 'Enter a username...');
    usernameInput.setAttribute('id', 'username-field');

    let createAccountBtn = document.createElement('button');
    createAccountBtn.setAttribute('id', 'create-btn');
    createAccountBtn.textContent = 'Create Account';
    
    let cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('id', 'cancel-btn');
    cancelBtn.textContent = 'Cancel';

    let usernameTitle = document.createElement('p');
    usernameTitle.setAttribute('id', 'user-field-title');
    usernameTitle.textContent = 'Username: ';
    
    let loginBtn = document.getElementById('log-in-btn');
    let signupBtn = document.getElementById('sign-up-btn');
    createAccountDiv.insertBefore(usernameTitle, loginBtn); 
    createAccountDiv.insertBefore(usernameInput, loginBtn);
    createAccountDiv.appendChild(createAccountBtn);
    createAccountDiv.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', cancelAccountCreation);
    createAccountBtn.addEventListener('click', createAccount);
   
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
}

function cancelAccountCreation() {
    console.log('Canceling account creation');
    document.getElementById('username-field').remove();
    document.getElementById('create-btn').remove();
    document.getElementById('cancel-btn').remove();
    document.getElementById('user-field-title').remove();
    document.getElementById('log-in-btn').style.display = 'block';
    document.getElementById('login-in-btn').addEventListener(login);
    document.getElementById('sign-up-btn').style.display = 'block';
    document.getElementById('sign-up-btn').addEventListener(displaySignup);
}

async function createAccount() {
    let userEmail = document.getElementById("email-field").value;
    let userPass = document.getElementById("password-field").value;
    let userName = document.getElementById('username-field').value;

    try {
        let newUser = await firebase.auth().createUserWithEmailAndPassword(userEmail, userPass);
        await backend.writeNewUser(userName, newUser.user.uid, userEmail);
    } catch(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert("Error: " +  errorMessage);
    };
}

function signout() {
    //TODO: implement sign out functionality
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}

async function displayUserAccount() {
    let userUid = await backend.getCurrentUserUID();
    let userDoc = await backend.getUserDataByUID(userUid);
    let userAvatar = await backend.getUserAvatar(userDoc);

    let userDiv = document.getElementById("user-div");
    let avatarDiv = document.createElement("div");
    let avatarImg = document.createElement("img");

    avatarDiv.setAttribute("class", "avatar-div");
    avatarImg.setAttribute("alt", "Avatar for user");

    if(userAvatar.length > 0) {
        avatarImg.setAttribute("src", userAvatar);
        avatarDiv.appendChild(avatarImg);
        userDiv.appendChild(avatarDiv);
    } //else display default image (need to get one of these)
    let userGameScores = await buildUserStatsCard();
    userDiv.appendChild(userGameScores);
    //console.log(userDiv);
}

async function buildUserStatsCard() {
    let statsDiv = document.createElement("div");
    statsDiv.setAttribute("id", "stats-div");
    let userDoc = await backend.getUserDataByUID(await backend.getCurrentUserUID());
    let userStats = userDoc.stats;

    for (let game in userStats) { //properly retrieving score data, need to convert into cards 
        console.log(game);
        if(userStats.hasOwnProperty(game)){
            let scoreCard = document.createElement("div");
            scoreCard.setAttribute("class", "score-card");
            let gameScores = userStats[game];
            let cardTitleBar = document.createElement("div");
            cardTitleBar.setAttribute("class", "score-title");
            let gameName = document.createElement("text");
            let displayScoresBtn = document.createElement("div");
            displayScoresBtn.setAttribute("class", "display-scores");

            gameName.textContent = game;
            cardTitleBar.appendChild(gameName);
            cardTitleBar.appendChild(displayScoresBtn);
            scoreCard.appendChild(cardTitleBar);

            let scores = document.createElement("div");
            scores.setAttribute("class", "scores");
            for(let i = 0; i < gameScores.length; i++) {
                let score = document.createElement("text");
                score.textContent = (i + 1) + ": " + gameScores[i];
                scores.appendChild(score);
                console.log(gameScores[i]);
            }
            scoreCard.appendChild(scores);
            statsDiv.appendChild(scoreCard);
        }
    }
    return statsDiv;
}

$(function(){
    document.getElementById('sign-up-btn').addEventListener('click', displaySignup);
    document.getElementById('log-in-btn').addEventListener('click', login);
})