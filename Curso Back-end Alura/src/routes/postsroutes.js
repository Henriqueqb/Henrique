import express from 'express';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({dest: './uploads' , storage}); //linux ou mac => const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    // Habilita o middleware para analisar dados JSON nas requisições
    app.use(express.json()); 
    app.use(cors(corsOptions));
    // Define uma rota para pegar posts
    app.get('/posts', listarPosts);
    // Rota para criar posts
    app.post('/posts', postarNovoPost);

    app.post('/upload', upload.single("imagem"), uploadImagem);

    app.put('/upload/:id', atualizarNovoPost);
};

export default routes;
