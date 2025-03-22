// src/components/shared/Toast.tsx
interface ToastProps {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        rounded-lg shadow-lg p-4 max-w-md
        ${type === 'error' ? 'bg-red-50 text-red-800 border-red-300' :
          type === 'success' ? 'bg-green-50 text-green-800 border-green-300' :
          type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-yellow-300' :
          'bg-blue-50 text-blue-800 border-blue-300'}
        border
      `}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
