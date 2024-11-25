// Importa o módulo express para criar a aplicação web
import express from "express";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa o módulo multer para lidar com requisições multipart/form-data (envio de arquivos)
import multer from "multer";

// Importa as funções necessárias do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura as opções de armazenamento do multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos enviados (relativo à raiz do projeto)
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Altere este caminho se você tiver um diretório de uploads diferente
  },

  // Define o nome do arquivo para os arquivos enviados (evita sobrescrita)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ storage });

// Define as rotas para a aplicação
const routes = (app) => {
  // Analisa dados JSON recebidos nos corpos das requisições
  app.use(express.json());
  app.use(cors(corsOptions));
  // Requisição GET para a rota `/posts`: Recupera uma lista de posts (implementado em postsController.js)
  app.get("/posts", listarPosts);

  // Requisição POST para a rota `/posts`: Cria um novo post (implementado em postsController.js)
  app.post("/posts", postarNovoPost);

  // Requisição POST para a rota `/upload`: Lidar com envios de arquivos usando multer
  app.post("/upload", upload.single("imagem"), uploadImagem); // Use 'imagem' como o nome do campo do formulário para o arquivo

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função de rotas para ser usada no arquivo principal da aplicação
export default routes;