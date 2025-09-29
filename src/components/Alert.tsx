import { memo, useEffect } from "react";
import type { DeleteConfirmationModalProps } from "../types/task";

export const DeleteConfirmationModal = memo(({ isOpen, onConfirm, onCancel, taskTitle }: DeleteConfirmationModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" 
      onClick={onCancel}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl animate-slideIn" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Delete Task?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-semibold">"{taskTitle}"</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                     rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     transition-all duration-200 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

DeleteConfirmationModal.displayName = "DeleteConfirmationModal";