/*Document: login.js

  Purpose: This javascript file runs the Google Sign-In button functionality.
           and may discreetly show information in the console about basic
           profile information about a person, such as their profile name
           and email. There is a sign-out button below it to truly sign
           out the person from their Google account on the website.

           This file would be used for the index.html login screen.
*/

"use strict";
$(document).ready(function() {
    $(".g-signin2").click( function(){
        console.log('Attempting to login using Google Sign-In.');
        let auth2 = gapi.auth2.getAuthInstance();
        // Sign the user in, and then retrieve their information on the console.
        auth2.signIn().then(function() {
            var profile = auth2.currentUser.get().getBasicProfile();
            console.log('Logged in as: ' + profile.getName());
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            window.location.href = "http://localhost:3000/home.html";
        });
    });
    $("#SignOut").click(signOut);
});

// This function is run when the Sign Out button clicks, which signs the person out.
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

/*Below code is used for the old account sign-in. It is rendered obsolete.*/
/*This function would be used to toggle the visibility
  of text at the login page of index.html.*/
function showPassword() {
    let password = document.getElementById("passInput");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
