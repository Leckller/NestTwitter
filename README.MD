
---

# NestTwitter

**NestTwitter** é uma aplicação full-stack que busca replicar funcionalidades básicas de uma rede social semelhante ao Twitter. O projeto é composto por um backend construído com **NestJS** (Node.js) e um frontend desenvolvido com **React**. Ele permite aos usuários visualizar postagens de pessoas que estão seguindo, explorar postagens globais, pesquisar usuários e postagens, além de visualizar perfis de usuários com informações sobre suas postagens, curtidas e comentários.

## Funcionalidades

- **Home**: Exibe postagens de usuários que você segue, além de postagens globais.
- **Search**: Permite buscar postagens e usuários.
- **Profile**: Visualiza o perfil de um usuário, incluindo suas postagens, curtidas e comentários.
  
## Tecnologias Utilizadas

### Backend

- **NestJS**: Framework para Node.js utilizado para criar o servidor e as APIs.
- **TypeORM**: ORM para conectar o backend a um banco de dados relacional.
- **Outras bibliotecas**: Utilização de várias bibliotecas auxiliares conforme necessário para a construção da API.

### Frontend

- **React**: Framework para construir a interface do usuário.
- **Redux**: Para gerenciamento de estado da aplicação.
- **Styled Components**: Para estilização dos componentes.
- **Outras bibliotecas**: Utilização de diversas bibliotecas auxiliares no frontend.

## Pré-Requisitos

Antes de iniciar o projeto, você precisa ter o **Node.js** e o **npm** instalados em sua máquina. Você pode verificar se já os tem instalados executando os seguintes comandos:

```bash
node -v
npm -v
```

Se não os tiver instalados, você pode baixá-los em: [https://nodejs.org/](https://nodejs.org/)

## Como Instalar

### 1. Clonar o Repositório

Clone o repositório para o seu ambiente local utilizando o seguinte comando:

```bash
git clone https://github.com/Leckller/NestTwitter.git
```

### 2. Instalar as Dependências

#### Backend

Acesse a pasta do backend e instale as dependências:

```bash
cd backend
npm run install
```

#### Frontend

Acesse a pasta do frontend e instale as dependências:

```bash
cd frontend
npm run install
```

### 3. Iniciar o Projeto

#### Backend

Na pasta do backend, inicie o servidor com o comando:

```bash
npm run dev
```

Ou para iniciar a versão de produção:

```bash
npm start
```

#### Frontend

Na pasta do frontend, inicie o aplicativo com o comando:

```bash
npm run dev
```

Ou para iniciar a versão de produção:

```bash
npm start
```

## Estrutura do Projeto

O repositório é dividido em duas pastas principais:

- **backend**: Contém a aplicação backend construída com NestJS.
- **frontend**: Contém a aplicação frontend construída com React.

## Como Contribuir

Sinta-se à vontade para contribuir com o projeto! Você pode sugerir melhorias, corrigir bugs ou adicionar novas funcionalidades. Para isso, basta seguir as etapas:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova funcionalidade'`).
4. Faça o push da sua branch (`git push origin minha-feature`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue no repositório ou me contatar diretamente.

---
