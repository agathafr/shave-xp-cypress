# 🧪 Shave XP – Testes automatizados (Cypress)

Este repositório contém os **testes automatizados de ponta a ponta (E2E)** do projeto **Shave XP**, cobrindo os principais fluxos da aplicação web e da API.  
Os testes são escritos com **Cypress** e dependem da execução conjunta da API (porta 3333), da aplicação web (porta 3000) e do helper de banco de dados (porta 5000).

---

## ⚙️ Estrutura do projeto

```
/
├─ cypress/
│  ├─ e2e/             # Suítes de testes (login, pedidos, recuperação de senha, etc.)
│  ├─ support/         # Comandos customizados e hooks
│  └─ fixtures/        # Dados e mocks usados nos testes
├─ api/                # Helper Express (porta 5000) para manipular o banco de dados
│  ├─ app.js
│  ├─ db.js
│  └─ database.js
├─ cypress.config.js   # Configuração principal do Cypress
├─ package.json
└─ .env.example
```

---

## 🚀 Como executar o projeto de testes

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/shave-xp-tests.git
cd shave-xp-tests
npm install
```

---

### 2️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o conteúdo abaixo:

```bash
APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333
APP_API_HELPER_URL=http://localhost:5000
```

Essas variáveis permitem que o Cypress se comunique corretamente com:
- a aplicação Web (porta **3000**);
- a API (porta **3333**);
- o helper de banco de dados (porta **5000**).

---

### 3️⃣ Preparar o ambiente da API e do banco

No repositório **shave-xp-apps**, acesse a pasta `api` e execute:

```bash
npm run db:init
npm run db:populate
npm run dev
```

> Isso cria as tabelas, popula o banco com dados iniciais e inicia o servidor da API (porta **3333**).

---

### 4️⃣ Subir a aplicação web

Ainda no repositório **shave-xp-apps**, acesse a pasta `web`:

```bash
npm install
npm start
```

> O frontend ficará disponível em **http://localhost:3000**.

---

### 5️⃣ Subir o helper de banco de dados

Volte ao repositório de testes (`shave-xp-tests`) e execute:

```bash
node api/app.js
```

> O helper ficará disponível em **http://localhost:5000**.  
> Ele é responsável por criar e remover usuários diretamente no banco de dados durante a execução dos testes.

---

### 6️⃣ Executar os testes

Com todos os serviços ativos, abra o Cypress:

```bash
npx cypress open
```

> O modo interativo será aberto, permitindo escolher quais suítes executar.

Ou, para rodar tudo automaticamente:

```bash
npx cypress run
```

---

## 📧 Configuração de envio de e-mails (Ethereal ou Mailtrap)

Para que o endpoint `/password/forgot` funcione corretamente, é necessário configurar um **serviço SMTP** no projeto da API.

A API utiliza o **Nodemailer** e suporta **Ethereal** (recomendado para ambiente de testes) ou **Mailtrap**.

### 🔹 Opção 1 – Ethereal (recomendada)

O Ethereal gera contas temporárias automaticamente e exibe os e-mails enviados em uma inbox acessível por link.

#### Passos:

1. Acesse [https://ethereal.email/create](https://ethereal.email/create)  
2. Copie os dados de acesso (host, port, user, pass).  
3. No projeto da API (`shave-xp-apps/api`), adicione no arquivo `.env`:

```bash
MAIL_DRIVER=ethereal
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=SEU_USUARIO_ETHEREAL
MAIL_PASS=SUA_SENHA_ETHEREAL
MAIL_FROM='"Shave XP" <no-reply@shavexp.com>'
```

4. Reinicie a API com `npm run dev`.

Após enviar o e-mail de recuperação de senha, o log da API exibirá algo como:

```
E-mail enviado: https://ethereal.email/message/WaQKMgKddxQDoou...
```

Acesse esse link para visualizar o e-mail gerado.

---

### 🔹 Opção 2 – Mailtrap (alternativa)

Configure uma conta gratuita em [https://mailtrap.io](https://mailtrap.io) e adicione ao `.env` da API:

```bash
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=SEU_USER_MAILTRAP
MAIL_PASS=SEU_PASS_MAILTRAP
MAIL_FROM='"Shave XP" <no-reply@shavexp.com>'
```

---

### 🧠 Dica para testes automatizados

Durante os testes automatizados, você pode **desativar o envio real de e-mails**.  
Adicione no `.env` da API:

```bash
DISABLE_MAIL=true
```

E ajuste a rota `/password/forgot` para retornar **204** sem enviar e-mail:

```js
if (process.env.DISABLE_MAIL === 'true') {
  return res.status(204).end()
}
```

Assim os testes passam normalmente sem depender de SMTP ativo.

---

## 🧩 Suítes incluídas

| Suíte             | Descrição                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **login.cy.js**   | Testa login válido, inválido e validações de campos obrigatórios.         |
| **orders.cy.js**  | Testa criação e listagem de pedidos.                                      |
| **recovery-pass** | Testa o fluxo de recuperação de senha e envio de e-mail via Ethereal.     |

---

## 🧾 Dicas de estabilidade

- Garanta que o helper (`api/app.js`) esteja rodando **antes** de iniciar os testes.  
- Crie usuários via `/user` (porta 5000) **antes** de autenticar via `/sessions`.  
- Use `cy.intercept()` para esperar respostas da API antes dos asserts.  
- Adicione `cy.wait('@login')` ou `cy.location()` após o login para evitar flakiness.  
- Confirme que as portas **3000**, **3333** e **5000** estão livres e em uso pelos serviços corretos.  

---

## ✅ Conclusão

Após seguir todos os passos — configurando a API, o frontend, o helper e as variáveis de ambiente — o projeto de testes estará pronto.  
Você poderá rodar todas as suítes com sucesso, validando login, pedidos e recuperação de senha com suporte total ao envio de e-mails via Ethereal ou Mailtrap.
