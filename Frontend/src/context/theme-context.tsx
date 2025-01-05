import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

export type ThemeContextType = {
    showToast: (options: any) => void;
    showError: (message: any) => void;
    showSuccess: (message: any) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast>(null);

    const showToast = (options: any) => {
        if (!toastRef.current) return;
        toastRef.current.show(options);
    };

    const showError = (message: any) => {
        if (!toastRef.current) return;
        toastRef.current.show({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
    };

    const showSuccess = (message: any) => {
        if (!toastRef.current) return;
        toastRef.current.show({ severity: 'success', summary: 'Successo', detail: message, life: 3000 });
    };

    return (
        <ThemeContext.Provider value={{ showToast, showError, showSuccess }}>
            <Toast ref={toastRef} />
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            "useThemeContext have to be used within ThemeContextProvider"
        );
    }

    return context;
}