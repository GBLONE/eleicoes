const http = require('http');
const path = require('path');

const express = require('express');
const fs = require('fs');
const session = require('express-session');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:"abc"}));

// configurações
app.set('port', process.env.PORT || 3000); // sem TAB


// seção login

app.use('/acesso-restrito/*', (req, res, next) => {
    if(req.session.email){
        next();
    }else{
        res.redirect('/index.html');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
//'/site'
// start do server
server.listen(app._router.get('port'), () => {
    console.log('server na porta', app.get('port'));
});

app.listen(3000);  // O link do server "http://localhost:3000/"


// login do front para o back

app.post('/login', (req, res) => {
    const usuarioscad = fs.readFileSync('./usuarios.json');
    const usuariosparse = JSON.parse(usuarioscad);

    var email = req.body.email;
    var password = req.body.password;

        for(var umUsuario of usuariosparse){
            if(email === umUsuario.email && password === umUsuario.password){
                    req.session.email = umUsuario;
                    return res.send('conectado');
            };
        
        };
        res.send('falhou');
});

// cadastro
app.post('/cadastro',(req, res) => {
    const usuarioscad =   fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)
    
    
        var registerName = req.body.registerName
        var registerEmail = req.body.registerEmail
        var registerPassword = req.body.registerPassword
      
        const datauser = {
            nome: registerName,
            email: registerEmail,
            senha: registerPassword
        }
    
        usuariosparse.push(datauser)
        
        
        
        fs.writeFile('./usuarios.json', JSON.stringify(usuariosparse, null, 4 ) ,(error, result ) => {
            if (error){
                console.error(error)
        
                return
            }
        
            console.log(result)
        
        
        } ) 
})