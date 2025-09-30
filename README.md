# TrackMate 📝

TrackMate is a **Task Manager App** built with **React + TypeScript + Vite + Tailwind CSS**.  
It helps you organize tasks, mark them as complete, filter them, and persist them using **localStorage**.  

## 🚀 Features

- ✅ Add, complete, and delete tasks  
- 🔍 Filter tasks (All, Completed, Pending)  
- 💾 Persistent storage using localStorage  
- 🎨 Dark / Light mode toggle with Tailwind  
- ⚡ Optimized with React features (`useMemo`, `useCallback`, `React.memo`)  
- 🎬 Smooth CSS transitions for adding/removing tasks  
- 📱 Responsive (mobile-first)  
- 🖱️ Drag-and-drop support (via `react-beautiful-dnd`, optional)  

---
## 🚀 Hosted Link :https://track-mate-rust.vercel.app/

## 🛠️ Installation & Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/aadil-nv/TrackMate.git
cd trackmate
npm install

-----------------------
## Run the app

npm run dev


## 📂 Folder Structure

trackmate/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── README.md

📂 src/
│
├── main.tsx
├── App.tsx
│
├── hooks/
│   ├── useTheme.ts
│   └── useLocalStorage.ts
│
├── context/
│   └── TaskContext.tsx
│
├── components/
│   ├── AddTaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── ThemeToggle.tsx
│   ├── Pagination.tsx
│   ├── Alert.tsx
│   └── Toast.tsx
│
├── utils/
│   └── dateTimeFormat.ts
│
├── styles/
│   ├── index.css      // Tailwind imports + base styles
│   ├── animation.css  // Task enter/exit animations
│   └── theme.css      // Light/Dark theme overrides
│
└── types/
    └── task.ts        // TypeScript interfaces (Task, Filters, etc.)
