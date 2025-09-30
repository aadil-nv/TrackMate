import { useState, useCallback, memo } from "react";
import { useTasks } from "../context/TaskContext";
import { Toast } from "./Toast";

export const AddTaskForm = memo(() => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const handleAddTask = useCallback(() => {
    if (!title.trim()) {
      showToast('Please enter a task', 'error');
      return;
    }
    if (title.trim().length < 3) {
      showToast('Task must be at least 3 characters long', 'error');
      return;
    }
    if (title.trim().length > 200) {
      showToast('Task must be less than 200 characters', 'error');
      return;
    }

    addTask(title);
    setTitle("");
    showToast('Task added successfully!', 'success');
  }, [title, addTask, showToast]);

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTask();
              }
            }}
            placeholder="Add new task (min 3 characters)"
            maxLength={200}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                     transition-colors duration-200"
          />
          <button
            onClick={handleAddTask}
            className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                     font-semibold transition-all duration-200 transform hover:scale-105
                     active:scale-95 shadow-md hover:shadow-lg`}
          >
            Add Task
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {title.length}/200 characters
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
});

AddTaskForm.displayName = "AddTaskForm";