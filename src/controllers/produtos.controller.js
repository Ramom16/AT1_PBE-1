import produtosModel from "../models/produtos.model.js";

const produtosController = {
  criar: async (req, res) => {
    try {
      const { idCategoria, nomeProduto, valorProduto } = req.body;

      
      if (!req.file) {
        return res.status(400).json({ message: "A imagem do produto é obrigatória." });
      }

      const produto = {
        idCategoria,nomeProduto,valorProduto,vinculoImagem: req.file.filename, 
      };

      const result = await produtosModel.cadastrarProduto(produto);

      res.status(201).json({
        message: "Produto cadastrado com sucesso",
        id: result.insertId, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Erro no servidor ao cadastrar produto",errorMessage: error.message});
    }
  },

  listar: async (req, res) => {
    try {
      const result = await produtosModel.listarProdutos();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await produtosModel.buscarProdutoPorId(id);
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const id = req.params.id;
      const { idCategoria, nomeProduto, valorProduto } = req.body;
      const result = await produtosModel.atualizarProduto(id, {
        idCategoria,
        nomeProduto,
        valorProduto,
      });
      if (result.affectedRows > 0)
        return res
          .status(200)
          .json({ message: "Produto atualizado com sucesso" });
      res.status(400).json({ message: "Erro ao atualizar produto" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await produtosModel.excluirProduto(id);
      if (result.affectedRows > 0)
        return res
          .status(200)
          .json({ message: "Produto excluído com sucesso" });
      res.status(400).json({ message: "Erro ao excluir produto" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  upload: async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "Arquivo não enviado" });
      res.status(200).json({
        message: "Upload realizado com sucesso",
        file: {
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },
};

export default produtosController;
