import Annotation from "./annotation.js"

/////////////////////////////////
//  Privacy Policies 
/////////////////////////////////
if(document.getElementById("return")){
    document.getElementById("return").setAttribute("href", document.referrer)
}
/////////////////////////////////
//   Cookies Alert
/////////////////////////////////
if(!(localStorage.cookies)){
    const cookies_alert = [...document.getElementsByClassName("cookies-alert")]
    const btn_cookies = [...document.getElementsByClassName("btn-cookies")]
    cookies_alert[0].style = "display: block;"
    btn_cookies[0].addEventListener("click", () => {
        localStorage.cookies = true
        cookies_alert[0].style = "display: none";
    })
}
/////////////////////////////////
//   Theme
/////////////////////////////////
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
/////////////////////////////////
//   API - Site Text
/////////////////////////////////
fetch("http://127.0.0.1:8000/").then(response => response.json()).then(json => {
    // About Platform
    const platform_about = [...document.getElementsByClassName("about-platform")]
    if(platform_about.length > 0){
        platform_about[0].children[1].children[1].children[1].innerHTML = json[0].about_platform
    }
    // Values Cards
    const platform_values = [...document.getElementsByClassName("card")]
    if(platform_values.length > 0){
        platform_values[0].children[2].innerHTML = json[0].values_card_0
        platform_values[1].children[2].innerHTML = json[0].values_card_1
        platform_values[2].children[2].innerHTML = json[0].values_card_2
    }
    // Developer
    const developer = [...document.getElementsByClassName("developer")]
    if(developer.length > 0){
        developer[0].children[1].children[1].innerHTML = json[0].about_developer
        developer[0].children[0].children[0].setAttribute("src", json[0].developer_img)
    }
    // Privacy Policies
    const privacy_policies = [...document.getElementsByClassName("privacy-policies")]
    if(privacy_policies.length > 0){
        privacy_policies[0].children[1].innerHTML = json[0].privacy_policies
    }
})
/////////////////////////////////
//   API - Update Token
/////////////////////////////////
if(!(document.getElementById("login-form")) && !(document.getElementById("register-form"))){
    fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: localStorage.refresh,
        })
    }).then(response => response.json()).then(json => {
        if(json.code && json.code == "token_not_valid"){
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            window.location = "login.html"
        }else{
            localStorage.access = json.access
            localStorage.refresh = json.refresh
        }
    })
}
/////////////////////////////////
//   API - Login
/////////////////////////////////
const login_form = document.getElementById("login-form")
const alert_danger = document.getElementsByClassName("alert-danger")
if(login_form){
    login_form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch("http://127.0.0.1:8000/api/token/", {
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
/////////////////////////////////
//   API - Register
/////////////////////////////////
const register_form = document.getElementById("register-form")
if(register_form){
    register_form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch("http://127.0.0.1:8000/api/register/", {
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
/////////////////////////////////
// API - Get and Show Annotations
/////////////////////////////////
if(document.getElementById("annotations")){
    fetch("http://127.0.0.1:8000/annotations/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.access
        }
    }).then(response => response.json()).then(json => {
        if(json.length > 0){
            for(var data of json){
                new Annotation(data.title, data.summary, data.text).show(data.id)
            }
        }else{
            document.getElementById("annotations").remove()
            document.getElementById("no-annotations").style.display = "block"
        }
    })
}

/////////////////////////////////
// API - Create Annotation
/////////////////////////////////
if(document.getElementById("create-annotation")){
    const create_annotation = document.getElementById("create-annotation")
    create_annotation.addEventListener("submit", (evt) => {
        evt.preventDefault()
        new Annotation(evt.target.elements[0].value, evt.target.elements[1].value, evt.target.elements[2].value).create_annotation()
    })
}
/////////////////////////////////
// API - Delete Annotation
/////////////////////////////////
if(document.getElementById("btn-delete-annotation")){
    const delete_annotation = document.getElementById("btn-delete-annotation")
    delete_annotation.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search)
        new Annotation().delete_annotation(urlParams.get("id"))
    })
}
/////////////////////////////////
// API - Update Annotation
/////////////////////////////////
if(document.getElementById("update-annotation")){
    const update_annotation = document.getElementById("update-annotation")
    const urlParams = new URLSearchParams(window.location.search)
    update_annotation.children[0].value = urlParams.get("title")
    update_annotation.children[1].value = urlParams.get("summary")
    update_annotation.children[2].value = urlParams.get("text")
    update_annotation.addEventListener("submit", (evt) => {
        evt.preventDefault()
        new Annotation(evt.target.elements[0].value, evt.target.elements[1].value, evt.target.elements[2].value).update_annotation(urlParams.get("id"))
    })
}
/////////////////////////////////
// API - Get Annotation Detail
/////////////////////////////////
if(document.getElementById("annotation-detail")){
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.get("id")){
        new Annotation().get_annotation(urlParams.get("id"))
    }else{
        document.getElementById("annotation-detail").children[2].children[0].style.display = "none"
        document.getElementsByClassName("no-annotation")[0].style.display = "block"
    }
}
/////////////////////////////////
// 
/////////////////////////////////
