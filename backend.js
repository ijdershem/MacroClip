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

//TODO:
//(1) Implement checks for certain functions to make sure that a user is signed in first 
/**
 * To use the database:
 * (1) import BackEnd from '/backend.js'
 * (2) define const database = new BackEnd();
 * 
 * Reference for necessary methods
 * Update Score for a Game:
 *  => BackEnd.updateScore(score, game);
 * Get Data for a User:
 *  => getUserDataByUID(uid)
 * Update a Users Balance:
 *  => BackEnd.updateUserBalance(amount);
 */
export default class BackEnd {
    constructor() {
        this.db = firebase.firestore();
    }

    /**
     * Retrieves the the document in the user collection matching the uid parameter passed in
     * 
     * @param {string} uid 
     *  User ID of a particular user. User getCurrentUserUID() to retrieve the uid of the currently signed in user
     * 
     * @return {object}
     *  A JSON object of the document in the user collection that matched with the provided uid
     */
    async getUserDataByUID(uid) {
        //console.log("Getting data for user with UID: " + uid);
        let user;
        await this.db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let userData = doc.data();
                //console.log(doc.id, " => ", userData);
                if(userData.uid == uid) {
                    //console.log("Found match");
                    user = userData;
                }
            })
        });
        return user;
    }   

    /**
     * Writes a new user object to the user collection of the database 
     * 
     * @param {string} userName 
     * @param {string} uid
     * @param {string} userEmail
     *  userName: username of new user to write to database
     *  uid: uid of new account that was created and to be associated with new user document
     *  userEmail: email of new account that was created and to be associated with new uesr document
     * 
     * @return {void}
     */
    async writeNewUser(userName, uid, userEmail) {
        let newUser = {
            username: userName,
            email: userEmail,
            uid: uid,
            balance: 200,
            stats: {
                othello: [0,0,0,0,0],
                chess: [0,0,0,0,0],
                2048: [0,0,0,0,0],
                snake: [0,0,0,0,0],
                checkers: [0,0,0,0,0],
            },
            friends: {},
            purchased_icons:{},
            current_icon: "https://png.pngtree.com/svg/20170206/86bac7c38b.svg", 
        }
        this.db.collection("users").add(newUser).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
            console.error("Error adding document: " + error);
        })
    }

    /**
     * Retrieves the uid of the currently signed in user 
     * 
     * @return {string} 
     *  A string object representing the uid of the currently signed in user
     */
    async getCurrentUserUID() {
        return firebase.auth().currentUser.uid; 
    }

    /**
     * Updates the score of the provided game argument for a user if the score is greater than one of the top
     * 5 scores that the user has achieved for the given game.
     * 
     * @param {number} score 
     * @param {string} game 
     *  score: a number representing the new score to be (potentially) added to the users top scores
     *  game: the game to update the users score data for
     */
    async updateScore(score, game) {
        game = game.toLowerCase(); //makes sure that game is lower-case for doc reference purposes

        let currentUserUID = await this.getCurrentUserUID();
        let docId = await this.getUserDocId(currentUserUID);

        let userRef = this.db.collection('users').doc(docId);
        let userName = await userRef.get().then(function(doc){
            return doc.data().username;
        })
        let userStats = await userRef.get().then(function(doc){
            return doc.data().stats;
        });

        let gameScores = userStats[game];
        let updatedScores = this.updateGameScoreArr(gameScores, score);
        let gameField = "stats." + game;

        await userRef.update({
            [gameField]: updatedScores,
        }).then(function(){
            console.log("Document successfully updated!");
        }).catch(function(error){
            console.error("Error updating document: ", error);
        });

        this.updateTopScores(game, userName, score);
    }

    /**
     * Returns the image link for a given users currently selected avatar
     * @param {object} user  
     *  user: an object representing the user to retrieve the currently selected avatar for
     * @return an image referencing the currently selected user icon
     */
    async getUserAvatar(user) {
        //console.log(user.current_icon);
        return user.current_icon;
    }
    
    /**
     * Retrieves the id of the document in the users collection that references the user
     * associated with the provided uid.
     * 
     * @param {string} uid 
     * uid: the uid needed to match to the uid stored in a users document
     * 
     * @returns {string}
     *  A string object representing the id of the document pertaining to the user
     *  associated with the uid passed as a parameter
     */
    async getUserDocId(uid) {
        let docId;
        await this.db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let userData = doc.data();
                //console.log(doc.id, " => ", userData);
                if(userData.uid == uid) {
                    //console.log("Found match");
                    //console.log(doc);
                    docId = doc.id;
                }
            })
        });
        return docId;
    }

    /**
     * Returns an updated top 5 scores array depending on whether or not the newScore is
     * greater than or equal to one of the entries in the provided scores array.
     * 
     * @param {number[]} scores 
     * @param {number} newScore 
     *  scores: the top 5 scores associated with a given game for a given user
     *  newScore: the new score to be compared against the top 5 scores
     */
    updateGameScoreArr(scores, newScore) {
        console.log("Scores before update: " +  scores);
        let newScores = scores;
        for(let i = 0; i < 5; i++) {
            if(newScore >= scores[i]) {
                let before = scores.slice(0, i);
                let after = scores.slice(i, scores.length);
                newScores = [];
                // console.log("Arry before slice: ", before);
                // console.log("Array after slice: ", after);
                let k = 0; //count for indexing after arr
                for(let j = 0; j < 5; j++) {
                    if(j < before.length) {
                        newScores[j] = before[j];
                    } else if (j == before.length) {
                        newScores[j] = newScore;
                    } else {
                        newScores[j] = after[k];
                        k++;
                    }
                }
                break;
            }
        }
        console.log("Scores after update: " +  newScores);
        return newScores;
    }

    /**
     * Updates the current balance of the currently signed in user
     * => Pass in positive values to add to the balance
     * => Pass negative values to subtract from the balance
     * 
     * @param {number} amount 
     * amount: The value (+/-) to be added or subtracted from the users current balance 
     */
    async updateUserBalance(amount) {
        let currentUserUID = await this.getCurrentUserUID();
        let docId = await this.getUserDocId(currentUserUID);

        let userRef = this.db.collection('users').doc(docId);
        let userBalance = await userRef.get().then(function(doc){
            return doc.data().balance;
        });
        let updatedBalance = userBalance + amount;

        return userRef.update({
            balance: updatedBalance,
        }).then(function(){
            console.log("Document successfully updated!");
        }).catch(function(error){
            console.error("Error updating document: ", error);
        });
    }

    /**
     * Retrieves an object of the top 5 scores for a given game argument
     * 
     * @param {string} game 
     *  game: string object representing the game to fetch top score data for
     * 
     * @return {object}
     *  An object of key:value pairs 
     *  { 1: {
     *           username: string,
     *           score: number
     *       },
     *    ...
     *  }
     *  representing the top 5 scores for the provided game argument
     */
    async getTopScores(game) {
        let topScores = await this.db.collection("top_scores").doc(game);
        let gameScores;
        await topScores.get().then(function(doc) {
            if(doc.exists) {
                //console.log("Document data: ", doc.data());
                gameScores = doc.data();
            } else {
                console.log("No such document");
                return null;
            }
        }).catch(function(error) {
            console.log("Error getting document: ", error);
            return null;
        });
        return gameScores;
    }

    /**
     * Updates the top scores for a particular game if the provided score argument is greater than any of the 
     * current top score entries
     * 
     * @param {string} game 
     * @param {sting} username 
     * @param {number} score 
     *  game: a string representing the game that should have its top scores updated
     *  username: the name of the user with a score to be compared to the list of top scores
     *  score: the score to be compared to the current top scores
     */
    async updateTopScores(game, username, score) {
        let topScores = await this.getTopScores(game);
        let updatedScores = {};
        let newEntry;
        let newEntryPos;
        //Determine if and where the new score entry should be placed
        for(let pos in topScores) {
            //skip loop if property is from prototype
            if(!topScores.hasOwnProperty(pos)) continue;
            var obj = topScores[pos];
            for(let prop in obj) {
                console.log(pos);
                if(!obj.hasOwnProperty(prop)) continue;
                if(prop == "score") {
                    if(score > obj[prop]) {
                        newEntry = {
                            score: score,
                            username: username,
                        }

                        newEntryPos = pos;

                        break;
                    }
                } 
            }
            //break out of loop if a position to place the new entry was found
            if(newEntryPos) break;
        }
        //If a position for the new score entry was found, create an updated top score object with the entry
        if(newEntryPos) {
            let before = [];
            let after = [];
            //populate array before insertion
            for(let i = 1; i < newEntryPos; i++) {
                before[i-1] = topScores[i];
            }
            //populate array after insertion
            for(let i = 0; i < (5-newEntryPos); i++) {
                after[i] = topScores[parseInt(newEntryPos) + i];
            }
            //console.log("Array before new entry: ", before);
            //console.log("Array after new entry: ", after);
            //console.log("Position for new entry: ", newEntryPos);
            //console.log("New entry to insert: ", newEntry);
            let bcount = 0;
            let acount = 0
            for(let i = 1; i < 6; i++) {
                if(i < newEntryPos) {
                    updatedScores[i] = before[bcount];
                    bcount++;
                } else if (i == newEntryPos) {
                    updatedScores[i] = newEntry;
                } else {
                    updatedScores[i] = after[acount];
                    acount++;
                }
            }
            //console.log("New top scores: ", updatedScores);
            topScores = updatedScores;
        }

        await this.db.collection('top_scores').doc(game).set(topScores);

    }

    async getAvatarCollection(){
        let icons = {};
        await this.db.collection('images').get().then(async function(querySnapshot){
            querySnapshot.forEach(async function(doc) {
                let data = await doc.data();
                icons[doc.id.toString()] = { url: data.url, price: data.price }
            });
        });
        return icons;
    }

    async getUserAvatarCollection(user) {
        return user.purchased_icons;
    }

    async purchaseAvatar(currentUserUid, icon_name, icon_url, price) {
        let uid = await this.getCurrentUserUID();
        let userDoc = await this.getUserDataByUID(uid);
        let userBalance = userDoc.balance;
        console.log(userBalance);
        if(price > userBalance) {
            window.alert("Sorry! You don't have enough credits to purchase this icon. Keep playing!");
        } else {
            let docId = await this.getUserDocId(currentUserUid);
            let userRef = await this.db.collection('users').doc(docId);
            let icon_field = "purchased_icons." + icon_name;
            //console.log(icon_field);
            //Implement check to verify user balance and subtract if purchase is possible
            this.updateUserBalance(parseInt("-" + price));
            return userRef.update({
                [icon_field]: icon_url,
            }).then(function(){
                window.alert("Icon successfully purchased");
            }).catch(function(error) {
                window.alert("Something went wrong purchasing this icon");
            })
        }
    }

    async setUserIcon(image_url) {
        let currentUserUID = await this.getCurrentUserUID();
        let docId = await this.getUserDocId(currentUserUID);

        let userRef = this.db.collection('users').doc(docId);

        return userRef.update({
            current_icon: image_url,
        }).then(function(){
            console.log("Document successfully updated!");
        }).catch(function(error){
            console.error("Error updating document: ", error);
        });
    }

    async getAvatarsByTag(searchedTag) {
        let taggedImages = await this.db.collection('avatar_tags').doc('tags').get();
        let tags = taggedImages.data();
        for(let tag in tags) {
            if(tags.hasOwnProperty(tag)) {
                if(searchedTag == tag) {
                    let matchedImages = tags[tag];
                    //console.log(matchedImages);
                    return matchedImages;
                }
            }
        }

    }
}

