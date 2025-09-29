import { TaskProvider } from "./context/TaskContext";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import "./styles/animations.css";

function App() {
  const { dark, toggleTheme } = useTheme();

  return (
    <TaskProvider>
      <div
        className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-500 ${
          dark 
            ? "dark bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-gray-100" 
            : "bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                         bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent
                         animate-slideIn">
              TrackMate
            </h1>
            <div className="flex-shrink-0">
              <ThemeToggle dark={dark} toggleTheme={toggleTheme} />
            </div>
          </div>
          <AddTaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;