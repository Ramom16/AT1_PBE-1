import produtoModel from "../models/produtos.model.js";

const produtoController = {


    criar: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto  } = req.body;

            console.log(req.body)

            const produto = {
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem: `/uploads/images/${req.file.filename}`,
                dataCad: new Date()
            };

            const result = await produtoModel.cadastrarProduto(produto);

            res.status(201).json({
                message: "Produto cadastrado com sucesso",
                data: result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    },


    listar: async (req, res) => {
        try {
            const result = await produtoModel.listarProdutos();
            res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoModel.buscarProdutoPorId(id);
            res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nomeProduto, valorProduto } = req.body;
            const result = await produtoModel.atualizarProduto(id, { idCategoria, nomeProduto, valorProduto });
            if (result.affectedRows > 0) return res.status(200).json({ message: "Produto atualizado com sucesso" });
            res.status(400).json({ message: "Erro ao atualizar produto" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },

    excluir: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoModel.excluirProduto(id);
            if (result.affectedRows > 0) return res.status(200).json({ message: "Produto excluído com sucesso" });
            res.status(400).json({ message: "Erro ao excluir produto" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    },

    upload: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ message: "Arquivo não enviado" });
            res.status(200).json({
                message: "Upload realizado com sucesso",
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    }

};

export default produtoController;