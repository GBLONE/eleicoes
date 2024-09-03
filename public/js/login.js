function logar(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

console.log(JSON.stringify({
    email:email,
    password:password
}));

    fetch("/login",{
        method:'POST',
        body: JSON.stringify({
            email:email,
            password:password
        }),
        headers: {"content-type" : "application/json"}
    })

    .then(async (resp) => {
        var status = await resp.text();
        console.log(status)
        if (status  == 'conectado'){
            location.href = '/acesso-restrito/acesso.html'
        }else{
            alert('Email ou Senha inválidos!')
        }
    })
}
  
