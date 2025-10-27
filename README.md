# 🦟 Guardiões Contra a Dengue

> Aplicativo educativo gamificado para conscientização e prevenção da dengue em Canaã dos Carajás

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Sobre o Projeto

O **Guardiões Contra a Dengue** é uma aplicação web educativa desenvolvida para conscientizar estudantes e a comunidade de Canaã dos Carajás sobre a prevenção da dengue. O app combina gamificação, educação interativa e tecnologia moderna para tornar o aprendizado sobre saúde pública mais envolvente e eficaz.

### 🎯 Objetivos

- **Educar** sobre prevenção da dengue de forma interativa
- **Gamificar** o aprendizado com sistema de pontos e missões
- **Conscientizar** a comunidade local sobre saúde pública
- **Engajar** jovens através de tecnologia moderna

## ✨ Funcionalidades

### 🏠 **Tela Inicial**
- Dashboard com estatísticas do usuário
- Sistema de níveis e pontos
- Missões diárias interativas
- Dicas de prevenção

### 🧠 **Quiz Educativo**
- Perguntas sobre dengue e Aedes aegypti
- Sistema de pontuação
- Explicações educativas
- Progresso salvo automaticamente

### 🗺️ **Mapa Interativo**
- Reporte de focos suspeitos
- Visualização de áreas de risco
- Mapeamento colaborativo

### 🏆 **Sistema de Conquistas**
- Badges e achievements
- Progresso gamificado
- Ranking de usuários

### 🎮 **Central de Jogos**
- Mini-jogos educativos
- "Caça ao Mosquito"
- "Limpeza Radical"

### 📚 **Biblioteca do Conhecimento**
- Modelo 3D interativo do mosquito
- Cartas expansíveis com informações
- Vídeos educativos
- Conteúdo sobre ciclo de vida e sintomas

### 👥 **Desafios em Equipe**
- Missões colaborativas
- Diário da prevenção
- Competições entre turmas

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **JSX** - Sintaxe para componentes React

### **Estilização**
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **CSS Custom Properties** - Variáveis CSS personalizadas

### **Componentes UI**
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones SVG

### **3D e Gráficos**
- **React Three Fiber** - Renderização 3D
- **Three.js** - Biblioteca 3D
- **@react-three/drei** - Utilitários 3D

### **Gerenciamento de Estado**
- **React Context API** - Estado global
- **useState/useEffect** - Hooks do React

### **Outras Dependências**
- **React Helmet** - Gerenciamento de meta tags
- **Class Variance Authority** - Utilitário para classes CSS
- **clsx** - Utilitário para classes condicionais

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js (versão 16 ou superior)
- npm ou yarn

### **Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/guardioes-contra-dengue.git
cd guardioes-contra-dengue
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### **Scripts Disponíveis**

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção
```

## 📁 Estrutura do Projeto

```
AppGuardioesHostinger/
├── public/                 # Arquivos públicos
│   └── mosquito.glb       # Modelo 3D do mosquito
├── src/
│   ├── components/ui/     # Componentes base (botões, toasts)
│   ├── context/           # Context API (estado global)
│   ├── features/          # Telas/views da aplicação
│   │   ├── achievements/  # Sistema de conquistas
│   │   ├── challenges/    # Desafios em equipe
│   │   ├── games/         # Central de jogos
│   │   ├── home/          # Tela inicial
│   │   ├── knowledge/     # Biblioteca do conhecimento
│   │   ├── map/           # Mapa interativo
│   │   └── quiz/          # Quiz educativo
│   ├── layout/            # Layout principal
│   ├── lib/               # Utilitários
│   ├── assets/            # Recursos estáticos
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── index.html             # HTML base
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
├── tailwind.config.js     # Configuração do Tailwind
└── README.md              # Este arquivo
```

## 🎨 Características do Design

- **Responsivo** - Funciona em desktop, tablet e mobile
- **Acessível** - Componentes Radix UI para acessibilidade
- **Moderno** - Interface limpa e intuitiva
- **Gamificado** - Elementos visuais atrativos para jovens
- **Educativo** - Cores e ícones relacionados à saúde

## 🔧 Configuração

### **Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_APP_TITLE=Guardiões Contra a Dengue
VITE_APP_DESCRIPTION=Aplicativo educativo de prevenção da dengue
```

### **Personalização**
- **Cores**: Edite as variáveis CSS em `src/index.css`
- **Conteúdo**: Modifique os dados em `src/context/UseStatsContext.jsx`
- **Estilos**: Ajuste o `tailwind.config.js`

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, smartphone
- **Sistemas**: Windows, macOS, Linux, Android, iOS

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Equipe de Desenvolvimento** - [Romário](https://github.com/romariocavalcante)
- **Secretaria de Saúde de Canaã dos Carajás**
- **Secretaria de Educação de Canaã dos Carajás**

## 🙏 Agradecimentos

- Prefeitura de Canaã dos Carajás
- Comunidade local
- Estudantes e educadores
- Profissionais de saúde

## 📞 Contato

- **Email**: romariocavalcant@gmail.com

---

<div align="center">

**Juntos contra a dengue em Canaã dos Carajás! 🦟💚**

*Desenvolvido com ❤️ para a comunidade*

</div>
