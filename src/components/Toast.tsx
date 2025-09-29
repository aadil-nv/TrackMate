import { memo, useEffect } from "react";

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast = memo(({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200 font-bold">×</button>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";
