import {getTodosOsPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGeminifrom from "../services/geminiService.js";
import fs from "fs";

export async function listarPosts(req, res) { 
    // Chama a função para obter os posts
   const posts = await getTodosOsPosts();
   // Envia os posts como resposta JSON com status 200 (OK)
   res.status(200).json(posts);
}

export async function postarNovoPost(req, res){
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        return res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        return res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGeminifrom(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt 
        }

        const postCriado = await atualizarPost(id, post);
        return res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}