import {apiGet, apiPost} from "./APIs.js";

let overlapDiv = document.getElementById("overlap_div");
async function hideOverlapContent() {
    overlapDiv.style.visibility="hidden"
    overlapDiv.innerHTML = ""
    // await overlapDiv.addEventListener('click',ev => overlap_div_listener())
}

window.onload = function () {
    hideOverlapContent().then(r => "hidden");
}

async function initiate_page() {


    let username;
    await apiGet("/API-get-active-user")
            .then(result => {
                username = result.username;
            });
    let navigation_bar = document.getElementById("navigation_bar")

    if (username !== "") {
        navigation_bar.innerHTML = `<a class="navigation-button login-button">
                ${username}
            </a>` + navigation_bar.innerHTML
    } else {
        navigation_bar.innerHTML = `<a id="login-button" class="navigation-button">
                LOGIN
            </a>
        <a id="register-button" class="navigation-button login-button">REGISTER</a>` + navigation_bar.innerHTML;
        document.getElementById("login-button").addEventListener('click',ev => {
            overlapDiv.innerHTML =
                `<div class="card-container">
                    <div class="login-card">
                        <h3 id="error_message"></h3>
                        <label for="username_textarea">Username:</label>
                        <input type="text" placeholder="Username" id="username_textarea" name="username_textarea">
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Password" id="password" name="password">
                        <button id="login-page-button">LOGIN</button>
                    </div>
                </div>`;
            overlapDiv.style.visibility = 'visible';
            document.getElementById("login-page-button").addEventListener('click',ev => {
                let username_textarea = document.getElementById("username_textarea").value;
                let password = document.getElementById("password").value;
                console.log(`Username ${username_textarea} Password: ${password}`)

                apiPost('/API-login',
                    {
                        "username": username_textarea,
                        "password": password
                    })
            })
        })
        document.getElementById("register-button").addEventListener('click',ev => {
            overlapDiv.innerHTML =
                `<div class="card-container">
                    <div class="login-card">
                        <label for="username_textarea">Username:</label>
                        <input type="text" placeholder="Username" id="username_textarea" name="username_textarea">
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Password" id="password" name="password">
                        <button id="login-page-button">LOGIN</button>
                    </div>
                </div>`;
            overlapDiv.style.visibility = 'visible';
            document.getElementById("login-page-button").addEventListener('click',ev => {
                let username_textarea = document.getElementById("username_textarea").value;
                let password = document.getElementById("password").value;
                console.log(`Username ${username_textarea} Password: ${password}`)

                apiPost('/API-register',
                    {
                        "username": username_textarea,
                        "password": password
                    })
                initiate_page()
            })
        })
        document.getElementById("overlap_highscore").addEventListener('click',ev => overlap_highscore())
        document.getElementById("overlap_div").addEventListener('click',hideOverlapContent)
        document.getElementById("overlap_div").addEventListener('keydown',ev => {
            if (ev.key==='escape') hideOverlapContent()
        })
    }
}

async function overlap_highscore(){
    let overlapDiv = document.getElementById("overlap_div");
    overlapDiv.style.visibility="visible";
    let highscores = await apiGet("/APIgethighscore")
    console.log(highscores[1])
    let highscore_page = "<div>\n" +
        "    <table>\n" +
        "    <thead>\n" +
        "        <tr>\n" +
        "            <th>USERNAME</th>\n" +
        "            <th> HIGHSCORE</th>\n" +
        "        </tr>\n" +
        "    </thead>\n" +
        "        <tbody>\n"
    let highscore_page_table_inputs = ""
    for (let highscore of highscores){
        console.log(highscore)
        highscore_page_table_inputs += "            <tr>\n" +
        `                <td>${highscore.username}</td>\n` +
        `                <td>${highscore.highscore}</td>\n` +
        "            </tr>\n"
    }
    highscore_page += highscore_page_table_inputs +
        "        </tbody>\n" +
        "    </table>\n" +
        "</div>"

    overlapDiv.innerHTML=highscore_page
}




await initiate_page()
