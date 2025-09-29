import type { ReactNode } from "react";
import { createContext, useContext, useCallback, memo, useMemo } from "react";
import type { Task, TaskContextType } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";


const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = memo(({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("trackmate_tasks", []);

  const addTask = useCallback((title: string): boolean => {
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) return false;
    if (trimmedTitle.length < 3) return false;
    if (trimmedTitle.length > 200) return false;

    const now = new Date().toISOString();
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: trimmedTitle,
      completed: false,
      order: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    setTasks(prev => [newTask, ...prev.map((t, i) => ({ ...t, order: i + 1 }))]);
    return true;
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const editTask = useCallback((id: string, newTitle: string): boolean => {
    const trimmedTitle = newTitle.trim();
    
    if (!trimmedTitle) return false;
    if (trimmedTitle.length < 3) return false;
    if (trimmedTitle.length > 200) return false;

    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, title: trimmedTitle, updatedAt: new Date().toISOString() } : task
    ));
    return true;
  }, [setTasks]);

  const reorderTasks = useCallback((draggedId: string, targetId: string) => {
    setTasks(prev => {
      const draggedIndex = prev.findIndex(t => t.id === draggedId);
      const targetIndex = prev.findIndex(t => t.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const result = [...prev];
      const [removed] = result.splice(draggedIndex, 1);
      result.splice(targetIndex, 0, removed);
      
      return result.map((task, index) => ({ ...task, order: index }));
    });
  }, [setTasks]);

  const contextValue = useMemo(
    () => ({ tasks, addTask, toggleTask, deleteTask, editTask, reorderTasks }),
    [tasks, addTask, toggleTask, deleteTask, editTask, reorderTasks]
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
});