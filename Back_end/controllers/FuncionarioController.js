// controllers/FuncionarioController.js

import pool from "../database.js";
import NotificacaoService from "../services/notificacoesService.js";

export default class FuncionarioController {

 static async getFuncionarios(req, res) {
  try {
    const { identificador } = req.query;
    let query = "SELECT *, ativo FROM funcionarios";
    let params = [];
    if (identificador) {
      query += " WHERE identificador = $1";
      params.push(identificador);
    }
    query += " ORDER BY nome";
    const { rows } = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    res.status(500).json({ erro: "Erro ao buscar funcionários" });
  }
}

  static async getFuncionarioById(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query("SELECT * FROM funcionarios WHERE id = $1", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      res.status(500).json({ erro: "Erro ao buscar funcionário" });
    }
  }

  static async postFuncionario(req, res) {
    try {
      const {
        nome, usuario, data_nascimento, sexo, cpf, rg,
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
          nome, usuario, data_nascimento, sexo, cpf, rg,
          identificador, email, telefone, cargo, rua, numero,
          cidade, estado, cep, senha, foto
        ]
      );

      const funcionarioCadastrado = rows[0];

      // Criar notificação de cadastro
      try {
        await NotificacaoService.notificarCadastroFuncionario(funcionarioCadastrado);
      } catch (notifError) {
        console.error('Erro ao criar notificação de funcionário:', notifError);
        // Não interrompe o fluxo principal
      }

      res.status(201).json(funcionarioCadastrado);
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      res.status(500).json({ erro: "Erro ao criar funcionário" });
    }
  }

  static async putFuncionario(req, res) {
    try {
      const { id } = req.params;
      const {
        nome, usuario, data_nascimento, sexo, cpf, rg,
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
          nome, usuario, data_nascimento, sexo,
          cpf, rg, identificador, email,
          telefone, cargo, rua, numero,
          cidade, estado, cep, senha, foto,
          id
        ]
      );
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      res.status(500).json({ erro: "Erro ao atualizar funcionário" });
    }
  }

static async toggleStatusFuncionario(req, res) {
  try {
    const { id } = req.params;
    
    // Primeiro verifica se o funcionário existe
    const funcionario = await pool.query("SELECT id, ativo FROM funcionarios WHERE id = $1", [id]);
    if (funcionario.rows.length === 0) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }

    // Inverte o status booleano
    const novoStatus = !funcionario.rows[0].ativo;
    
    // Atualiza no banco de dados
    await pool.query("UPDATE funcionarios SET ativo = $1 WHERE id = $2", [novoStatus, id]);
    
    res.status(200).json({ 
      message: `Funcionário ${novoStatus ? 'reativado' : 'inativado'} com sucesso`,
      ativo: novoStatus
    });
  } catch (error) {
    console.error("Erro ao alterar status do funcionário:", error);
    res.status(500).json({ 
      erro: "Erro ao alterar status do funcionário",
      detalhes: error.message
    });
  }
}


}