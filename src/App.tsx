// src/App.tsx
import { TaskProvider } from "./context/TaskContext";
import {AddTaskForm} from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { dark, toggleTheme } = useTheme();

  return (
    <TaskProvider>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .dark {
          color-scheme: dark;
        }
        
        .task-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .task-item:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 640px) {
          .task-item {
            font-size: 14px;
          }
          
          .drag-handle {
            font-size: 16px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .task-item,
          .animate-slideIn,
          .animate-fadeIn,
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div
        className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-500 ${
          dark ? "dark bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 
                       bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent
                       animate-slideIn">
            TrackMate
          </h1>
          <ThemeToggle dark={dark} toggleTheme={toggleTheme} />
          <AddTaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}



export default App;