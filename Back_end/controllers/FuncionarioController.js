import pool from "../database.js";

export default class FuncionarioController {
  static async getFuncionario(req, res) {
    try {
      const response = await pool.query("SELECT * FROM funcionarios;");
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      res.status(500).json({ erro: "Erro ao buscar funcionários" });
    }
  }
  static async postFuncionario(req, res) {
    try {
        const funcionario = req.body
        const response = await pool.query(
            `INSERT INTO funcionarios (
              nome, usuario, data_nascimento, sexo, cpf, rg, identificador, email,
              telefone, cargo, rua, numero, cidade, estado, cep, senha,
              foto_url
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8,
              $9, $10, $11, $12, $13, $14, $15, $16, $17
            );`,
            [
              funcionario.nome,
              funcionario.usuario,
              funcionario.dataNascimento,
              funcionario.sexo,
              funcionario.cpf,
              funcionario.rg,
              funcionario.identificador,
              funcionario.email,
              funcionario.telefone,
              funcionario.cargo,
              funcionario.rua,
              funcionario.numero,
              funcionario.cidade,
              funcionario.estado,
              funcionario.cep,
              funcionario.senha,
              funcionario.foto
            ]
          );
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      res.status(500).json({ erro: "Erro ao buscar funcionários" });
    }
  }
}
