const SITE_CONTENT = "http://127.0.0.1:8000/"
const platform_about = [...document.getElementsByClassName("about-platform")]
const platform_values = [...document.getElementsByClassName("card")]
const developer = [...document.getElementsByClassName("developer")]
const privacy_policies = [...document.getElementsByClassName("privacy-policies")]
// Theme
const body = document.body
const btn_theme = document.getElementById("btn-theme")
btn_theme.addEventListener("click", (evt) => {
    body.classList.toggle("dark-mode")
    if(body.classList.contains("dark-mode")){
        localStorage.theme = true
    }else{
        localStorage.theme = false
    }
})

if(localStorage.theme){
    if(localStorage.theme == 'true'){
        body.classList.add("dark-mode")
    }
}

// API
fetch(SITE_CONTENT).then(response => response.json()).then(json => {
    // About Platform
    if(platform_about.length > 0){
        platform_about[0].children[1].children[1].children[1].innerHTML = json[0].about_platform
    }
    // Values Cards
    if(platform_values.length > 0){
        platform_values[0].children[2].innerHTML = json[0].values_card_0
        platform_values[1].children[2].innerHTML = json[0].values_card_1
        platform_values[2].children[2].innerHTML = json[0].values_card_2
    }
    // Developer
    if(developer.length > 0){
        developer[0].children[1].children[1].innerHTML = json[0].about_developer
        developer[0].children[0].children[0].setAttribute("src", json[0].developer_img)
    }
    // Privacy Policies
    if(privacy_policies.length > 0){
        privacy_policies[0].children[1].innerHTML = json[0].privacy_policies
    }
})

