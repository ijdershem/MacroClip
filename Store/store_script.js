import BackEnd from '../backend.js';

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

const database = new BackEnd();
let storage = firebase.storage().ref();


//TODO:
// (1) Create logic for getting currently signed in user
//     - checking balance
//     - "purchasing" and subtracting from balance
//     - adding reference to image to user profile in database
// (2) If a user has already purchased an icon, display icons accordingly
//     - check if image ref exists in users bio before creating a card for it
function buyItem() { //using to get image uris right now 
    console.log("Purchasing item");
}

// OLD CODE FOR LINKING IMAGES IN STORAGE TO DATABASE
// async function getImageURI() {
//     console.log("Getting image uris");
//     let images = await storage.listAll();
//     //console.log(images.items);
//     for (let image of images.items) {
//         image.getMetadata().then(async function(metadata){
//             console.log(metadata);
//             let imgName = metadata.name;
//             let uri = await image.getDownloadURL();
//             let newImg = {
//                 url: uri,
//             }
//             database.db.collection('images').doc(imgName.toString()).set(newImg);
//         }).catch(function(error){
//             console.log(error);
//         });

//     }
// }

async function loadStore() {
    let items = document.getElementsByClassName('icon-piece');
    let images = await database.getAvatarCollection();
    let catalog = document.getElementById('icon-catalog');

    for(let icon_name in images) {
        if(images.hasOwnProperty(icon_name)) {
            let url = images[icon_name];
            let icon_piece = document.createElement("div");
            let icon = document.createElement("div");
            let icon_img = document.createElement("img");
            let buy_btn = document.createElement("div");
            let buy_text = document.createElement("text");
            buy_text.textContent = 'buy';
        
        
            icon_piece.setAttribute("class", "icon-piece");
            icon_piece.setAttribute('id', icon_name);
            icon.setAttribute('class', 'icon');
            buy_btn.setAttribute("class", "buy");
            icon_img.setAttribute("src", url);
            icon_img.setAttribute("id", icon_name + "_image");
            icon_img.setAttribute('alt', 'Avatar image for ' + icon_name);
            icon_img.style.height = "100%";
            icon_img.style.width = "100%";

            buy_btn.appendChild(buy_text);
            buy_btn.addEventListener('click', purchaseIcon);
            icon.appendChild(icon_img);

            icon_piece.appendChild(icon);
            icon_piece.appendChild(buy_btn);

            catalog.appendChild(icon_piece);
        }

    }
}

async function purchaseIcon() {
    let icon_name = event.target.parentNode.id;
    let img_id = icon_name + "_image";
    let icon_url = document.getElementById(img_id).getAttribute("src");
    icon_name = icon_name.substring(0, icon_name.indexOf(".")); //strip svg from icon name for purposes of storing in user account (created error where "." delimiter would create unwanted nested field)
    console.log(icon_name);
    let currentUserUid = await database.getCurrentUserUID();
    let currentUser = await database.getUserDataByUID(currentUserUid);
    let userOwnsIcon = await checkUserOwnsIcon(currentUser.purchased_icons, icon_name);

    if(!userOwnsIcon) {
        //purchase icon and add to user account
        await database.purchaseAvatar(currentUserUid, icon_name, icon_url);
    } else {
        window.alert("You already own this avatar!");
    }
}

async function checkUserOwnsIcon(purchased_icons, icon_name) {
    console.log(purchased_icons);
    console.log(icon_name);
    for(let icon in purchased_icons) {
        if(icon_name == icon) {
            console.log("User already owns icon");
            return true;
        } 
    }
    return false;
}

$(function(){
    loadStore();
});


