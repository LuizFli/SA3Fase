import pool from "../database.js";

export default class FuncionarioController {
  static async getFuncionarios(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM funcionarios ORDER BY nome");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      res.status(500).json({ erro: "Erro ao buscar funcionários" });
    }
  }

  static async postFuncionario(req, res) {
    try {
      const {
        nome, usuario, dataNascimento, sexo, cpf, rg,
        identificador, email, telefone, cargo, rua, numero,
        cidade, estado, cep, senha, foto
      } = req.body;

      const { rows } = await pool.query(
        `INSERT INTO funcionarios (
          nome, usuario, data_nascimento, sexo, cpf, rg, identificador, email,
          telefone, cargo, rua, numero, cidade, estado, cep, senha, foto_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`,
        [
          nome, usuario, dataNascimento, sexo, cpf, rg,
          identificador, email, telefone, cargo, rua, numero,
          cidade, estado, cep, senha, foto
        ]
      );

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      res.status(500).json({ erro: "Erro ao criar funcionário" });
    }
  }

  static async putFuncionario(req, res) {
    try {
      const { id } = req.params;
      const {
        nome, usuario, dataNascimento, sexo, cpf, rg,
        identificador, email, telefone, cargo, rua, numero,
        cidade, estado, cep, senha, foto
      } = req.body;

      const { rows } = await pool.query(
        `UPDATE funcionarios SET
          nome = $1, usuario = $2, data_nascimento = $3, sexo = $4,
          cpf = $5, rg = $6, identificador = $7, email = $8,
          telefone = $9, cargo = $10, rua = $11, numero = $12,
          cidade = $13, estado = $14, cep = $15, senha = $16, foto_url = $17
        WHERE id = $18
        RETURNING *`,
        [
          nome, usuario, dataNascimento, sexo,
          cpf, rg, identificador, email,
          telefone, cargo, rua, numero,
          cidade, estado, cep, senha, foto,
          id
        ]
      );

      console.log("Dados recebidos para atualização:", req.body);
      console.log("ID recebido:", id);

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      res.status(500).json({ erro: "Erro ao atualizar funcionário" });
    }
  }

  static async deleteFuncionario(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM funcionarios WHERE id = $1", [id]);
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      res.status(500).json({ erro: "Erro ao deletar funcionário" });
    }
  }
}