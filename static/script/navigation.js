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

let highscoreButton = document.getElementById("overlap_highscore");

console.log(highscoreButton)
function a(){
        console.log("1")
}
async function overlap_highscore(e){
    console.log(1)
    e.preventDefault()
    console.log(e)
    let overlapDiv = document.getElementById("overlap_div");
    overlapDiv.style.visibility="visible";
    let highscores = await apiGet("/APIgethighscore")
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
highscoreButton.addEventListener('click',overlap_highscore);
async function initiate_page() {



    let username;
    await apiGet("/API-get-active-user")
            .then(result => {
                username = result.username;
            });
    let navigation_bar = document.getElementById("navigation_bar")

        document.getElementById("overlap_div").addEventListener('click',hideOverlapContent)
        document.getElementById("overlap_div").addEventListener('keydown',ev => {
            if (ev.key==='escape') hideOverlapContent();
        })

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
            document.getElementById("overlap_div").removeEventListener('click',hideOverlapContent)
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
            document.getElementById("overlap_div").removeEventListener('click',hideOverlapContent)
            overlapDiv.innerHTML =
                `<div class="card-container">
                    <div class="login-card">
                        <h3 id="error_message"></h3>
                        <label for="username_textarea">Username:</label>
                        <input type="text" placeholder="Username" id="username_textarea" name="username_textarea">
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Password" id="password" name="password">
                        <label for="confirm-password">Password:</label>
                        <input type="password" placeholder="Confirm password" id="confirm-password" name="confirm-password">
                        <button id="register-page-button">REGISTER</button>
                    </div>
                </div>`;
            overlapDiv.style.visibility = 'visible';
            document.getElementById("register-page-button").addEventListener('click',ev => {
                let username_textarea = document.getElementById("username_textarea").value;
                let password = document.getElementById("password").value;
                let confirm_password = document.getElementById("confirm-password").value;
                console.log(`Username ${username_textarea} Password: ${password} Confirm password: ${confirm_password}`)
                if (password !== confirm_password) {
                    apiPost('/API-register',
                        {
                            "username": username_textarea,
                            "password": password
                        })
                    initiate_page()
                }else {
                    document.getElementById("error_message").innerText = "Passwords does not match"
                    document.getElementById("error_message").style.color = 'red'
                }
            })
        })

    }
}


await initiate_page()
