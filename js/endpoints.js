const DEBUG = false
if(DEBUG){
    var SITE_CONTENT = "http://127.0.0.1:8000/"
    var TOKEN_OBTAIN = "http://127.0.0.1:8000/api/token/"
    var TOKEN_REFRESH = "http://127.0.0.1:8000/api/token/refresh/"
    var SIGN_UP = "http://127.0.0.1:8000/api/register/"
    var DELETE_ACCOUNT = "http://127.0.0.1:8000/api/delete/account/"
    var UPDATE_PASSWORD = "http://127.0.0.1:8000/api/update/password/"
    var SUBSCRIBE = "http://127.0.0.1:8000/subscribe/"
    var CONTACT = "http://127.0.0.1:8000/contact/"
    var ANNOTATIONS = "http://127.0.0.1:8000/annotations/"
    var CREATE_ANNOTATION = "http://127.0.0.1:8000/create/annotation/"
    var DELETE_ANNOTATION = "http://127.0.0.1:8000/delete/annotation/"
    var UPDATE_ANNOTATION = "http://127.0.0.1:8000/annotations/update/"
}else{
    var SITE_CONTENT = "https://lembrar-me-api.up.railway.app/"
    var TOKEN_OBTAIN = "https://lembrar-me-api.up.railway.app/api/token/"
    var TOKEN_REFRESH = "https://lembrar-me-api.up.railway.app/api/token/refresh/"
    var SIGN_UP = "https://lembrar-me-api.up.railway.app/api/register/"
    var DELETE_ACCOUNT = "https://lembrar-me-api.up.railway.app/api/delete/account/"
    var UPDATE_PASSWORD = "https://lembrar-me-api.up.railway.app/api/update/password/"
    var SUBSCRIBE = "https://lembrar-me-api.up.railway.app/subscribe/"
    var CONTACT = "https://lembrar-me-api.up.railway.app/contact/"
    var ANNOTATIONS = "https://lembrar-me-api.up.railway.app/annotations/"
    var CREATE_ANNOTATION = "https://lembrar-me-api.up.railway.app/create/annotation/"
    var DELETE_ANNOTATION = "https://lembrar-me-api.up.railway.app/delete/annotation/"
    var UPDATE_ANNOTATION = "https://lembrar-me-api.up.railway.app/annotations/update/"
}

export { SITE_CONTENT, TOKEN_OBTAIN, TOKEN_REFRESH, SIGN_UP, DELETE_ACCOUNT, UPDATE_PASSWORD,
    SUBSCRIBE, CONTACT, ANNOTATIONS, CREATE_ANNOTATION, DELETE_ANNOTATION, UPDATE_ANNOTATION }
