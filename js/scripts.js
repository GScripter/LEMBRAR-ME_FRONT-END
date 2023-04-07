import { Annotation, User } from "./user_and_annotation.js"
import * as endpoint from "./endpoints.js"

function validatePasswordAndShowRules(option, password){
    if(option == "rules"){
        const PASSWORD_RULES = document.getElementById("password-rules")
        PASSWORD_RULES.style.display = "block"
        if(password.search(/[A-Z]/) != -1){
           PASSWORD_RULES.children[0].style.color = "#6AB83F"
        }else{
           PASSWORD_RULES.children[0].style.color = "#D96767"
        }

        if(password.search(/[0-9]/) != -1){
           PASSWORD_RULES.children[1].style.color = "#6AB83F"
        }else{
           PASSWORD_RULES.children[1].style.color = "#D96767"
        }

        if(password.length >= 8){
           PASSWORD_RULES.children[2].style.color = "#6AB83F"
        }else{
           PASSWORD_RULES.children[2].style.color = "#D96767"
        }

        if(password.search(/[@#!$%&*()_+=.;,|/]/) != -1){
           PASSWORD_RULES.children[3].style.color = "#6AB83F"
        }else{
           PASSWORD_RULES.children[3].style.color = "#D96767"
        }
    }else if(option == "validate"){
        const ALERT = document.getElementsByClassName("alert-danger")[0]
        const PASSWORD = document.getElementsByClassName("password")
        if(PASSWORD[0].value == PASSWORD[1].value){
            if(PASSWORD[0].value.search(/[A-Z]/) != -1 &&
                PASSWORD[0].value.search(/[0-9]/) != -1 &&
                PASSWORD[0].value.search(/[@#!$%&*()_+=.;,|/]/) != -1 &&
                PASSWORD[0].value.length >= 8){
                return true
            }else{
                ALERT.style = "display: block;"
                ALERT.innerHTML = "Crie uma senha forte o suficiente."
                return false
            }
        }else{
            ALERT.style = "display: block;"
            ALERT.innerHTML = "Suas senhas precisam ser iguais."
            return false
        }
    }
}

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
        }else{
            console.log("Not found")
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

// API - UPDATE TOKEN
if(!(document.getElementById("home")) && !(document.getElementById("login")) &&
    !(document.getElementById("privacy-policies")) && !(document.getElementById("sign-up")) &&
    !(document.getElementById("success"))
){
    fetch(endpoint.TOKEN_REFRESH, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: localStorage.refresh,
        })
    }).then(response => response.json()).then(json => {
        if(json.access){
            localStorage.access = json.access
            localStorage.refresh = json.refresh
        }else{
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            window.location = "login.html"
        }
    })
}

// API - SIGN UP
if(document.getElementById("sign-up-form")){
    [...document.getElementsByClassName("password")].map(el => {
        el.addEventListener("input", (evt) => validatePasswordAndShowRules("rules", evt.target.value))
    })
    document.getElementById("sign-up-form").addEventListener("submit", (evt) => {
        evt.preventDefault()
        if(validatePasswordAndShowRules("validate") == true){
            new User(evt.target.elements[0].value, evt.target.elements[1].value, evt.target.elements[2].value).signUp()
        }
    })
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

// API - LOGOUT
if(document.getElementById("logout")){
    const logout = document.getElementById("btn-logout")
    logout.addEventListener("click", () => {
        new User().logout()
    })
}

// API - DELETE ACCOUNT
if(document.getElementById("btn-delete-account")){
    const delete_account = document.getElementById("btn-delete-account")
    delete_account.addEventListener("click", () => {
        new User().deleteAccount()
    })
}

// API - UPDATE PASSWORD
if(document.getElementById("update-password")){
    [...document.getElementsByClassName("password")].map(el => {
        el.addEventListener("input", (evt) => validatePasswordAndShowRules("rules", evt.target.value))
    })
    document.getElementById("update-password").addEventListener("submit", (evt) => {
        evt.preventDefault()
        if(validatePasswordAndShowRules("validate") == true){
            const USER = new User()
            USER.password = evt.target.elements[0].value
            USER.changePassword()
        }
    })
}

// API - GET AND SHOW ANNOTATIONS
if(document.getElementById("annotations") && !(document.getElementById("results"))){
    fetch(endpoint.ANNOTATIONS, {
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

