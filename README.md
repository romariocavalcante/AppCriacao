## Trilha da Fé

> Aplicativo educativo de estudos bíblicos — organize estudos, complete desafios e acompanhe seu progresso espiritual.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Sobre o projeto

O Trilha da Fé é um PWA para apoiar estudos bíblicos individuais e em grupo. Ele oferece áreas de estudo, quizzes, desafios comunitários e um sistema de conquistas para incentivar hábitos de leitura e prática.

## Funcionalidades principais

- Dashboard com pontos, níveis e progresso
- Missões diárias e diário espiritual
- Quiz bíblico com explicações
- Desafios comunitários (estudo em grupo, atos de amor)
- Painel administrativo local para editar conteúdo (salvo em localStorage)

## Tecnologias

- React 18 + Vite
- Tailwind CSS, Framer Motion
- React Context API
- Three.js / @react-three/fiber (opcional)
- Lucide icons, Radix UI

## Executando localmente

Pré-requisitos: Node.js 16+ e npm

```powershell
git clone <seu-repositorio>
cd <seu-repositorio>
npm install
npm run dev
```

Abra http://localhost:5173

## Scripts úteis

```bash
npm run dev
npm run build
npm run preview
```

## Deploy (Vercel)

O projeto já inclui `vercel.json` configurado para deploy estático. Recomendo usar a integração com GitHub:

1. Faça push do branch `main` para o GitHub
2. No Vercel: New Project → Import Git Repository → selecione o repositório
3. Build Command: `npm run build` e Output Directory: `dist`
4. Deploy

Ou use a CLI:

```powershell
npm install -g vercel
npm run build
npx vercel --prod
```

## Estrutura do projeto

```
public/
src/
	├── components/
	├── context/        # ContentContext, UseStatsContext
	├── features/       # home, quiz, achievements, challenges, admin, etc.
	├── layout/
	├── lib/
	└── App.jsx
index.html
package.json
vercel.json
README.md
```

## Personalização

- Edite conteúdo via Painel Administrativo (`?view=admin`) — os dados são persistidos em `localStorage` sob a chave `app-content`.
- Estilos em `tailwind.config.js` e `src/index.css`.

## Contribuição

1. Fork
2. Branch
3. Commit
4. Pull Request

## Licença

MIT

---

Se quiser, posso também:

- Gerar um README mais curto para a página do GitHub;
- Adicionar um workflow de CI para builds automáticos;
- Ajustar `package.json` (homepage/repository) para apontar ao seu repo e domínio Vercel.
