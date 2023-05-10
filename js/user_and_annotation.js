import * as endpoint from "./endpoints.js"

class Annotation{
    constructor(title, summary, text){
        this.title = title
        this.summary = summary
        this.text = text
    }

    show(id){
        const NOTES_BOX = document.getElementById("annotations").lastElementChild
        const ANNOTATION = document.createElement("div")
        const ANNOTATION_ARTICLE = document.createElement("article")
        const ARTICLE_HEADER = document.createElement("header")
        const HEADER_TITLE = document.createElement("p")
        const HEADER_UL = document.createElement("ul")
        const TRASH_LI = document.createElement("li")
        const PENCIL_LI = document.createElement("li")
        const TRASH_A = document.createElement("a")
        const PENCIL_A = document.createElement("a")
        const TRASH_I = document.createElement("i")
        const PENCIL_I = document.createElement("i")
        const ARTICLE_MAIN = document.createElement("main")
        const MAIN_TEXT = document.createElement("p")
        // Set Attributes
        ANNOTATION.setAttribute("class", "col-12 col-sm-11 col-md-6 col-lg-4")
        ANNOTATION_ARTICLE.setAttribute("class", "annotation")
        ARTICLE_HEADER.setAttribute("class", "annotation-header")
        ARTICLE_MAIN.setAttribute("class", "annotation-main")
        TRASH_I.setAttribute("class", "bi bi-trash")
        PENCIL_I.setAttribute("class", "bi bi-pencil")
        // Join
        TRASH_LI.appendChild(TRASH_I)
        PENCIL_LI.appendChild(PENCIL_I)
        HEADER_UL.appendChild(TRASH_LI)
        HEADER_UL.appendChild(PENCIL_LI)
        HEADER_TITLE.innerHTML = this.title
        MAIN_TEXT.innerHTML = this.summary
        ARTICLE_HEADER.appendChild(HEADER_TITLE)
        ARTICLE_HEADER.appendChild(HEADER_UL)
        MAIN_TEXT.innerHTML += ` <a href='annotation.html?id=${id}'>Ver mais +</a>`
        ARTICLE_MAIN.appendChild(MAIN_TEXT)
        ANNOTATION_ARTICLE.appendChild(ARTICLE_HEADER)
        ANNOTATION_ARTICLE.appendChild(ARTICLE_MAIN)
        ANNOTATION.appendChild(ANNOTATION_ARTICLE)
        TRASH_LI.addEventListener("click", () => {
            window.location = "delete.html?id="+id
        })
        PENCIL_LI.addEventListener("click", () => {
            window.location = `update.html?id=${id}&&title=${this.title}&&summary=${this.summary}&&text=${this.text}`
        })
        NOTES_BOX.appendChild(ANNOTATION)
    }

    create_annotation(){
        fetch(endpoint.CREATE_ANNOTATION,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            },
            body: JSON.stringify({
                title: this.title,
                summary: this.summary,
                text: this.text,
            }),
        }).then(response => {
            if(response.status == 200){
                window.location = "annotations.html"
            }else{
                alert("Não foi possível criar a anotação. Certifique-se que todos os campos foram colocados corretamente.")
            }
        })
    }

    delete_annotation(id){
        fetch(`${endpoint.DELETE_ANNOTATION}${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            },
        }).then(response => {
            if(response.status == 204){
                window.location = "annotations.html"
            }else{
                alert("Não foi possível deletar a anotação. Certifique-se que ela existe!")
            }
        })
    }

    update_annotation(id){
        fetch(`${endpoint.UPDATE_ANNOTATION}${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            },
            body: JSON.stringify({
                title: this.title,
                summary: this.summary,
                text: this.text,
            }),
        }).then(response => {
            if(response.ok == true){
                window.location = "annotations.html"
            }else{
                alert("Não foi possível criar a anotação. Caso o erro persista entre em contato pelo formulário no rodapé.")
            }
        })
    }

    get_annotation(id){
        fetch(`${endpoint.ANNOTATIONS}${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            },
        }).then(response => response.json()).then(json => {
            if(json.title && json.text){
                document.getElementById("annotation-detail").children[2].children[0].children[0].innerHTML = json.title
                document.getElementById("annotation-detail").children[2].children[0].children[1].innerHTML = json.text
            }else{
                document.getElementById("annotation-detail").children[2].children[0].style.display = "none"
                document.getElementsByClassName("no-annotation")[0].style.display = "block"
            }
        })
    }

    search(query){
        fetch(`${endpoint.ANNOTATIONS}search/?q=${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            },
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
}


class User{
    constructor(username, email, password, password2){
        this.username = username
        this.email = email
        this.password = password
        this.password2 = password2
    }

    signIn(){
        const ALERT = document.getElementsByClassName("alert-danger")[0]
        fetch(endpoint.SIGN_IN, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password,
            }),
        }).then(response => {
            if(response.ok == true){
                response.json().then(json => {
                    localStorage.access = json.key
                    window.location = "annotations.html"
                })
            }else{
                ALERT.style = "display: block;"
                ALERT.innerHTML = "Usuário ou senha incorreta."
            }
        })
    } 

    passwordChange(){
        const ALERT = document.getElementsByClassName("alert-danger")[0]
        if(this.validatePasswordAndShowRules("validate") == true){
            fetch(endpoint.PASSWORD_CHANGE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.access}`
                },
                body: JSON.stringify({
                    new_password1: this.password,
                    new_password2: this.password2
                }),
            }).then(response => {
                if(response.ok == true){
                    window.location = "update-password-success.html"
                }else{
                    ALERT.style = "display: block;"
                    response.json().then(json => {
                        ALERT.innerHTML = Object.values(json)
                    })
                }
            })
        } 
    }

    signUp(){
        const ALERT = document.getElementsByClassName("alert-danger")[0]
        if(this.validatePasswordAndShowRules("validate") == true){
            fetch(endpoint.SIGN_UP, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password1: this.password,
                    password2: this.password2
                }),
            }).then(response => {
                if(response.ok == true){
                    this.signIn()
                }else{
                    ALERT.style = "display: block;"
                    response.json().then(json => {
                        ALERT.innerHTML = Object.values(json)
                    })
                }
            })
        } 
    }

    logout(){
        fetch(endpoint.LOGOUT, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            }
        }).then(response => {
            localStorage.removeItem("access")
            window.location = 'index.html'
        })
    }

    deleteAccount(){
        fetch(endpoint.DELETE_ACCOUNT, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.access}`
            }
        }).then(response => {
            if(response.ok == true){
                localStorage.removeItem("access")
                window.location = "index.html"
            }else{
                alert("Algo deu errado ao deletar a conta! Entre em contato e informe o problema.")
            }
        })
    }

    validatePasswordAndShowRules(option, password=null){
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
}

export { Annotation, User }
