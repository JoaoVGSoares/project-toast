import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", dismissAll);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      { variant, message, id: crypto.randomUUID() },
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ createToast, dismissToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
