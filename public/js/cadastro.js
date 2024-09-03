function cadastro(){
    var registerName = document.getElementById('registerName').value
    var registerEmail = document.getElementById('registerEmail').value
    var registerPassword = document.getElementById('registerPassword').value


console.log(JSON.stringify({
    registerName:registerName,
    registerEmail:registerEmail,
    registerPassword:registerPassword
})),
    fetch("/cadastro", {
        method: 'POST',
        body: JSON.stringify({
            registerName:registerName,
            registerEmail:registerEmail,
            registerPassword:registerPassword
        }),
        headers: {"Content-Type" : "application/json"}
    })

    .then(async (resp) => {
        console.log('Deu certo')
        alert('Cadastro feito com sucesso!')
    });
}
