

# UEGênio Painel Admin - Assistente Virtual para alunos de Sistemas de Informação

## Sobre

Esse projeto foi desenvolvido como requisito parcial de avaliação do trabalho de conclusão de curso de Sistemas de Informação da [Universidade Estadual de Goiás - Câmpus Central](https://ueg.br/campuscentral/).<br/>
Tendo como principal objetivo auxiliar a jornada acadêmica do Estudande de Sistemas de Informação da UEG.

## Requerimentos
Para executar esse projeto é necessário que você tenha algumas ferramentas instaladas no seu dispositivo.

### Node.js
O download do Node está disponível [aqui](https://nodejs.org/pt-br/download/).
Após o download e instalação do Node.js, abra console do seu dispositivo e verifique se a instalação foi bem sucedida através do comando:
> node -v 

Deve aparecer a versão do Node.js que foi instalada.

### Angular CLI
é necessário instalar o Angular para de fato executar o projeto com os comandos ng
> npm install -g @angular/cli

## Execução
Instale as dependências através do comando 
> npm install
### Definição das variáveis de ambiente
Crie um arquivo na raiz do projeto chamado .env
O arquivo .env fornece a variável que é fundamental para a comunicação com o back-end.

>urlApi
A URL base para a comunicação com o back-end

### `ng serve`

O app será executado em modo de desenvolvimento.<br />
na porta [http://localhost:3333](http://localhost:3333)

## Tecnologias

  * Angular
  * Angular Material UI
  * HTML
  * SCSS
  * Nodejs
  * Typescript
  * JWT
  * Axios

## Recursos
    - [X] Administrador
        - [X] Login
        - [X] Logout
    - [X] Semestre
        - [X] Cadastro
        - [X] Alteração
        - [X] Exclusão
    - [X] Professor
        - [X] Cadastro
        - [X] Alteração
        - [X] Exclusão
    - [X] Disciplina
        - [X] Cadastro
        - [X] Alteração
        - [X] Exclusão
    - [X] Feriado
        - [X] Cadastro
        - [X] Alteração
        - [X] Exclusão
    - [X] Aula
        - [X] Cadastro
        - [X] Alteração
        - [X] Exclusão
  
 
