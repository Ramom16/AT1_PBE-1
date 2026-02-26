import pool from "../config/db.js";

const produtoModel = {
    cadastrarProduto: async (produtos) => {

        console.log(produtos)
    const sql = `
        INSERT INTO produtos
        (idCategoriaFk, nomeProduto, valorProduto, vinculoImagem, dataCad)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        produtos.idCategoria,
        produtos.nomeProduto,
        produtos.valorProduto,
        produtos.vinculoImagem ?? null,
        produtos.dataCad
    ];

    const [rows] = await pool.execute(sql, values);
    return rows;
},
    listarProdutos: async () => {
        const sql = "SELECT * FROM produtos";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    buscarProdutoPorId: async (idProduto) => {
        const sql = "SELECT * FROM produtos WHERE idProduto = ?";
        const [rows] = await pool.execute(sql, [idProduto]);
        return rows;
    },

    atualizarProduto: async (idProduto, dados) => {
        const sql = `
            UPDATE produtos
            SET idCategoria = ?, nomeProduto = ?, valorProduto = ?
            WHERE idProduto = ?
        `;
        const values = [
            dados.idCategoria,
            dados.nomeProduto,
            dados.valorProduto,
            idProduto
        ];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    excluirProduto: async (idProduto) => {
        const sql = "DELETE FROM produtos WHERE idProduto = ?";
        const [rows] = await pool.execute(sql, [idProduto]);
        return rows;
    }
};

export default produtoModel;