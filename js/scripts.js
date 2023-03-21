const SITE_CONTENT = "http://127.0.0.1:8000/"
const platform_about = document.getElementById("text-about-platform")
const platform_values = [...document.getElementsByClassName("card")]
const developer = document.getElementsByClassName("developer")

fetch(SITE_CONTENT).then(response => response.json()).then(json => {
    // About Platform
    platform_about.innerHTML = json[0].about_platform
    // Values Cards
    platform_values[0].children[2].innerHTML = json[0].values_card_1
    platform_values[1].children[2].innerHTML = json[0].values_card_2
    platform_values[2].children[2].innerHTML = json[0].values_card_0
    // Developer
    developer[0].children[1].children[1].innerHTML = json[0].about_developer
})
