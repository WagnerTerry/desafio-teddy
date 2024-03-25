# Desafio Teddy Open Finance

 Desafio onde se deve construir uma arquitetura de microfrontends.

 Cada pedaço tem seu papel primordial, fazendo com que o front seja dividido , podendo auxiliar os times em seu desenvolvimento.


## Rodando o projeto

Baixe as dependências de cada projeto com o comando
- yarn

E dentro das pastas execute
- yarn start

Muita atenção na hora de executar cada microfrontend, sugiro que execute na seguinte ordem
- root
- app-login
- app-home
- app-navbar
- app-list-partners
- app-about
- app-register-partner
- app-list-external-companies
- app-register-external-company

Se executar numa ordem diferente, o localhost irá modificar e será necessário mexer na pasta root e configurar dentro de index.ejs a rota inicializada

## Tecnologias usadas
<p>SPA</p>
<p>React</p>
<p>Angular</p>
<p>TypeScript</p>
<p>Axios</p>
<p>Material UI</p>
<p>HTML</p>
<p>CSS</p>

## Pontos de melhoria
- Preparar projeto em contêiner para que o time de infra consiga subir num cloud, exemplo ECS da AWS.
- Compartilhar dados da tabela: em relação a paginação, deve existir um mecanismo que ao compartilhar o link com outra pessoa, a pessoa deve ser redirecionada para a página específica da tabela, exemplo se ao compartilhar o link a paginação avançou até a página 3, ao entrar no link deve está na página 3, caso o usuário esteja logado, caso não, após o login ele deve ser redirecionado.

- Iniciar com Vite.
- Testes unitários.
- Testes automatizados.
- Deploy do projeto no GitHub Pages.
- Deploy no Vercel.
