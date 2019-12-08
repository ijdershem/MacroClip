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
    if(user) {
        let acctManage = document.getElementById('account-mgmt');
        acctManage.children[0].textContent = "My Account";
        currentUser = user;
    } else {
        let acctManage = document.getElementById('account-mgmt');
        acctManage.children[0].textContent = "Sign Up or Log In";
        currentUser = null;
    }

    
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
async function toggleSideBar() { //Add animation for side-bar display
    let sideBar = document.getElementById("side-bar");
    if(sideBar.style.width != "400px") {
        setTimeout(function() {populateSideBar();}, 100);
        sideBar.style.width = '400px';
    } else {
        while (sideBar.firstChild) {
          sideBar.removeChild(sideBar.firstChild);
        }
        sideBar.style.width = '0';
    }
}

async function loadLeaderboard(game) {
    // let topScores = database.getTopScores(game);
    
    let topScores = {
        1: {
            username: 'player1',
            score: 666,
        },
        2: {
            username: 'urmom',
            score: 420,
        },
        3: {
            username: 'bobbymillz',
            score: 345,
        },
        4: {
            username: 'e40',
            score: 100,
        },
        5: {
            username: 'claychell',
            score: 69,
        },
    }
    

    let sideBar = document.getElementById('side-bar');

    let leaderboard = document.createElement('div');
    leaderboard.setAttribute('id', 'leaderboard-div');

    let lbTitle = document.createElement('h2');
    lbTitle.setAttribute('id', 'leaderbord-title');
    lbTitle.textContent = game + ' Leaderboard';
    leaderboard.appendChild(lbTitle);

    let lbTable = document.createElement('table');
    lbTable.setAttribute('id', 'leaderboard-table');
    leaderboard.appendChild(lbTable);

    let headerRow = document.createElement('tr');
    let rankHeader = document.createElement('th');
    rankHeader.textContent = 'Rank';
    let userHeader = document.createElement('th');
    userHeader.textContent = 'Username';
    let scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Score';
    headerRow.appendChild(rankHeader);
    headerRow.appendChild(userHeader);
    headerRow.appendChild(scoreHeader);
    lbTable.appendChild(headerRow);

    for(let i=1;i<=5;i++) {
        let row = document.createElement('tr');
        let rank = document.createElement('td');
        rank.textContent = i;
        let user = document.createElement('td');
        user.textContent = topScores[i].username;
        let score = document.createElement('td');
        score.textContent = topScores[i].score;
        row.appendChild(rank);
        row.appendChild(user);
        row.appendChild(score);
        lbTable.appendChild(row);
    }

    sideBar.appendChild(leaderboard);
}


async function populateSideBar() {
   let userData = await getUserData();
   let sideBar = document.getElementById('side-bar');
   let currentUser = document.createElement('h1');
   
   let nav = document.createElement('div');
   nav.setAttribute('id', "side-bar-div");
   let storeBtn = document.createElement('h2');
   storeBtn.textContent = "Store";
   nav.appendChild(storeBtn);
   storeBtn.addEventListener('click', function(){
       window.location.href = "./Store/store.html"
   });

   if(userData) {
        currentUser.textContent = userData.username;
        let balance = document.createElement('h2');
        let amount = document.createElement('h2');
        balance.textContent = "Balance: "
        amount.textContent = userData.balance + " cr";
        amount.style.color = "#000000";
        let topScores = document.createElement('div');
        sideBar.appendChild(currentUser);
        sideBar.appendChild(nav);
        sideBar.appendChild(balance);
        sideBar.appendChild(amount);
   } else {
        currentUser.textContent = "Sign in or Create an Account";
        sideBar.appendChild(currentUser);
   }

   loadLeaderboard('Game');
}


async function getUserData() { //may want to encapsulate in a class
    let userDetails;
    if(currentUser) {
        userDetails = await database.getUserDataByUID(currentUser.uid);
    }
    return userDetails;
}

$(function(){
    loadHome();
    document.getElementById('side-bar').style.width = '0';
});
