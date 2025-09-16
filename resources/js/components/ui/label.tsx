import { type ComponentProps } from 'react';

type LabelProps = ComponentProps<'label'>;

export function Label({ className = '', ...props }: LabelProps) {
    const baseClasses = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
    const classes = className ? `${baseClasses} ${className}` : baseClasses;

    return <label {...props} className={classes} />;
}