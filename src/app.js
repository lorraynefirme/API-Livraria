import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Conexão com o banco feita com sucesso")
})

const app = express();

app.use(express.json());

/*const livros = [
    {id: 1, titulo: "Senhor dos aneis"},
    {id: 2, titulo: "O Hobbit"},
]*/

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node')
})

app.get('/livros', async (req, res) => {
    const result = await livros.find();
    res.status(200).json(result);
});

app.get('/livros/:id', (req, res) => { //Pegar
    let index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
})

app.post('/livros', (req, res) => { //Adicionar
    livros.push(req.body);
    res.status(200).send("O livro foi cadastrado com sucesso")
})

app.put('/livros/:id', (req, res) => { //Atualiar
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete('/livros/:id', (req, res) => { //Deletar
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} removido com sucesso`)
})


function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id);
}

export default app