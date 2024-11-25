import express from "express"; // Importa a biblioteca Express para criar a aplicação web
import routes from "./src/routes/postsRoutes.js";

// Array de posts inicial (será substituído pelos dados do banco de dados)
// Comentado pois não será utilizado após a implementação com o banco
const posts = [
    // ...
];

const app = express(); // Cria uma instância do Express para a aplicação
app.use(express.static("uploads"));
routes(app);


app.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor escultando... ");
});

async function getTodosOsPosts() { // Função assíncrona para obter todos os posts do banco de dados
    const db = conexao.db("imersao-instabyte"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção de posts
    return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
}


