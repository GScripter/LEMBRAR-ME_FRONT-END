export default class Annotation{
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
        MAIN_TEXT.innerHTML += ` <a href='annotation.html?id=${id}'>Ver mais</a>`
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
        fetch("http://127.0.0.1:8000/create/annotation/",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.access
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
        fetch(`http://127.0.0.1:8000/delete/annotation/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.access
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
        fetch(`http://127.0.0.1:8000/annotations/update/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.access
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
        fetch(`http://127.0.0.1:8000/annotations/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.access
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
        fetch(`http://127.0.0.1:8000/search/annotations/?q=${query}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.access
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

