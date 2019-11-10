firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
    }
});

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

function login() {
    let userEmail = document.getElementById("email-field").value;
    let userPass = document.getElementById("password-field").value;

    window.alert("Logging in " +  userEmail + " with " + userPass);
}

function signup() {
    let userEmail = document.getElementById("email-field").value;
    let userPass = document.getElementById("password-field").value;
    
    window.alert("Signing up " +  userEmail + " with " + userPass);
}