// src/components/ui/ErrorAlert.tsx
interface ErrorAlertProps {
    message: string;
  }
  
  export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>{message}</p>
      </div>
    );
  }