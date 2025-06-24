import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout"; 
import Home from "../pages/Home";
import EstoqueProdutos from "../pages/EstoqueProdutos";
import Funcionario from "../pages/Funcionarios";
import Configuracoes from "../pages/Configuracoes";
import GerenciaFuncionario from '../components/GerenciaFuncionario';
import LoginPage from "../pages/LoginPage";
import ListaFuncionarios from "../pages/ListaFuncionarios";
import CadastroFuncionario from "../components/CadastroFuncionario";
import Vendas from "../pages/Vendas";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage /> 
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/funcionarios", element: <Funcionario /> },
      { path: "/configuracoes", element: <Configuracoes /> },
      { path: "/produtos", element: <EstoqueProdutos /> },
      { path: '/gerenciaFun', element: <GerenciaFuncionario /> },
      { path: '/listaFuncionarios', element: <ListaFuncionarios /> },
      { path: '/cadastrofun', element: <CadastroFuncionario/> },
      { path: '/vendas', element: <Vendas />}
    ]
  }
]);

export default router;