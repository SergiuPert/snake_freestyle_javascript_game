import {apiGet} from "./APIs.js";

window.onload = function () {
    hideOverlapContent();
}

function hideOverlapContent() {
    let overlapDiv = document.getElementById("overlap_div");
    overlapDiv.style.visibility="hidden"
    overlapDiv.innerHTML = ""
}

function overlapHighscore(){
    let overlapDiv = document.getElementById("overlap_div");
    overlapDiv.style.visibility="visible";
    let highscores = apiGet("/APIgethighscore")
    console.log(highscores)
    // overlapDiv.innerHTML = "<div>\n" +
    //     "    <table>\n" +
    //     "    <thead>\n" +
    //     "        <tr>\n" +
    //     "            <th>USERNAME</th>\n" +
    //     "            <th> HIGHSCORE</th>\n" +
    //     "        </tr>\n" +
    //     "    </thead>\n" +
    //     "        <tbody>\n" +
    //     "        {% for user in users  %}\n" +
    //     "            <tr>\n" +
    //     "                <td>{{ user.username }}</td>\n" +
    //     "                <td>{{ user.highscore }}</td>\n" +
    //     "            </tr>\n" +
    //     "        {% endfor %}\n" +
    //     "        </tbody>\n" +
    //     "    </table>\n" +
    //     "</div>"
}

