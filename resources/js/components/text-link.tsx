import { Link } from '@inertiajs/react';
import { type ComponentProps } from 'react';

type TextLinkProps = ComponentProps<typeof Link> & {
    external?: boolean;
};

export default function TextLink({ className = '', external, ...props }: TextLinkProps) {
    const baseClasses = 'text-info hover:text-info/70 transition-colors duration-200';
    const classes = className ? `${baseClasses} ${className}` : baseClasses;

    if (external) {
        return (
            <a
                {...(props as ComponentProps<'a'>)}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
            />
        );
    }

    return <Link {...props} className={classes} />;
}