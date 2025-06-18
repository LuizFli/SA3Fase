import pool from "../database.js";

export default class VendaController {
    static async getVenda(req, res) {
        try {
            const response = await pool.query("SELECT * FROM vendas;");
            res.status(200).json(response.rows);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            res.status(500).json({ erro: "Erro ao buscar vendas" });
        }
    }
    static async postVenda(req, res) {
        try {
            const venda = req.body;
            const response = await pool.query(
                `INSERT INTO vendas (
                  funcionario_id, cliente_id, produto_id, quantidade, valor_total
                ) VALUES (
                  $1, $2, $3, $4, $5
                );`,
                [
                    venda.funcionarioId,
                    venda.veiculoId,
                    venda.produtoId,
                    venda.quantidade,
                    venda.valorTotal
                ]
            );
            res.status(200).json(response.rows);
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
            res.status(500).json({ erro: "Erro ao registrar venda" });
        }
    }
}