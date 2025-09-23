# 🏥 Encontre Farmácias Próximas

Uma aplicação web completa para localizar farmácias perto de você, com **visual moderno** e informações detalhadas.


---

## ✨ Funcionalidades

- **Busca Inteligente**: Localiza farmácias usando sua geolocalização, com backend seguro para comunicação com a API do Google.  
- **Lista de Farmácias**: Exibe endereços, status de funcionamento e informações relevantes de forma clara.  
- **Detalhes Completos**: Ao clicar em **"Exibir Mais"**, abre um modal com telefone, site, horários e mais.  
- **Visual Premium**: Tema escuro com detalhes em roxo, proporcionando uma interface sofisticada e agradável.  

---

## 💻 Tecnologias Utilizadas

### Frontend

- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- CSS Puro  

### Backend
```bash
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [Axios](https://axios-http.com/)  
- [dotenv](https://github.com/motdotla/dotenv)  


### API
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)



## ⚙️ Configuração do Projeto

### ✅ Pré-requisitos
- Node.js **v18 ou superior**  
- npm  
- Chave de API do **Google Cloud**  


```

### 📦 Passo 1: Instalar Dependências

```

# Backend

cd backend
npm install
```

# Frontend
```bash
cd ../farmacia
npm install
🚀 Passo 2: Configurar variáveis de ambiente
Crie um arquivo .env no backend com sua chave da API do Google:

ini
Copiar código
GOOGLE_API_KEY=SuaChaveAqui
PORT=5000
🏃‍♂️ Passo 3: Rodar o projeto

Copiar código
```
# Rodar backend
```bash
cd backend
node server.js
```
# Rodar frontend
```
cd ../farmacia
npm run dev
Abra http://localhost:5173 no navegador para acessar o app.
```
### 📁 Estrutura do Projeto
```
Copiar código
/farmacia-app
├── backend/
│   ├── server.js
│   └── .env
├── farmacia/       # Frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```
👨‍💻 Desenvolvido por Derick Dutra, estudante de Ciência da Computação.

https://farmacia-amiga.netlify.app/
