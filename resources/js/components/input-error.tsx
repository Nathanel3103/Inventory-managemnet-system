export default function InputError({ message, className = '' }: { message?: string; className?: string }) {
    return message ? (
        <div className={`${className} text-sm text-error`}>
            {message}
        </div>
    ) : null;
}