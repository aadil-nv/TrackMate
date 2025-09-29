import { memo, useCallback, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { DeleteConfirmationModal } from "./Alert";
import type { TaskItemProps } from "../types/task";
import { formatDateTime } from "../utils/formatDateTime";
import { Toast } from "./Toast";

const TaskItem = memo(({ task, isDragging, onDragStart, onDragOver, onDrop, onDragEnd }: TaskItemProps) => {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const handleUpdate = useCallback(() => {
    if (!editTitle.trim()) {
      showToast('Task cannot be empty', 'error');
      return;
    }
    if (editTitle.trim().length < 3) {
      showToast('Task must be at least 3 characters long', 'error');
      return;
    }
    if (editTitle.trim().length > 200) {
      showToast('Task must be less than 200 characters', 'error');
      return;
    }

    if (editTitle.trim() !== task.title) {
      editTask(task.id, editTitle);
      showToast('Task updated successfully!', 'success');
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  }, [editTitle, task.id, task.title, editTask, showToast]);

  const handleCancelEdit = useCallback(() => {
    setEditTitle(task.title);
    setIsEditing(false);
  }, [task.title]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    deleteTask(task.id);
    setShowDeleteModal(false);
    showToast('Task deleted successfully', 'success');
  }, [task.id, deleteTask, showToast]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  const wasUpdated = task.createdAt !== task.updatedAt;

  return (
    <>
      <div
        draggable={!isEditing}
        onDragStart={(e) => !isEditing && onDragStart(e, task.id)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, task.id)}
        onDragEnd={onDragEnd}
        className={`task-item p-4 mb-3 rounded-lg border-2 ${!isEditing ? 'cursor-move' : ''}
                   ${isDragging 
                     ? 'border-blue-500 shadow-2xl bg-blue-50 dark:bg-blue-900 opacity-50' 
                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                   }
                   transition-all duration-300 transform hover:scale-102
                   animate-slideIn hover:shadow-lg`}
      >
        <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
          {!isEditing && (
            <div className="drag-handle text-gray-400 dark:text-gray-500 cursor-move text-xl pt-1">
              ⋮⋮
            </div>
          )}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 mt-1 cursor-pointer accent-blue-500 transition-transform duration-200 hover:scale-110"
            disabled={isEditing}
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdate();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  maxLength={200}
                  autoFocus
                  className="w-full px-3 py-2 rounded border-2 border-blue-500 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                           focus:outline-none"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {editTitle.length}/200 characters
                </div>
              </>
            ) : (
              <>
                <span
                  className={`block text-base sm:text-lg transition-all duration-300 break-words ${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-500"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {task.title}
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-0.5">
                  <div>Created: {formatDateTime(task.createdAt)}</div>
                  {wasUpdated && (
                    <div className="text-blue-600 dark:text-blue-400">
                      Updated: {formatDateTime(task.updatedAt)}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                           font-medium transition-all duration-200 transform hover:scale-105
                           active:scale-95 shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg
                           font-medium transition-all duration-200 transform hover:scale-105
                           active:scale-95 shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                           font-medium transition-all duration-200 transform hover:scale-105
                           active:scale-95 shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg
                           font-medium transition-all duration-200 transform hover:scale-105
                           active:scale-95 shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        taskTitle={task.title}
      />
      
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

TaskItem.displayName = "TaskItem";

export default TaskItem;