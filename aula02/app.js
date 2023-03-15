const express = require('express')
const app = express()

app.use(express.json()) //faz com que o express entenda o formato json

/*
// criando um middleware global.

app.use((req, res, next) => {
  console.log("acesso ao middleware");
  next();//chama o proximo middleware ou rota

})
*/
//criando um middleware para validar o corpo da requisição. Middleware como funcao.
function valContato(req, res, next) {
  const {nome, email} = req.body //pega o nome e o email do corpo da requisição
  if (!nome || !email) {
    console.log("acesso ao middleware de validação")
    return res.status(400).json({erro : true,
      mensagem :  "nome e email são obrigatórios"})
  } else {
    next()
  }
}


//rota raiz para testar o servidor

app.get('/', (req, res) => {//rota raiz
 //teste : console.log("acesso a rota raiz")//esse console.log só vai ser executado se a rota raiz for acessada e depois que o middleware for executado
  res.send('Hello World!')
  
}) //cria uma rota raiz

//rota para retornar um contato

app.get('/contato/:id', (req, res) => {

  const{id} = req.params//pega o id da url, desestruturação de objeto. 
  const {sit} = req.query //pega o parametro sit da url
  
  //aqui vai ser o codigo para retornar uma resposta no formato json
  return res.json(
    {
    id, // valido somente se o nome da variavel for igual ao nome da propriedade
    cidade : sit,
    "contato 1": "email1", 
    "contato 2": "email2"})
    
  }) //cria uma rota raiz

   //rota para criar um contato
  //aqui é passado o middleware para validar o corpo da requisição
  app.post('/contato', valContato, (req, res) => {
    console.log("acesso a rota de criar contato")
    const {nome, email} = req.body //pega o nome e o email do corpo da requisição
   
    //aqui vai ser o codigo para retornar uma resposta no formato json
    return res.json(
      {
      nome, // valido somente se o nome da variavel for igual ao nome da propriedade
      email : email,
      "contato 1": "email1", 
      "contato 2": "email2"})
      
    }) 

    //rota para modificar um contato

    app.put('/contato/:id', valContato, (req, res) => {
       const id = req.params.id //pega o id da url
       const {_id, nome, email} = req.body //pega o nome e o email do corpo da requisição
       

      //aqui vai ser o codigo para retornar uma resposta no formato json
      return res.json({
        id,
        idNew : _id,
        nome, // valido somente se o nome da variavel for igual ao nome da propriedade
        email : email,
        "contato 1": "email1",
        "contato 2": "email2"})
      })

      app.delete('/contato/:id', (req, res) => {
        const {id} = req.params //pega o id da url


        return res.json({
          id
      })

      })

  

  
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  }) //roda o servidor na porta 3000