
import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', fullWidth, className = '', ...props 
}) => {
  const { highContrast } = useApp();
  
  const baseStyle = "px-6 py-3 font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const radius = highContrast ? "rounded-none" : "rounded-full";
  const width = fullWidth ? "w-full" : "w-auto";
  
  let variantStyle = "";
  
  if (highContrast) {
    if (variant === 'primary') variantStyle = "bg-yellow-400 text-black border-4 border-black hover:bg-yellow-300";
    if (variant === 'secondary') variantStyle = "bg-black text-yellow-400 border-4 border-yellow-400 hover:bg-gray-900";
    if (variant === 'ghost') variantStyle = "bg-transparent text-black border-2 border-transparent hover:border-black underline decoration-2";
  } else {
    if (variant === 'primary') variantStyle = "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700";
    if (variant === 'secondary') variantStyle = "bg-white text-indigo-600 border border-slate-200 shadow-sm hover:bg-slate-50";
    if (variant === 'ghost') variantStyle = "bg-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50";
  }

  return (
    <button className={`${baseStyle} ${radius} ${width} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- CARD ---
export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  const { highContrast } = useApp();
  
  const style = highContrast 
    ? "bg-black text-white border-4 border-yellow-400 p-6 rounded-none" 
    : "bg-white text-slate-800 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow";

  return (
    <div className={`${style} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

// --- INPUT ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    const { highContrast } = useApp();

    return (
        <div className="w-full">
            {label && (
                <label className={`block mb-2 font-bold ${highContrast ? 'text-black uppercase tracking-widest' : 'text-slate-600 text-sm'}`}>
                    {label}
                </label>
            )}
            <input 
                className={`w-full p-4 outline-none transition-all
                    ${highContrast 
                        ? 'bg-white border-4 border-black text-black placeholder-gray-500 rounded-none focus:bg-yellow-100' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                    } ${className}`}
                {...props}
            />
        </div>
    );
};

// --- SCREEN TITLE ---
export const ScreenTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
    const { highContrast } = useApp();
    return (
        <div className="mb-8">
            <h1 className={`text-3xl ${highContrast ? 'font-black uppercase tracking-tighter text-white underline decoration-yellow-400 decoration-4' : 'font-extrabold text-slate-900 tracking-tight'}`}>
                {title}
            </h1>
            {subtitle && (
                <p className={`mt-2 ${highContrast ? 'text-black bg-yellow-400 inline-block px-1 font-bold text-lg' : 'text-slate-500'}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};
