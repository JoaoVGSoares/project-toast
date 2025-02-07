import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

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

  const value = React.useMemo(() => {
    return { createToast, dismissToast, toasts };
  }, [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
