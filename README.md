# SaleSight

##### Em um mercado automotivo altamente competitivo, a eficiência na gestão de vendas, estoque e atendimento ao cliente é essencial para o sucesso de uma concessionária. A SaleSight é uma plataforma inovadora desenvolvida para otimizar a administração de concessionárias, proporcionando maior controle sobre veículos, clientes e processos internos.

##### Com uma interface intuitiva e funcionalidades avançadas, o sistema permite a gestão completa do estoque de automóveis, acompanhamento de vendas, controle financeiro e gerenciamento de equipes, garantindo maior produtividade e uma experiência aprimorada para clientes e colaboradores. Além disso, oferece integração com sistemas de financiamento, fornecedores e análise de desempenho, auxiliando na tomada de decisões estratégicas.

##### Nosso objetivo é transformar a operação da concessionária em um processo ágil, organizado e eficiente, impulsionando o crescimento e a satisfação dos clientes..

<p align="center"><img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/></p>

## Índice
* [Introdução](#SaleSight)
* [Docker Setup](#docker-setup)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Requisitos Funcionais](#requisitos-funcionais)
* [Requisitos Não Funcionais](#requisitos-não-funcionais)
* [Protótipo de Páginas](#protótipo-de-páginas)
* [Desenvolvedores do Projeto](#desenvolvedores-do-projeto)

## 🐳 Docker Setup

### Execução Rápida:
```bash
docker-compose up -d --build
```

### Acessos:
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3000  
- **PostgreSQL**: localhost:5432

### Teste do Sistema:
```powershell
.\test-simple.ps1
```

📖 **Documentação completa**: [README-DOCKER.md](README-DOCKER.md)

## Tenologias utilizadas
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" height="40" alt="jira logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="figma logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="github logo"  />
</div>


## Requisitos Funcionais:

  <ul>
    <li><strong>[RF001]</strong> Definir níveis de acesso para administrador e funcionários</li> [Abílio]
    <li><strong>[RF002]</strong> Cadastro e gerenciamento de funcionários da organização.</li> [Abílio]
    <li><strong>[RF002]</strong> Cadastro de vendas(informações da venda, produto e comprador).</li> [Joabe]
    <li><strong>[RF002]</strong> Cadastrar bancos de compradores.</li> [Joabe]
    <li><strong>[RF003]</strong> Cadastrar produtos novos.</li> [Giovani]
    <li><strong>[RF004]</strong> Atualizar informações dos produtos disponíveis.</li> [Giovani]
    <li><strong>[RF005]</strong> Painel com indicadores do estoque.</li> [Giovani]
    <li><strong>[RF006]</strong> Histórico de vendas da organização (lucros e comissão,etc...).</li> [Luiz Felipe]
    <li><strong>[RF007]</strong> Histórico de vendas do funcionário.</li> [Luiz Felipe]
    <li><strong>[RF008]</strong> Gerar relatórios com filtros por período, vendedor. </li> [Luiz Felipe]
  </ul>
  
## Requisitos Não Funcionais:

<ul>
    <li><strong>[RNF001]</strong> O sistema deve suportar múltiplos usuários simultâneos sem degradação no desempenho.</li>
    <li><strong>[RNF002]</strong> As consultas e buscas devem ser processadas em no máximo 3 segundos</li>
    <li><strong>[RNF003]</strong> O tempo de resposta da interface não deve exceder 2 segundos.</li>
    <li><strong>[RNF004]</strong> Possuir um design acessível para usuários com diferentes níveis de experiência.</li>
    <li><strong>[RNF005]</strong> Diferentes níveis de acesso (administrador, vendedor).</li>
    <li><strong>[RNF006]</strong> Criar uma interface intuitiva</li>
  
</ul>

## Protótipo de páginas

   <img src="https://i.imgur.com/grkY8Am.png" alt="Cadastro">
   <img src="https://i.imgur.com/iE7ZEu6.png" alt="Login">
  
  
### Desenvolvedores do Projeto

<div align="left">
  <a href="https://github.com/Abivisu2" target="_blank">
    <img width="115" src="https://avatars.githubusercontent.com/u/106842046?v=4" alt="Abilio">
  </a> &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/JoabeSCosta" target="_blank">
    <img width="115" src="https://avatars.githubusercontent.com/u/165953439?v=4" alt="Joabe">
  </a> &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/LuizFli" target="_blank">
    <img width="115" src="https://avatars.githubusercontent.com/u/166057870?v=4" alt="Luiz">
  </a> &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GigioRazzante" target="_blank">
    <img width="115" src="https://avatars.githubusercontent.com/u/166645555?v=4" alt="Giovani">
  </a>
</div>
