# Acme Sistema de Compras

Este é um sistema de compras desenvolvido em React com Vite, que permite a gestão de requisições de compras com dois tipos de usuários: comum e admin.

## Tipos de Usuários

### Usuário Comum
- Pode criar uma conta, desde que seja do tipo admin.
- Pode criar requisições de compras.
- Pode acompanhar as requisições que fez.

### Usuário Admin
- Pode criar contas de usuários, incluindo contas do tipo admin.
- Pode bloquear o acesso de determinados usuários ao sistema.
- Realiza operações CRUD (Criar, Ler, Atualizar, Deletar) de fornecedores e produtos.
- Faz a cotação dos produtos requisitados pelos usuários.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de construção e desenvolvimento rápido para projetos de front-end.
- **Firebase**: Utilizado para autenticação e armazenamento de dados no Firebase Database.
- **Material UI**: Biblioteca de componentes React que implementa o Material Design.

## Funcionalidades
- Autenticação de usuários através do Firebase.
- Gerenciamento de usuários e permissões.
- CRUD de fornecedores e produtos.
- Cotação de produtos requisitados.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu_usuario/sistema-de-compras.git


2. Navegue até o diretório do projeto:
```bash
    cd sistema-de-compras

3. Instale as dependências:
    npm install

4. Inicie o servidor de desenvolvimento:
    npm run dev

5. Acesse o projeto em seu navegador: http://localhost:5173

# Licença
Este projeto está licenciado sob a MIT License. 
