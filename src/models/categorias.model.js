import pool from "../config/db.js";

const categoriaModel = {
    cadastrarCategoria: async (categorias) => {
        const sql = `
            INSERT INTO categorias
            (descricaoCategoria, dataCad)
            VALUES (?, ?)
        `;
        const values = [categorias.descricaoCategoria, new Date()];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    listarCategorias: async () => {
        const sql = "SELECT * FROM categorias";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    buscarCategoriaPorId: async (idCategoria) => {
        const sql = "SELECT * FROM categorias WHERE idCategoria = ?";
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows;
    },

    atualizarCategoria: async (idCategoria, descricaoCategoria) => {
        const sql = `
            UPDATE categorias
            SET descricaoCategoria = ?
            WHERE idCategoria = ?
        `;
        const [rows] = await pool.execute(sql, [descricaoCategoria, idCategoria]);
        return rows;
    },

    excluirCategoria: async (idCategoria) => {
        const sql = "DELETE FROM categorias WHERE idCategoria = ?";
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows;
    }
};

export default categoriaModel;