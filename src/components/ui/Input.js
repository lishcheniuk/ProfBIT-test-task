export function Input({ data, value, change }) {
    return (
        <input
            className='form__input form__input'
            type={data.type}
            name={data.name}
            onChange={change}
            value={value}
            {...data.attrs}
        />
    );
}
