import { type ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
    variant?: 'default' | 'secondary' | 'destructive';
};

export function Button({ className = '', variant = 'default', ...props }: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantClasses = {
        default: 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary',
        destructive: 'bg-error text-white hover:bg-error/90 focus-visible:ring-error',
    }[variant];

    const classes = className ? `${baseClasses} ${variantClasses} ${className}` : `${baseClasses} ${variantClasses}`;

    return <button {...props} className={classes} />;
}