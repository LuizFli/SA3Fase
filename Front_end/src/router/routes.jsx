import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout"; // Novo componente de layout
import Home from "../pages/Home";
import EstoqueProdutos from "../pages/EstoqueProdutos";
import CadastroProduto from "../pages/CadastroProduto";
import CadastroVenda from "../pages/CadastroVenda";
import Funcionario from "../pages/Funcionario";
import GerenciaAcesso from "../pages/GerenciaAcesso";
import HistoricoVendas from "../pages/HistoricoVendas";
import Relatorio from "../pages/Relatorio";
import TesteGraficos from "../pages/TesteGraficos";
import GerenciaFuncionario from '../components/GerenciaFuncionario';
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage /> // Rota pública (sem sidebar)
  },
  {
    path: '/',
    element: <MainLayout />, // Todas as rotas abaixo terão sidebar fixa
    children: [
      { path: "/dashbord", element: <Home /> },
      { path: "/cadastroVenda", element: <CadastroVenda /> },
      { path: "/funcionarios", element: <Funcionario /> },
      { path: "/gerenciaAcesso", element: <GerenciaAcesso /> },
      { path: "/produtos", element: <EstoqueProdutos /> },
      { path: "/cadProduto", element: <CadastroProduto /> },
      { path: "/configuracoes", element: <HistoricoVendas /> },
      { path: "/relatorio", element: <Relatorio /> },
      { path: "/logout", element: <TesteGraficos /> },
      { path: '/gerenciaFun', element: <GerenciaFuncionario /> }
    ]
  }
]);

export default router;