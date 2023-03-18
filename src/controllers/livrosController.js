import livros from "../models/Livro.js";

class LivroController {
    static listarLivros = (req, res) => {
        livros.find().populate('autor').then( livros => {
            res.status(200).json(livros);
        })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
        .populate('autor', 'nome')
        .then(livros => {         
            res.status(200).send(livros);     
        }) 
        .catch(err => {
            //400 erro do "usuario"
            res.status(400).send({message: `${err.message} - id do livro não localizado.`})
        })             
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save() //uma promisse
        .then(livro => {
            res.status(201).json(livro) //toJSON()
            }
        )
        .catch(err => {
            res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})}
        )
    }

    static atualizarLivro = (req, res) => { 
        const id = req.params.id;

        livros.findByIdAndUpdate(id, req.body)
        .then(() => {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
        })
        .catch(err => {
                res.status(500).send({message: err.message})
        })
    }

    static excluirLivro = (req, res) => {  
        const id = req.params.id;

        livros.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({message: 'Livro removido com sucesso'})
        })
        .catch(err => {
                res.status(500).send({message: err.message})
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;
        
        livros.find({'editora': editora}, {}).then(livros => {
            res.status(200).send(livros);
        })    
    }


}

export default LivroController 
