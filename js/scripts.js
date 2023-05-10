import { Annotation, User } from "./user_and_annotation.js"
import * as endpoint from "./endpoints.js"

// COOKIES ALERT
if(!(localStorage.cookies)){
    const cookies_alert = [...document.getElementsByClassName("cookies-alert")]
    const btn_cookies = [...document.getElementsByClassName("btn-cookies")]
    cookies_alert[0].style = "display: block;"
    btn_cookies[0].addEventListener("click", () => {
        localStorage.cookies = true
        cookies_alert[0].style = "display: none";
    })
}

// THEME
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

// API - SITE CONTENT
if(document.getElementById("home")){
    fetch(endpoint.SITE_CONTENT).then(response => {
        if(response.ok == true){ 
            response.json().then(json => {
                const ABOUT_PLATFORM = document.getElementById("about-platform")
                ABOUT_PLATFORM.children[1].children[1].children[1].innerHTML = json[0].about_platform

                const PLATFORM_VALUES = document.getElementById("platform-values")
                PLATFORM_VALUES.children[1].children[0].children[0].children[2].innerHTML = json[0].values_card_0
                PLATFORM_VALUES.children[1].children[1].children[0].children[2].innerHTML = json[0].values_card_1
                PLATFORM_VALUES.children[1].children[2].children[0].children[2].innerHTML = json[0].values_card_2

                const ABOUT_DEVELOPER = document.getElementById("developer")
                ABOUT_DEVELOPER.children[1].children[1].innerHTML = json[0].about_developer
                ABOUT_DEVELOPER.children[0].children[0].setAttribute("src", json[0].developer_img)
            })
        }
    })
    // SUBSCRIBE
    const BTN_SUBSCRIBE = document.getElementById("subscribe")
    BTN_SUBSCRIBE.addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch(endpoint.SUBSCRIBE, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: evt.target.elements[0].value
            })
        }).then(response => {
            if(response.ok == true){
                window.location = "subscribe-success.html"
            }else{
                alert("Algo deu errado, entre em contato no formulário de contato abaixo e informe o erro.")
            }
        })
    })
}else if(document.getElementById("privacy-policies")){
    fetch(endpoint.SITE_CONTENT).then(response => response.json()).then(json => {
        const PRIVACY_POLICIES = document.getElementById("privacy-policies")
        PRIVACY_POLICIES.children[1].innerHTML = json[0].privacy_policies
    })
}

if(!(document.getElementById("home")) && !(document.getElementById("login")) &&
    !(document.getElementById("privacy-policies")) && !(document.getElementById("sign-up")) &&
    !(document.getElementById("success")) && localStorage.access == null
){
    window.location = "login.html"
}

// API - SIGN IN
if(document.getElementById("login-form")){
    const login_form = document.getElementById("login-form")
    login_form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const USER = new User()
        USER.username = evt.target.elements[0].value
        USER.password = evt.target.elements[1].value
        USER.signIn()
    })
}

// API - SIGN UP
if(document.getElementById("sign-up-form")){
    [...document.getElementsByClassName("password")].map(el => {
        el.addEventListener("input", (evt) => new User().validatePasswordAndShowRules("rules", evt.target.value))
    })
    document.getElementById("sign-up-form").addEventListener("submit", (evt) => {
        evt.preventDefault()
        const USER = new User()
        USER.username = evt.target.elements[0].value
        USER.email = evt.target.elements[1].value
        USER.password = evt.target.elements[2].value
        USER.password2 = evt.target.elements[3].value
        USER.signUp()
    })
}

// API - DELETE ACCOUNT
if(document.getElementById("btn-delete-account")){
    const delete_account = document.getElementById("btn-delete-account")
    delete_account.addEventListener("click", () => {
        new User().deleteAccount()
    })
}

// API - LOGOUT
if(document.getElementById("logout")){
    document.getElementById("btn-logout").addEventListener("click", (evt) => {
        new User().logout()
    })
}

// API - Password Change
if(document.getElementById("update-password")){
    [...document.getElementsByClassName("password")].map(el => {
        el.addEventListener("input", (evt) => new User().validatePasswordAndShowRules("rules", evt.target.value))
    })
    document.getElementById("update-password").addEventListener("submit", (evt) => {
        evt.preventDefault()
        const USER = new User()
        USER.password = evt.target.elements[0].value
        USER.password2 = evt.target.elements[1].value
        USER.passwordChange()
    })
}

// API - GET AND SHOW ANNOTATIONS
if(document.getElementById("annotations") && !(document.getElementById("results"))){
    fetch(endpoint.ANNOTATIONS, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.access}`
        },
    }).then(response => {
        if(response.ok == true){
            response.json().then(json => {
                if(json.length > 0){
                    for(var data of json){
                        new Annotation(data.title, data.summary, data.text).show(data.id)
                    }
                }else{
                    document.getElementById("annotations").remove()
                    document.getElementById("no-annotations").style.display = "block"
                }
            })
        }else{
            document.getElementById("annotations").remove()
            document.getElementById("no-annotations").style.display = "block"
        }
    })
}

// API - CREATE ANNOTATION
if(document.getElementById("create-annotation")){
    const create_annotation = document.getElementById("create-annotation")
    create_annotation.addEventListener("submit", (evt) => {
        evt.preventDefault()
        new Annotation(evt.target.elements[0].value, evt.target.elements[1].value, evt.target.elements[2].value).create_annotation()
    })
}

// API - DELETE ANNOTATION
if(document.getElementById("btn-delete-annotation")){
    const delete_annotation = document.getElementById("btn-delete-annotation")
    delete_annotation.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search)
        new Annotation().delete_annotation(urlParams.get("id"))
    })
}

// API - UPDATE ANNOTATION
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

// API - GET ANNOTATION DETAIL
if(document.getElementById("annotation-detail")){
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.get("id")){
        new Annotation().get_annotation(urlParams.get("id"))
    }else{
        document.getElementById("annotation-detail").children[2].children[0].style.display = "none"
        document.getElementsByClassName("no-annotation")[0].style.display = "block"
    }
}

//  API - SEARCH ANNOTATIONS
if(document.getElementById("search")){
    const search = document.getElementById("search")
    search.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const query = evt.target.elements[0].value
        window.location = `results.html?q=${query}`
    })
}
if(document.getElementById("results")){
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.get("q")){
        new Annotation().search(urlParams.get("q"))
    }else{
        document.getElementById("annotations").remove()
        document.getElementById("no-annotations").style.display = "block"
    }
}

// RETURN TO PREVIOUS PAGE
if(document.getElementById("return")){
    document.getElementById("return").setAttribute("href", document.referrer)
}

// CONTACT FORM
if(document.getElementById("contact-form")){
    document.getElementById("contact-form").addEventListener("submit", (evt) => {
        evt.preventDefault()
        fetch(endpoint.CONTACT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: evt.target.elements[0].value,
                email: evt.target.elements[1].value,
                message: evt.target.elements[2].value,
            })
        }).then(response => {
            if(response.ok == true){
                window.location = "success.html"
            }else{
                alert("Algo deu errado no envio. Certifique-se que todos os campos foram colocados corretamente.")
            }
        })
    })
}

