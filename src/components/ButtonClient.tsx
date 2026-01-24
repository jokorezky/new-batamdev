'use client';

import { ReactNode, MouseEvent } from 'react';

type ButtonClientProps = {
    readonly onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    readonly children: ReactNode;
    readonly className?: string;
    readonly type?: "button" | "submit" | "reset";
    readonly disabled?: boolean;
}

export default function ButtonClient({
    onClick,
    children,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonClientProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}