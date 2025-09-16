import { type ComponentProps } from 'react';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'>;

export function Checkbox({ className = '', ...props }: CheckboxProps) {
    const baseClasses = 'h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary';
    const classes = className ? `${baseClasses} ${className}` : baseClasses;

    return <input type="checkbox" {...props} className={classes} />;
}