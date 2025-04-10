function sub(){
    var email = document.getElementById("Email").value
    var senha = document.getElementById("Senha").value
    var span  = document.getElementById("spanS")
    if (email == ""){
        document.getElementById("Email").style.border = "1px solid red"
        document.getElementById("Email").placeholder = "insira um email"
        return false
    }else{
        document.getElementById("Email").style.border = "1px solid #444"
    }
    if (senha == ""){
        document.getElementById("Senha").style.border = "1px solid red"
        document.getElementById("Senha").placeholder = "Insira uma senha"
        return false
    }else{
        document.getElementById("Senha").style.border = "1px solid #444"
    }
    if(senha.length < 3){
        span.innerHTML = "senha muito fraca"
        return false

    }
}
function esqueceuasenha(){
    alert("Tente novamente")
}
function sub2(){
        var nome = document.getElementById("Nome").value
        var email = document.getElementById("Email").value
        var senha = document.getElementById("Senha").value
        var confirmarSenha = document.getElementById("ConfirmarSenha").value
        var span = document.getElementById("spanS")
    
        if (nome == "") {
            document.getElementById("Nome").style.border = "1px solid red"
            document.getElementById("Nome").placeholder = "Insira um nome"
            return false;
        } else {
            document.getElementById("Nome").style.border = "1px solid #444"
            document.getElementById("Nome").placeholder = ""
        }
    
        if (email == "") {
            document.getElementById("Email").style.border = "1px solid red"
            document.getElementById("Email").placeholder = "Insira um email"
            return false
        } else {
            document.getElementById("Email").style.border = "1px solid #444"
            document.getElementById("Email").placeholder = ""
        }
    
        if (senha == "") {
            document.getElementById("Senha").style.border = "1px solid red"
            document.getElementById("Senha").placeholder = "Insira uma senha"
            return false
        } else {
            document.getElementById("Senha").style.border = "1px solid #444"
            document.getElementById("Senha").placeholder = ""
        }
    
        if (senha.length < 3) {
            span.innerHTML = "Senha muito fraca";
            span.style.color = "red";
            return false;
        } else {
            span.innerHTML = "";
        }
    
        if (senha != confirmarSenha) {
            document.getElementById("ConfirmarSenha").style.border = "1px solid red";
            span.innerHTML = "coloque senhas iguais";
            span.style.color = "red";
            return false;
        } else {
            document.getElementById("ConfirmarSenha").style.border = "1px solid #444";
        }
    
}