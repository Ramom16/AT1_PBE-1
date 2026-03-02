import categoriasModel from "../models/categorias.model.js";

const categoriasController = {
  criar: async (req, res) => {
    try {
      console.log(req.body);
      const { descricaoCategoria } = req.body;
      const result = await categoriaModel.cadastrarCategoria({
        descricaoCategoria,
      });

      if (result.insertId > 0)
        return res
          .status(201)
          .json({ message: "Categoria cadastrada com sucesso" });

      res.status(400).json({ message: "Erro ao cadastrar categoria" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  listar: async (req, res) => {
    try {
      const result = await categoriaModel.listarCategorias();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await categoriaModel.buscarCategoriaPorId(id);
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
      const { descricaoCategoria } = req.body;
      const result = await categoriasModel.atualizarCategoria(
        id,
        descricaoCategoria,
      );
      if (result.affectedRows > 0)
        return res
          .status(200)
          .json({ message: "Categoria atualizada com sucesso" });
      res.status(400).json({ message: "Erro ao atualizar categoria" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await categoriaModel.excluirCategoria(id);
      if (result.affectedRows > 0)
        return res
          .status(200)
          .json({ message: "Categoria excluída com sucesso" });
      res.status(400).json({ message: "Erro ao excluir categoria" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
    }
  },
};

export default categoriasController;
