const platform_about = [...document.getElementsByClassName("about-platform")]
const platform_values = [...document.getElementsByClassName("card")]
const developer = [...document.getElementsByClassName("developer")]
const privacy_policies = [...document.getElementsByClassName("privacy-policies")]
// Cookies Alert
if(!(localStorage.cookies)){
    const cookies_alert = [...document.getElementsByClassName("cookies-alert")]
    const btn_cookies = [...document.getElementsByClassName("btn-cookies")]
    cookies_alert[0].style = "display: block;"
    btn_cookies[0].addEventListener("click", () => {
        localStorage.cookies = true
        cookies_alert[0].style = "display: none";
    })
}

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
const SITE_CONTENT = "http://127.0.0.1:8000/"
const annotations = "http://127.0.0.1:8000/annotations/"
const token_obtain = "http://127.0.0.1:8000/api/token/"
const create_user = "http://127.0.0.1:8000/api/register/"

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

// Login
const login_form = document.getElementById("login-form")
const alert_danger = document.getElementsByClassName("alert-danger")
if(login_form){
    login_form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch(token_obtain, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: evt.target.elements[0].value,
                password: evt.target.elements[1].value,
            }),
        }).then(response => response.json()).then(json => {
            localStorage.access = json.access
            localStorage.refresh = json.refresh
            if(json.access){
                window.location = "annotations.html"
            }else{
                alert_danger[0].style = "display: block;"
            }
        })
    })
}


// register
const register_form = document.getElementById("register-form")
if(register_form){
    register_form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch(create_user, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: evt.target.elements[0].value,
                email: evt.target.elements[1].value,
                password: evt.target.elements[2].value,
            }),
        }).then(response => response.json()).then(json => console.log(json))
    })
}

fetch(annotations, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.access
    },
}).then(response => response.json()).then(json => {
})
