import BackEnd from '../backend.js';

const tags = ['creator','female','male','neutral','professional', 'superhero', 'worker','creature','superwoman'];

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
//     let existingImages = [];
//     database.db.collection('images')
//         .onSnapshot((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             //console.log(doc.data());
//             //console.log(doc.id);
//             existingImages.push(doc.id);
//             console.log(existingImages)
//         })
//     });

//     // for(let i = 0;  i < existingImages.length; i++) {
//     //     console.log("Image already uploaded: " + existingImages[i]);
//     // }

//     let count = 0;
//     for (let image of images.items) {
//         image.getMetadata().then(async function(metadata){
//             //console.log(metadata);
//             let imgName = metadata.name;
//             let uri = await image.getDownloadURL();
//             let newImg = {
//                 url: uri,
//             }
//             if(!existingImages.includes(imgName)) {
//                 count++;
//                 console.log("Already linked" + imgName);
//                 database.db.collection('images').doc(imgName.toString()).set(newImg);
//             } 
//             //database.db.collection('images').doc(imgName.toString()).set(newImg);
//             console.log(imgName);
//         }).catch(function(error){
//             console.log(error);
//         });

//     }
//     console.log("Matched " + count + " images");
// }

async function loadStore() {
    
    let items = document.getElementsByClassName('icon-piece');
    let images = await database.getAvatarCollection();
    let catalog = document.getElementById('icon-catalog');
    // if(catalog.hasChildNodes()) {
    //     let wipedCatalog = document.createElement('div');
    //     wipedCatalog.setAttribute('id', 'icon-catalog');
    //     catalog.replaceWith(wipedCatalog);
    // }
    
    for(let icon_name in images) {
        if(images.hasOwnProperty(icon_name)) {
            let avatar = images[icon_name];
            let icon_piece = document.createElement("div");
            let icon = document.createElement("div");
            let icon_img = document.createElement("img");
            let buy_btn = document.createElement("div");
            let buy_text = document.createElement("text");
        
            icon_piece.setAttribute("class", "icon-piece");
            icon_piece.setAttribute('id', icon_name);
            icon.setAttribute('class', 'icon');
            buy_btn.setAttribute("class", "buy");
            icon_img.setAttribute("src", avatar.url);
            icon_img.setAttribute("id", icon_name + "_image");
            icon_img.setAttribute('alt', 'Avatar image for ' + icon_name);
            icon_img.style.height = "100%";
            icon_img.style.width = "100%";

            buy_btn.appendChild(buy_text);

            let price = document.createElement("text");
            price.textContent = avatar.price;
            if(avatar.price) {
                price.textContent = avatar.price + " CR";
                buy_btn.setAttribute("id", avatar.price + "-" + icon_name);
                buy_text.textContent = 'buy';
            } else {
                buy_text.textContent = 'free';
                buy_btn.setAttribute("id", 0 + "-" + icon_name);
            }
            buy_btn.appendChild(price);

            buy_btn.addEventListener('click', purchaseIcon);
            icon.appendChild(icon_img);

            icon_piece.appendChild(icon);
            icon_piece.appendChild(buy_btn);

            catalog.appendChild(icon_piece);
        }

    }
    let submitBtn = document.getElementById("submit-avatar-search");
    let clearBtn = document.getElementById("clear-avatar-search");
    submitBtn.addEventListener('click', loadSearchedImages);
    clearBtn.addEventListener('click', clearSearch);

    $('#avatar-search').keyup(debounce(function() {
        autoComplete();
    },200));
}

async function loadSearchedImages() {
    let query = document.getElementById("avatar-search").value;
    let queriedImages = await database.getAvatarsByTag(query);
    let catalog = document.getElementById('icon-catalog');
    let queriedCatalog = document.createElement("div");
    queriedCatalog.setAttribute('id', "icon-catalog");
    if(queriedImages != null) {
        //console.log(queriedImages);
        for(let image in queriedImages) {
            if(queriedImages.hasOwnProperty(image)) {
                queriedImages[image].get().then(function(doc) {
                    let imageInfo = doc.data();
                    let avatar = imageInfo;
                    let icon_piece = document.createElement("div");
                    let icon = document.createElement("div");
                    let icon_img = document.createElement("img");
                    let buy_btn = document.createElement("div");
                    let buy_text = document.createElement("text");
                
                    icon_piece.setAttribute("class", "icon-piece");
                    icon_piece.setAttribute('id', image.id);
                    icon.setAttribute('class', 'icon');
                    buy_btn.setAttribute("class", "buy");
                    icon_img.setAttribute("src", avatar.url);
                    icon_img.setAttribute("id", image.id + "_image");
                    icon_img.setAttribute('alt', 'Avatar image for ' + image.id);
                    icon_img.style.height = "100%";
                    icon_img.style.width = "100%";
        
                    buy_btn.appendChild(buy_text);
        
                    let price = document.createElement("text");
                    price.textContent = avatar.price;
                    if(avatar.price) {
                        price.textContent = avatar.price + " CR";
                        buy_btn.setAttribute("id", avatar.price + "-" + image.id);
                        buy_text.textContent = 'buy';
                    } else {
                        buy_text.textContent = 'free';
                        buy_btn.setAttribute("id", 0 + "-" + image.id);
                    }
                    buy_btn.appendChild(price);
        
                    buy_btn.addEventListener('click', purchaseIcon);
                    icon.appendChild(icon_img);
        
                    icon_piece.appendChild(icon);
                    icon_piece.appendChild(buy_btn);
        
                    queriedCatalog.appendChild(icon_piece);
                });
            }
        }
        catalog.replaceWith(queriedCatalog);
    }
    let currItems = document.getElementsByClassName("autocomplete-item");
    for(let i=0;i<currItems.length;i++) {
        currItems[i].parentNode.removeChild(currItems[i]);
    }
    document.getElementById("avatar-search").value = '';
}

var debounce = function (func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context,args);
    }
}

async function fillSearch(e) {
    document.getElementById("avatar-search").value = e.target.textContent;
    autoComplete();
}

async function autoComplete() {

    let text = document.getElementById("avatar-search").value;

    let acList = document.getElementById("autocomplete-list");
    acList.innerHTML = '';

    // Clear any autocomplete items
    let currItems = document.getElementsByClassName("autocomplete-item");
    for(let i=0;i<currItems.length;i++) {
        currItems[i].parentNode.removeChild(currItems[i]);
    }

    for(let i=0;i<tags.length;i++) {
        for(let j=0;j<text.length;j++) {
            if (text.charAt(j).toLowerCase() != tags[i].charAt(j)) {
                // console.log(text + ' and ' + tags[i] + ' do not match');
                break;
            } else {
                if (j == text.length-1) {
                    let acItem = document.createElement('div');
                    acItem.setAttribute('class','autocomplete-item');
                    acItem.innerHTML = '<strong>' + tags[i].substr(0,text.length) + '</strong>';
                    acItem.innerHTML += tags[i].substr(text.length);
                    acItem.addEventListener('click',fillSearch);
                    acList.appendChild(acItem);
                }
            }
        }
    }

    if (!acList.hasChildNodes() && text.length > 0) {
        let nrItem = document.createElement('div');
        nrItem.setAttribute('class','autocomplete-item');
        nrItem.innerHTML = 'No results found, try <strong>' + tags[Math.floor(Math.random() * tags.length)] + '</strong>';
        acList.appendChild(nrItem);        
    }
}

async function purchaseIcon() {
    let icon_name = event.target.parentNode.id;
    let price = event.target.id.substring(0, event.target.id.indexOf("-"));
    let img_id = icon_name + "_image";
    let icon_url = document.getElementById(img_id).getAttribute("src");
    icon_name = icon_name.substring(0, icon_name.indexOf(".")); //strip svg from icon name for purposes of storing in user account (created error where "." delimiter would create unwanted nested field)
    // console.log(icon_name);
    let currentUserUid = await database.getCurrentUserUID();
    let currentUser = await database.getUserDataByUID(currentUserUid);
    let userOwnsIcon = await checkUserOwnsIcon(currentUser.purchased_icons, icon_name);

    if(!userOwnsIcon) {
        //purchase icon and add to user account
        await database.purchaseAvatar(currentUserUid, icon_name, icon_url, price);
    } else {
        window.alert("You already own this avatar!");
    }
}

async function checkUserOwnsIcon(purchased_icons, icon_name) {
    //console.log(purchased_icons);
    //console.log(icon_name);
    for(let icon in purchased_icons) {
        if(icon_name == icon) {
            console.log("User already owns icon");
            return true;
        } 
    }
    return false;
}

async function clearSearch(){
    let clearedCatalog = document.createElement('div');
    clearedCatalog.setAttribute('id', 'icon-catalog');
    let catalog = document.getElementById("icon-catalog");
    document.getElementById('avatar-search').value = "";
    catalog.replaceWith(clearedCatalog);
    loadStore();


}

$(function(){
    loadStore();
});

