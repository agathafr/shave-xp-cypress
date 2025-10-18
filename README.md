# 🪒 Shave XP – Configuração do Ambiente e Execução dos Testes

Este guia descreve todas as etapas necessárias para configurar e executar o projeto **Shave XP** — incluindo a instalação da API, da aplicação web e do projeto de testes automatizados com **Cypress**.

---

## 🧰 Ferramentas e Tecnologias Necessárias

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:

- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Cypress](https://www.cypress.io/)

---

## ⚙️ Estrutura de Pastas

A estrutura de diretórios esperada é a seguinte:

```
C:/
└── workspace/
    ├── apps/
    │   └── shave-xp/
    │       ├── api/
    │       └── web/
    └── projects/
        └── shave-xp-cypress/
```

---

## 🚀 Instalar e Executar a API e Aplicação Web

### 1. Criar as pastas do ambiente
```bash
C:\
mkdir workspace
cd workspace
mkdir apps projects
cd apps
mkdir shave-xp
```

### 2. Baixar e configurar o projeto principal
1. Baixe o arquivo **`shavexp-mvp-1.zip`**  
2. Extraia o conteúdo do arquivo  
3. Copie as pastas `api` e `web` extraídas para:  
   ```
   C:\workspace\apps\shave-xp\
   ```

### 3. Instalar dependências
No terminal, execute os comandos abaixo:

```bash
cd C:\workspace\apps\shave-xp\api
npm install

cd C:\workspace\apps\shave-xp\web
npm install
```

### 4. Abrir o projeto no VSCode
1. Abra o **VSCode**  
2. Vá em **File > Open Folder**  
3. Selecione a pasta:  
   ```
   C:\workspace\apps\shave-xp
   ```

### 5. Executar a API e a aplicação
No terminal do VSCode, execute:

```bash
# Iniciar a API
cd api
npm run dev
```

Em outro terminal:

```bash
# Iniciar a aplicação Web
cd web
npm run dev
```

Após isso, a API e a aplicação web estarão rodando localmente.  
O endereço local da aplicação geralmente é **http://localhost:3000** (pode variar conforme a configuração do projeto).

---

## 🧪 Instalar e Executar o Projeto de Testes (Cypress)

### 1. Clonar o projeto de testes
No terminal, execute:

```bash
cd C:\workspace\projects\shave-xp-cypress
git clone https://github.com/agathafr/shave-xp-cypress
```

### 3. Instalar dependências do Node
No terminal, execute o comando abaixo:

```bash
cd C:\workspace\projects\shave-xp-cypress
npm install
```

### 4. Instalar dependências do Cypress
No terminal, execute:

```bash
cd C:\workspace\projects\shave-xp-cypress
npm install cypress@12.7.0 --save-dev
```

### 5. Renomeie o arquivo '.env'
Remova o .example para que o arquivo fique apenas '.env'

## 🗄️ Provisionamento e Configuração do Banco de Dados da Aplicação

O projeto utiliza um banco de dados provisionado através da plataforma **Aiven**.

### 🔧 Passos para configuração

1. Acesse o console da Aiven: [https://console.aiven.io/](https://console.aiven.io/)  
2. Crie um novo serviço de banco de dados (ex: PostgreSQL).  
3. Configure as credenciais de acesso (usuário, senha e nome do banco).  
4. Atualize as variáveis de ambiente do projeto (`.env`) com as informações geradas.  
5. Reinicie a aplicação após salvar as configurações para que as conexões sejam atualizadas corretamente.

### 6. Abrir o Cypress
```bash
npx cypress open
```

Isso abrirá a interface gráfica do Cypress, permitindo executar os testes manualmente ou selecionar o modo de execução desejado.

---

## 🧩 Dicas Importantes

- Sempre mantenha a **API e a aplicação web** rodando antes de iniciar os testes.  
- Caso encontre erros de dependência, rode novamente o comando `npm install`.  
- Certifique-se de estar utilizando a versão correta do Node.js (recomendada: LTS).  
- Os testes Cypress devem apontar para a URL local da aplicação (`localhost`).

---

## 📜 Licença

Este projeto é de uso interno e está sob a licença definida pelo repositório principal do **Shave XP**.

---


