# Desafio Teddy Open Finance

 Desafio onde se deve construir uma arquitetura de microfrontends.

 Cada pedaço tem seu papel primordial, fazendo com que o front seja dividido , podendo auxiliar os times em seu desenvolvimento.

 Nesse desafio eu utilizei o React e o Angular 15

## Capa do Projeto
![capa-microfrontends](https://github.com/WagnerTerry/desafio-teddy/blob/main/assets/desafio%20microfrontends.png)

## Gif Projeto
![microfrontends](https://github.com/WagnerTerry/desafio-teddy/blob/main/assets/microfrontends.gif)

## Video (Youtube)
[Apresentação desafio teddy](https://youtu.be/uGL_GR4FBfc)

## Rodando o projeto

Baixe as dependências de cada projeto com o comando
```
yarn
```

E dentro das pastas execute
```
yarn start
```

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

## Dependências

- axios
- @material-ui/core
- @mui/material @emotion/react @emotion/styled

## Pontos de melhoria
- Preparar projeto em contêiner para que o time de infra consiga subir num cloud, exemplo ECS da AWS.
- Compartilhar dados da tabela: em relação a paginação, deve existir um mecanismo que ao compartilhar o link com outra pessoa, a pessoa deve ser redirecionada para a página específica da tabela, exemplo se ao compartilhar o link a paginação avançou até a página 3, ao entrar no link deve está na página 3, caso o usuário esteja logado, caso não, após o login ele deve ser redirecionado.

- Iniciar com Vite.
- Testes unitários.
- Testes automatizados.
- Deploy do projeto no GitHub Pages.
- Deploy no Vercel.

## Configurando angular 15

Para configurar o angular na versão 15, execute o comando
```
npm install -g @angular/cli@15
```

Nesse projeto eu usei o node na versão 18.18.0

após instalar o angular , adicione esse script no arquivo index.ejs dentro da pasta root

```
<script src="https://cdn.jsdelivr.net/npm/zone.js@0.10.3/dist/zone.min.js"></script>
```

Configure o angular environments

```
ng g environments
```

Depois faça como está na pasta de environments

### Material base para criar microfrontends

- https://single-spa.js.org/docs/create-single-spa/  (Documentação do SPA)

- https://www.youtube.com/watch?v=KZpSghOWOnE&t=3847s&ab_channel=FullCycle

- https://github.com/sempejunior/live-full-cycle/blob/main/README.md

- https://github.com/kunalznk/react-micro-frontend/tree/main
