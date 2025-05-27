import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EstoqueProdutos from "../pages/EstoqueProdutos";
import CadastroProduto from "../pages/CadastroProduto";
import CadastroVenda from "../pages/CadastroVenda";
import HistoricoVendas from "../pages/HistoricoVendas";
import Relatorio from "../pages/Relatorio";
import CadastroFuncionario from "../pages/CadastroFuncionario";
import GerenciaFuncionario from "../pages/GerenciaFuncionario";
import GerenciaAcesso from "../pages/GerenciaAcesso";


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/cadastroVenda", element: <CadastroVenda /> },
    { path: "/cadastroFun", element: <CadastroFuncionario /> },
    { path: "/gerenciaFun", element: <GerenciaFuncionario /> },
    { path: "/gerenciaAcesso", element: <GerenciaAcesso /> },
    { path: "/estoque", element: <EstoqueProdutos /> },
    { path: "/cadProduto", element: <CadastroProduto /> },
    { path: "/historicoVenda", element: <HistoricoVendas /> },
    { path: "/relatorio", element: <Relatorio /> },
    
])

export default router;