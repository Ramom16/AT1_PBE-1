import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js"; // 
import produtosController from "../controllers/produtos.controller.js";
import categoriasController from "../controllers/categorias.controller.js";

const produtoRoutes = Router();


produtoRoutes.post("/produtos", uploadImage, produtosController.criar);
produtoRoutes.get("/produtos", produtosController.listar);
produtoRoutes.get("/produtos/:id", produtosController.buscarPorId);
produtoRoutes.put("/produtos/:id", produtosController.atualizar);
produtoRoutes.delete("/produtos/:id", produtosController.excluir);


export default produtoRoutes;