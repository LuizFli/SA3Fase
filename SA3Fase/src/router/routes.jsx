import { createBrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";


const router = createBrowserRouter([
    {path: "/", element: <Home/>}
    // {path: "/maisVendidos", element: <MaisVendidos/>},
    // {path: "/gerenFunc", element: <AlterarCad />},
    // {path: "/cadastroFunc", element: <CadastroFunc />},
    // {path: "/config", element: <Config />},
    // {path: "/login", element: <Login />},
    // {path: "/produtos", element: <Produtos />},
    // {path: "/desempenho", element: <Desempenho />},
    // {path: "/cadProduto", element: <CadastroProduto />},
    // {path: "/historico", element: <Historico/>},
    // {path: "/editarProduto", element: <EditarProduto/>},
    // {path: "/alterarFunc", element: <AlterarFunc/>}
    
])

export default router;