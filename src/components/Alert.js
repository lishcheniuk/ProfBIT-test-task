export function Alert({ message }) {
    return (
        <div
            className={`alert ${
                message.type === 'success' ? 'success' : 'error'
            }`}
        >
            <p>{message.text}</p>
        </div>
    );
}
