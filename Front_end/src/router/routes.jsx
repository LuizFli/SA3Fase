import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EstoqueProdutos from "../pages/EstoqueProdutos";
import CadastroProduto from "../pages/CadastroProduto";
import CadastroVenda from "../pages/CadastroVenda";
import HistoricoVendas from "../pages/HistoricoVendas";
import Relatorio from "../pages/Relatorio";
import GerenciaAcesso from "../pages/GerenciaAcesso";
import TesteGraficos from "../pages/TesteGraficos";
import Funcionario from "../pages/Funcionario";
import GerenciaFuncionario from '../components/GerenciaFuncionario'
import LoginPage from "../pages/LoginPage";


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/cadastroVenda", element: <CadastroVenda /> },
    { path: "/funcionarios", element: <Funcionario /> },
    { path: "/gerenciaAcesso", element: <GerenciaAcesso /> },
    { path: "/produtos", element: <EstoqueProdutos /> },
    { path: "/cadProduto", element: <CadastroProduto /> },
    { path: "/configuracoes", element: <HistoricoVendas /> },
    { path: "/relatorio", element: <Relatorio /> },
    { path: "/logout", element: <TesteGraficos /> },
    { path: '/gerenciaFun' ,element: <GerenciaFuncionario />},
    { path: '/login' ,element: <LoginPage /> }


    
])

export default router;