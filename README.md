# 📖 Bem-vindo(a) à API de D&D! 

Este README fornece uma descrição detalhada das funcionalidades e requisitos para a criação e desenvolvimento da nossa aplicação mágica de Dungeons & Dragons! 🌟⚔️🧙‍♂️

## ✨ Funcionalidades

1. **🧙 Criação de Entidade de Usuário com Autenticação JWT**
2. **🔒 Auth Guard**:
   - Adicione um Auth Guard para as rotas da entidade principal da sua aplicação.
   - Somente usuários autenticados poderão chamar essas rotas.

3. **⏱️ Log de Tempo de Resposta**:
   - Crie uma entidade para registrar o tempo de resposta das rotas da sua API.
   - Registre pelo menos o nome da rota chamada, o método utilizado e o tempo decorrido para a solicitação terminar.

4. **❗ Exceções Personalizadas**
5. **📏 Validação de Dados**
6. **🐳 Docker Compose**
7. **🎲 Função para Criar Personagem Aleatório**:
   - Crie uma função para criar um personagem de forma aleatória, respeitando a regra de nível.

8. **🧠 Integração com IA Generativa (Gemini)**:
   - Integre sua aplicação com o Gemini para:
     - Gerar uma história de background para um personagem baseado em sua ficha.
     - Dado um grupo de personagens (3 ou mais), gerar uma aventura para eles.
     
## 🛠️ Dependências

- Node.js
- TypeScript
- JWT
- class-validator
- Docker
- Docker Compose

## 🌐 Rotas da API

#### Usuários
- **POST** `/users` - Criação de novo usuário
- **POST** `/users/login` - Autenticação de usuário
- **GET** `/users` - Listagem de usuários
- **GET** `/users/:id` - Detalhes de um usuário
- **PATCH** `/users/:id` - Atualização de um usuário
- **DELETE** `/users/:id` - Remoção de um usuário

#### Personagens
- **POST** `/characters` - Criação de novo personagem
- **PATCH** `/characters/:id` - Atualização de um personagem
- **POST** `/characters/:id/background` - Gerar história de background para um personagem
- **POST** `/characters/adventure` - Gerar uma aventura para um grupo de personagens
- **GET** `/characters` - Listagem de personagens
- **GET** `/characters/:id` - Detalhes de um personagem
- **DELETE** `/characters/:id` - Remoção de um personagem

#### Logs
- **GET** `/logs` - Listagem dos logs de tempo de resposta das rotas

## 🏃‍♂️ Como Rodar a Aplicação

- Clone o repositório.
```bash
git clone <https://github.com/jeanunicesumar/API-dungeons-and-dragons.git>
cd <API-dungeons-and-dragons>
```
- Configure as variáveis de ambiente necessárias. 
```
❗ Crie um arquivo .env na raiz do projeto com base no arquivo .env.example. ❗
```
- Instale as Dependências
```
npm install

```
- Execute `docker-compose up -d` para iniciar a aplicação e o banco de dados.
- Utilize os endpoints da API conforme documentado.
- Verifique os logs para informações de tempo de resposta das rotas.
- Use a funcionalidade de criação de personagem e integração com Gemini para gerar histórias e aventuras.

## 🎐 Conheça os desenvolvedores

- 👩‍💻 [Cassia Yumi](https://github.com/cassiab13)
- 👨‍💻 [Jean Soares](https://github.com/jeanunicesumar)
- 👩‍💻 [Rhayssa Andretto](https://github.com/rhayssaandretto)
- 👨‍💻 [Vinicius Kenji](https://github.com/TalDoKenji)

Junte-se à nossa aventura de desenvolvimento e ajude-nos a criar a melhor API de D&D! 🌟🛡️⚔️
