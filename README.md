🌱 AgroIPA – Plataforma de Gestão de Sementes

O AgroIPA é uma plataforma web desenvolvida para auxiliar produtores e técnicos agrícolas na gestão de sementes, lotes e armazéns, permitindo acompanhar qualidade, validade, estoque e informações da propriedade de forma organizada e intuitiva.

O projeto foi desenvolvido com frontend em React e backend em Python (FastAPI), seguindo uma arquitetura separada entre front e back.


🚀 Funcionalidades
	•	✅ Autenticação de usuários (login e registro)
	•	✅ Dashboard com visão geral do estoque
	•	✅ Cadastro, listagem, edição e exclusão de sementes
	•	✅ Cálculo automático de status da semente (válida, próxima do vencimento, vencida)
	•	✅ Integração de sementes cadastradas via fake DB (localStorage)
	•	✅ Edição de perfil do usuário
	•	✅ Opção de exclusão da conta
	•	✅ Interface moderna e responsiva


🛠️ Tecnologias Utilizadas

Frontend
	•	React + TypeScript
	•	Vite
	•	React Router
	•	Axios
	•	LocalStorage (fake database)
  
Backend
	•	Python
	•	FastAPI
	•	Pydantic
	•	SQLite (estrutura preparada para persistência real)

ESTRUTURA DO PROJETO

  AgroIPA-Plataforma/
├─ AgroIpa-FrontEnd/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ store/
│  │  └─ types/
│
├─ AgroIpa-BackEnd/
│  ├─ routes/
│  ├─ models/
│  ├─ schemas/
│  └─ main.py

COMO EXECUTAR O PROJETO:

FRONTEND: 

cd AgroIpa-FrontEnd
npm install
npm run dev

BACKEND: 

cd AgroIpa-BackEnd
pip install -r requirements.txt
uvicorn main:app --reload

API disponível em:
👉 http://localhost:8000
Swagger: http://localhost:8000/docs

Autor

Matheus Henrique Goes Soares
Projeto acadêmico – Plataforma AgroIPA
