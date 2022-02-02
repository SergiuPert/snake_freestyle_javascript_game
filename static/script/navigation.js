import {apiGet} from "./APIs.js";

let overlapDiv = document.getElementById("overlap_div");
async function hideOverlapContent() {
    overlapDiv.style.visibility="hidden"
    overlapDiv.innerHTML = ""
}

window.onload = function () {
    hideOverlapContent().then(r => "hidden");
}



let overlapHighscoreButton = document.getElementById("overlap_highscore")
overlapHighscoreButton.addEventListener('click',ev => overlap_highscore())
overlapHighscoreButton.addEventListener("keydown",function (event){
    if (event.key === 'Escape'){
        hideOverlapContent().then(r => "done")
    }
} )
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

