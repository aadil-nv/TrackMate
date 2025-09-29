import { useState, useMemo, useCallback, useRef, memo, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../context/TaskContext";
import { DeleteConfirmationModal } from "./Alert";
import type { Filter, Task } from "../types/task";
import { Pagination } from "./Pagination";
import { Toast } from "./Toast";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const TaskList = memo(() => {
  const { tasks, reorderTasks, deleteTask } = useTasks();
  const [filter, setFilter] = useLocalStorage<Filter>("trackmate_filter", "all");
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [showDeleteZone, setShowDeleteZone] = useState(false);
  const [deleteConfirmTask, setDeleteConfirmTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const tasksPerPage = 5;
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "pending") return tasks.filter(t => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTask(taskId);
    setShowDeleteZone(true);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask !== targetId) {
      reorderTasks(draggedTask, targetId);
    }
  }, [draggedTask, reorderTasks]);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setShowDeleteZone(false);
  }, []);

  const handleDeleteZoneDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedTask) {
      const task = tasks.find(t => t.id === draggedTask);
      if (task) {
        setDeleteConfirmTask(task);
      }
    }
    setDraggedTask(null);
    setShowDeleteZone(false);
  }, [draggedTask, tasks]);

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmTask) {
      deleteTask(deleteConfirmTask.id);
      setDeleteConfirmTask(null);
      showToast('Task deleted successfully', 'success');
    }
  }, [deleteConfirmTask, deleteTask, showToast]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((newFilter: Filter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  }, [setFilter]);

  return (
    <div>
      <div className="filter-bar mb-6 flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(["all", "completed", "pending"] as Filter[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => handleFilterChange(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                       transform hover:scale-105 active:scale-95 capitalize text-sm sm:text-base
                       ${filter === filterType
                         ? "bg-blue-500 text-white shadow-md"
                         : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                       }`}
            >
              {filterType}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total: {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="relative">
        <div 
          ref={dropZoneRef}
          className="task-list min-h-[200px] p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 
                   rounded-lg bg-gray-50 dark:bg-gray-800/50 transition-all duration-300"
        >
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-base sm:text-lg">
              No tasks yet. Add one above!
            </p>
          ) : (
            paginatedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isDragging={draggedTask === task.id}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            ))
          )}
        </div>

        {showDeleteZone && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDeleteZoneDrop}
            className="mt-4 p-8 border-4 border-dashed border-red-500 rounded-lg 
                     bg-red-50 dark:bg-red-900/20 flex items-center justify-center
                     animate-fadeIn transition-all duration-300"
          >
            <div className="text-center">
              <span className="text-4xl mb-2 block">🗑️</span>
              <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                Drop here to delete task
              </p>
            </div>
          </div>
        )}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmTask !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmTask(null)}
        taskTitle={deleteConfirmTask?.title || ""}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
});



