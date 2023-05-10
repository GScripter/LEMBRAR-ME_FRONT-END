const DEBUG = false
if(DEBUG){
    var SITE_CONTENT = "http://127.0.0.1:8000/"
    var DELETE_ACCOUNT = "http://127.0.0.1:8000/api/delete/account/"
    var SUBSCRIBE = "http://127.0.0.1:8000/subscribe/"
    var CONTACT = "http://127.0.0.1:8000/contact/"
    var ANNOTATIONS = "http://127.0.0.1:8000/annotations/"
    var CREATE_ANNOTATION = "http://127.0.0.1:8000/create/annotation/"
    var DELETE_ANNOTATION = "http://127.0.0.1:8000/delete/annotation/"
    var UPDATE_ANNOTATION = "http://127.0.0.1:8000/annotations/update/"
    var SIGN_IN = "http://127.0.0.1:8000/auth/login/"
    var SIGN_UP = "http://127.0.0.1:8000/auth/registration/"
    var LOGOUT = "http://127.0.0.1:8000/auth/logout/"
    var PASSWORD_CHANGE = "http://127.0.0.1:8000/auth/password/change/"
}else{
    var SITE_CONTENT = "https://lembrar-me-api.up.railway.app/"
    var DELETE_ACCOUNT = "https://lembrar-me-api.up.railway.app/api/delete/account/"
    var SUBSCRIBE = "https://lembrar-me-api.up.railway.app/subscribe/"
    var CONTACT = "https://lembrar-me-api.up.railway.app/contact/"
    var ANNOTATIONS = "https://lembrar-me-api.up.railway.app/annotations/"
    var CREATE_ANNOTATION = "https://lembrar-me-api.up.railway.app/create/annotation/"
    var DELETE_ANNOTATION = "https://lembrar-me-api.up.railway.app/delete/annotation/"
    var UPDATE_ANNOTATION = "https://lembrar-me-api.up.railway.app/annotations/update/"
    var SIGN_IN = "https://lembrar-me-api.up.railway.app/auth/login/"
    var SIGN_UP = "https://lembrar-me-api.up.railway.app/auth/registration/"
    var LOGOUT = "https://lembrar-me-api.up.railway.app/auth/logout/"
    var PASSWORD_CHANGE = "https://lembrar-me-api.up.railway.app/auth/password/change/"
}

export { SITE_CONTENT, DELETE_ACCOUNT, SUBSCRIBE, CONTACT, ANNOTATIONS, CREATE_ANNOTATION, DELETE_ANNOTATION, UPDATE_ANNOTATION, SIGN_IN, SIGN_UP, LOGOUT, PASSWORD_CHANGE }
