// const express = require('express');
import express from "express"
import cors from "cors"
import helmet from "helmet"

import knex from "knex";


const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/product.db3'
    },
    migrations: {
        directory: './db/migrations'
    },
    seeds: {
        directory: './db/seeds'
    },
    useNullAsDefault: true
});





const server = express();

// "dev": "concurrently -k \" vite\" \" node index.js\"",
const HOST = 'localhost';
const PORT = 8888;

server.use(cors());
server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.send('Welcome')
})

server.listen(PORT, () => console.log(`server Running at ${HOST}:${PORT}`));

server.get('/product', async (req, res) => {
    try {
        const products = await db('products');
        res.json(products)
    } catch (error) {
        console.log(error);
    }

});
server.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const products = await db('products').where({id});
        res.json(products)
    } catch (error) {
        console.log(error);
    }

});
server.post('/product', async (req, res) => {
    const p = req.body;
    if (!p.ref || !p.label || !p.prix) {
        return res.status(400).json({ message: 'you must include Product info!' })
    }
    try {
        await db('products').insert(p);
        res.status(201).json({ message: 'Product Successfully stored!' })
    } catch (error) {
        console.log(error);
    }
});
server.put('/product/:id', async (req, res) => {
    const {id} = req.params;
    const p = req.body;
    if (!p.ref || !p.label || !p.prix) {
        return res.status(400).json({ message: 'you must include Product info!' })
    }
    try {
        await db('products').where({ id }).update(p)
        res.status(200).json({ message: 'Product Successfully updated!' })
    } catch (error) {
        console.log(error);
    }
});
server.delete('/product/:id',async (req, res) => {
    const {id} = req.params;
    
    
    try {
        await db('products').where({ id }).delete()
        res.status(200).json({ message: 'Product Successfully deleted!' })
    } catch (error) {
        console.log(error);
    }
})