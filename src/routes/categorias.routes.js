import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middlewares.js";
import produtosController from "../controllers/produtos.controller.js";
import categoriasController from "../controllers/categoria.controller.js";

const produtoRoutes = Router();

produtoRoutes.post("/categorias", categoriasController.criar);
produtoRoutes.get("/categorias", categoriasController.listar);
produtoRoutes.get("/categorias/:id", categoriasController.buscarPorId);
produtoRoutes.put("/categorias/:id", categoriasController.atualizar);
produtoRoutes.delete("/categorias/:id", categoriasController.excluir);

export default produtoRoutes;