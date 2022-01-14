export function Select({ data, value, change }) {
    return (
        <select
            className='form__select form__input'
            name={data.name}
            onChange={change}
            value={value}
            {...data.attrs}
        >
            <option value=''></option>
            {data.options.map((option) => {
                const key = Object.keys(option);
                return (
                    <option key={key} value={key}>
                        {option[key]}
                    </option>
                );
            })}
        </select>
    );
}
