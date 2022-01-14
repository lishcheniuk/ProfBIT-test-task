export function Textarea({ data, value, change }) {
    return (
        <textarea
            className='form__textarea'
            name={data.name}
            onChange={change}
            value={value}
            {...data.attrs}
        ></textarea>
    );
}
