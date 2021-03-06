var loggedIn = false;

document.getElementById("YourPosts").style.display = "none";

if(loggedIn)
{
    document.getElementById("Profile_Logged_Out").style.display = "none";
    document.getElementById("Profile_Logged_In").style.display = "block";
    addEventHandlers();
    
} else {
    document.getElementById("Profile_Logged_In").style.display = "none";
    document.getElementById("Profile_Logged_Out").style.display = "block";

    var loginButton = document.getElementById("LoginButton");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        var gettingCookie = browser.cookies.get({url:"https://www.facebook.com/", name: "c_user"}, function(cookie) {
            if(!cookie) {
                // Edge reports no cookie match, even though c_user is stored under facebook's cookies.
                console.log("No cookie match!");
                // get the user logged into Facebook so we can get their ID
            } else {
                console.log(cookie.value);
                document.getElementById("profile_name").innerText = cookie.value;
                document.getElementById("Profile_Logged_Out").style.display = "none";
                document.getElementById("Profile_Logged_In").style.display = "block";
                loggedIn = true;
            }
        });
        // chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
        //     tabURL = tab.url;
        //     if(tabURL.startsWith("https://www.facebook.com/connect/login_success.html")) {
        //         var code = getParameterByName("code", tabURL);
        //         // send code to server to get an access token
        //         document.getElementById("profile_name").innerText = code;
        //         document.getElementById("Profile_Logged_Out").style.display = "none";
        //         document.getElementById("Profile_Logged_In").style.display = "block";
        //         loggedIn = true;
        //         chrome.windows.remove(tab.windowId);
        // }

    // var win = window.open("https://www.facebook.com/v2.9/dialog/oauth?client_id=137575509998503&redirect_uri=https://www.facebook.com/connect/login_success.html",
    //     "fbconnect", "width=600,height=500");
})

}

function addEventHandlers() {
    var postsBttn = document.getElementById("postsBttn");
    postsBttn.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("YourPosts").style.display = "block";
        document.getElementById("Profile_Logged_In").style.display = "none";
        document.getElementById("settings").style.display = "none";
    })
}

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

/* FLOW FOR FACEBOOK LOGIN 
1) Check if user is logged in
    -> If not, 2
    -> If they are, 3
2) Show login page
3) On button click, open facebook login
4) Capture login token
    -> Browser session token?
    -> Database store, along with user_id
    -> store login status.


*/

