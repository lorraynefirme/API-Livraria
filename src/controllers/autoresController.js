import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = (req, res) => {
        autores.find().then( autores => {
            res.status(200).json(autores);
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id)
        .then(autores => {         
            res.status(200).send(autores);     
        }) 
        .catch(err => {
            //400 erro do "usuario"
            res.status(400).send({message: `${err.message} - id do Autor não localizado.`})
        })             
    }

    static cadastrarAutor = (req, res) => {
        let Autor = new autores(req.body);

        Autor.save() //uma promisse
        .then(Autor => {
            res.status(201).json(Autor) //toJSON()
            }
        )
        .catch(err => {
            res.status(500).send({message: `${err.message} - falha ao cadastrar Autor.`})}
        )
    }

    static atualizarAutor = (req, res) => {   
        const id = req.params.id;

        autores.findByIdAndUpdate(id, req.body)
        .then(() => {
                res.status(200).send({message: 'Autor atualizado com sucesso'})
        })
        .catch(err => {
                res.status(500).send({message: err.message})
        })
    }

    static excluirAutor = (req, res) => {    
        const id = req.params.id;

        autores.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({message: 'Livro removido com sucesso'})
        })
        .catch(err => {
                res.status(500).send({message: err.message})
        })
    }


}

export default AutorController; 
