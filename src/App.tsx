import { TaskProvider } from "./context/TaskContext";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { ClipboardList } from "lucide-react";
import "./styles/animations.css";

function App() {
  const { dark, toggleTheme } = useTheme();

  return (
    <TaskProvider>
      <div
        className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-500 ${
          dark 
            ? "dark bg-gradient-to-br from-gray-900 via-gray-950 to-slate-900 text-gray-100" 
            : "bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-900"
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3">
              <ClipboardList 
                className={`${dark ? "text-blue-400" : "text-blue-600"} w-8 h-8 sm:w-9 sm:h-9`} 
                strokeWidth={2.5}
              />
              <h1 className={`${dark ? "text-white" : "text-gray-900"} text-3xl sm:text-4xl font-bold`}>
                TrackMate
              </h1>
            </div>
            <div className="flex-shrink-0 mt-1.5">
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