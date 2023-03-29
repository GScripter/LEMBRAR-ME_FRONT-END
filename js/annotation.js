export default class Annotation{
    constructor(title, summary, text){
        this.title = title
        this.summary = summary
        this.text = text
    }

    show(id){
        const annotations = document.getElementsByClassName("annotations")[0].lastElementChild
        const div = document.createElement("div")
        const article = document.createElement("article")
        const header = document.createElement("header")
        const main = document.createElement("main")
        const title = document.createElement("p")
        const ul = document.createElement("ul")
        const trash_li = document.createElement("li")
        const pencil_li = document.createElement("li")
        const trash_a = document.createElement("a")
        const pencil_a = document.createElement("a")
        const trash_i = document.createElement("i")
        const pencil_i = document.createElement("i")
        const summary = document.createElement("p")
        const detail_link = document.createElement("a")
        // Set Attributes
        div.setAttribute("class", "col-12 col-sm-11 col-md-6 col-lg-4")
        article.setAttribute("class", "annotation")
        header.setAttribute("class", "annotation-header")
        main.setAttribute("class", "annotation-main")
        trash_i.setAttribute("class", "bi bi-trash")
        pencil_i.setAttribute("class", "bi bi-pencil")
        // Join
        detail_link.innerHTML = "Ver mais"
        trash_li.appendChild(trash_i)
        pencil_li.appendChild(pencil_i)
        ul.appendChild(trash_li)
        ul.appendChild(pencil_li)
        title.innerHTML = this.title
        summary.innerHTML = this.summary
        header.appendChild(title)
        header.appendChild(ul)
        summary.innerHTML += ` <a href='annotation.html?id=${id}'>Ver mais</a>`
        main.appendChild(summary)
        article.appendChild(header)
        article.appendChild(main)
        div.appendChild(article)
        trash_li.addEventListener("click", () => {
            window.location = "delete.html?id="+id
        })
        pencil_li.addEventListener("click", () => {
            window.location = `update.html?id=${id}&&title=${this.title}&&summary=${this.summary}&&text=${this.text}`
        })
        annotations.appendChild(div)
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
                alert("Não foi possível criar a anotação. Caso o erro persista entre em contato pelo formulário no rodapé.")
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
                alert("Não foi possível deletar a anotação. Caso o erro persista entre em contato pelo formulário no rodapé.")
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
}

