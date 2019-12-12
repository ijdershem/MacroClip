import BackEnd from './backend.js';
const database = new BackEnd();
const games = new Array('snake','2048',);

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
        currentUser = user;
    } else {
        currentUser = null;
    }

    
});

async function showLeaderboard(game) {
    console.log('showing ' + game);

    let lbID = 'leaderboard-content-' + game;

    let tabCont = document.getElementsByClassName('leaderboard-content');
    for(let i=0;i<tabCont.length;i++) {
        tabCont[i].style.display = "none";
    }
    
    let lbContent = document.getElementById(lbID);
    lbContent.style.display = "flex";
}

async function loadHome() {
    console.log('Loading home page...');
    let menubtn = document.getElementById("menu");
    menubtn.addEventListener("click", toggleSideBar);
    //Add listener to document ready to get userdata
    console.log('loading leaderboard');
    await loadLeaderboardContent();
    console.log('leaderboard loaded');

    // My attempt at event listeners

    /*
    for(let i=0;i<games.length;i++) {
        console.log('starting for ' + games[i]);
        let id = "#tab-" + games[i];
        // let leadTab = document.getElementById("tab-checkers");
        console.log(id);
        $(id).on("click",id,games[i],showLeaderboard);
        // leadTab.addEventListener("click",showLeaderboard(games[i]));
    }
    showLeaderboard(games[0]);
    */
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

async function loadLeaderboard2() {
    let cont = document.getElementById("leaderboard-content-container");


}

async function loadLeaderboardTabs() {
    let tabDiv = document.getElementById('leaderboard-tabs');

    for(let i=0;i<games.length;i++) {
        let tabBtn = document.createElement('button');
        tabBtn.setAttribute('id','tab-' + games[i]);
        tabBtn.setAttribute('class','leaderboard-game-tab');
        let upcase = games[i].charAt(0).toUpperCase() + games[i].substring(1);
        tabBtn.textContent = upcase;
        tabDiv.appendChild(tabBtn);
    }
}

async function loadLeaderboardContent() {
    let gameScores = new Array(games.length);
    for(let i=0;i<games.length;i++) {
        gameScores[i] = await database.getTopScores(games[i]);
    }
    for(let i=0;i<gameScores.length;i++) {
        loadGameLeaderboard(i,gameScores[i]);
    }
}

async function loadLeaderboard() {

    let tabDiv = document.getElementById('leaderboard-tabs');
    let leadDiv = document.getElementById('leaderboard-container');

    for(let i=0;i<games.length;i++) {
        let tabBtn = document.createElement('button');
        tabBtn.setAttribute('id','tab-' + games[i]);
        tabBtn.setAttribute('class','leaderboard-game-tab');
        let upcase = games[i].charAt(0).toUpperCase() + games[i].substring(1);
        tabBtn.textContent = upcase;
        tabDiv.appendChild(tabBtn);
        let lb = await loadGameLeaderboard(games[i]);
    }

    let show = await showLeaderboard(games[0]);
}

async function loadGameLeaderboard(a,topScores) {
    // let topScores = await database.getTopScores(game);
    let game = games[a];
    let upcase = game.charAt(0).toUpperCase() + game.substring(1);
    /*
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
    */
    

    // let sideBar = document.getElementById('side-bar');
    // let gameLink = document.getElementById(game + '-leaderboard');
    let leadDiv = document.getElementById('leaderboard-content-container');

    let leaderboard = document.createElement('div');
    leaderboard.setAttribute('id', 'leaderboard-content-' + game);
    leaderboard.setAttribute('class','leaderboard-content');

    let lbTitle = document.createElement('h2');
    lbTitle.setAttribute('id', 'leaderbord-title');
    lbTitle.textContent = upcase + ' Leaderboard';
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
    console.log('why wont this work');

    leadDiv.appendChild(leaderboard);
}


async function populateSideBar() {
   let userData = await getUserData();
   let sideBar = document.getElementById('side-bar');
   let accountDiv = document.createElement('div');
   accountDiv.setAttribute('class', 'account-div');
   let currentUser = document.createElement('h2');
   currentUser.setAttribute('id', 'user-account');
   let accountLink = document.createElement('a');
   accountLink.setAttribute('id','user-account-page-link');
   accountLink.setAttribute('href','sign_in.html');
   accountLink.textContent = ">> My Account";
   let collapse = document.createElement('div');
   collapse.setAttribute('class', 'collapse');
   $(collapse).append('<i class="fa fa-arrow-left"></i>');
   let userLinks = document.createElement('div');
   userLinks.setAttribute('id','userLinks');
   userLinks.append(currentUser);
   userLinks.append(accountLink);
   accountDiv.append(userLinks);
   accountDiv.append(collapse);
   $(collapse).click(function() {
        toggleSideBar();
   });
   $(userLinks).click(function () {
       console.log('made it');
       window.location.href = "/sign_in.html";
   })
   
   let nav = document.createElement('div');
   nav.setAttribute('id', "side-bar-div");
   let storeBtnContainer = document.createElement('div');
   storeBtnContainer.setAttribute('id','storeBtnContainer');
   let storeBtn = document.createElement('h2');
   storeBtn.textContent = "Store";
   let storeBtnArrows = document.createElement('h2');
   storeBtnArrows.setAttribute('class','arrows');
   storeBtnArrows.textContent = '>>';
   storeBtnContainer.append(storeBtn);
   storeBtnContainer.append(storeBtnArrows);
   nav.appendChild(storeBtnContainer);
   storeBtnContainer.addEventListener('click', function(){
       window.location.href = "./Store/store.html"
   });

   if(userData) {
        currentUser.textContent = userData.username;
        let balance = document.createElement('h2');
        let amount = document.createElement('h2');
        balance.textContent = "Balance: "
        console.log(userData);
        amount.textContent = userData.balance + " cr";
        amount.style.color = "#000000";
        let topScores = document.createElement('div');
        sideBar.appendChild(accountDiv);
        sideBar.appendChild(nav);
        sideBar.appendChild(balance);
        sideBar.appendChild(amount);
   } else {
        accountLink.textContent = ">> Sign in/Create account";
        currentUser.textContent = "?";
        sideBar.appendChild(accountDiv);
   }
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
