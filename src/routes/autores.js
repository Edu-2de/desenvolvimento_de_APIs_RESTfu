const express = require('express');
const router = express.Router();

// Dados em memória
const { autores, livros } = require('../data/db');

// GET: Listar todos os autores
router.get('/', (req, res) => {
    res.json(autores);
});

// POST: Criar um novo autor
router.post('/', (req, res) => {
    const { id, nome } = req.body;
    autores.push({ id, nome });
    res.status(201).json({ message: 'Autor criado com sucesso!' });
});

// PUT: Atualizar um autor existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const autor = autores.find((autor) => autor.id === parseInt(id));
    if (!autor) return res.status(404).json({ error: 'Autor não encontrado' });

    autor.nome = nome;
    res.json({ message: 'Autor atualizado com sucesso!' });
});

// DELETE: Remover um autor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = autores.findIndex((autor) => autor.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Autor não encontrado' });
    }
    autores.splice(index, 1);
    res.json({ message: 'Autor removido com sucesso!' });
});

module.exports = router;