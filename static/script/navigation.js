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
    overlapDiv.innerHTML = "{% include 'highscore.html' %}"
}
