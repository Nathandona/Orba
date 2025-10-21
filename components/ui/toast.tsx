'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Toast {
  id: string;
  message: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  showToast: (message: string, variant?: 'default' | 'destructive') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: 'default' | 'destructive' = 'default') => {
    const id = Date.now().toString();
    console.log('Toast triggered:', { id, message, variant });
    setToasts(prev => [...prev, { id, message, variant }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="animate-in slide-in-from-right-full duration-300 fade-in-0 pointer-events-auto"
          >
            <Alert variant={toast.variant} className="relative pr-12 shadow-lg border min-w-[300px] max-w-md">
              <AlertDescription>
                {toast.message}
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-muted"
                onClick={() => removeToast(toast.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}