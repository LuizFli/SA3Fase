import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EstoqueProdutos from "../pages/EstoqueProdutos";
import CadastroProduto from "../pages/CadastroProduto";
import CadastroVenda from "../pages/CadastroVenda";
import HistoricoVendas from "../pages/HistoricoVendas";
import Relatorio from "../pages/Relatorio";


const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/cadastroVenda", element: <CadastroVenda /> },
    // {path: "/maisVendidos", element: <MaisVendidos/>},
    // {path: "/gerenFunc", element: <AlterarCad />},
    // {path: "/cadastroFunc", element: <CadastroFunc />},
    // {path: "/config", element: <Config />},
    // {path: "/login", element: <Login />},
    // { path: "/produtos", element: <Produtos /> },
    { path: "/estoque", element: <EstoqueProdutos/>},
    // {path: "/desempenho", element: <Desempenho />},
    { path: "/cadProduto", element: <CadastroProduto /> },
    { path: "/historicoVenda", element: <HistoricoVendas /> },
    { path: "/relatorio", element: <Relatorio /> },
    // {path: "/historico", element: <Historico/>},
    // {path: "/editarProduto", element: <EditarProduto/>},
    // {path: "/alterarFunc", element: <AlterarFunc/>}

])

export default router;