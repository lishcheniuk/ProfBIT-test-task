import { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { ERROR, SUCCESS } from '../CONSTS';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

export function FormModal({ dataForm, submit }) {
    const [formValue, setFormValue] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [dataFormLocal, setDataFormLocal] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        setDataFormLocal(dataForm);
    }, [dataForm]);

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    }

    function validForm() {
        let error = 0;
        for (let item of formRef.current) {
            if (item.name && !item.value) error++;
        }
        return error > 0;
    }

    async function submitHandler(e, typeSend) {
        e.preventDefault();
        if (validForm()) {
            setIsValid(true);
            return false;
        } else if (isValid) {
            setIsValid(false);
        }

        const answer = await submit(formValue, typeSend);
        if (answer) {
            const newValues = {};
            answer.forEach((item) => {
                if (item.value) newValues[item.name] = item.value;
            });
            setFormValue(newValues);
            setDataFormLocal(answer);
        }
    }

    return (
        <form className='modal__form form' ref={formRef}>
            <div className='form__main'>
                {dataFormLocal.map((item, index) => {
                    return (
                        <div
                            key={item.name + index}
                            className='form__input-group'
                        >
                            <div className='form__input-wrap'>
                                {item.type === 'select' ? (
                                    <Select
                                        data={item}
                                        value={formValue[item.name] || ''}
                                        change={changeHandler}
                                        isValid={isValid}
                                    />
                                ) : item.type === 'textarea' ? (
                                    <Textarea
                                        data={item}
                                        value={formValue[item.name] || ''}
                                        change={changeHandler}
                                        isValid={isValid}
                                    />
                                ) : (
                                    <Input
                                        data={item}
                                        value={formValue[item.name] || ''}
                                        change={changeHandler}
                                        isValid={isValid}
                                    />
                                )}
                                <div
                                    className={`form__input-placeholder ${
                                        !!formValue[item.name]
                                            ? 'form__input-placeholder--valid'
                                            : ''
                                    }`}
                                >
                                    {item.attrs.placeholder}
                                </div>
                            </div>
                            <ul className='form__valid-list'>
                                {isValid &&
                                    !!!formValue[item.name] &&
                                    !item.errors && (
                                        <li className='form__valid-message'>
                                            Поле обязательное к заполнению
                                        </li>
                                    )}
                                {item.errors?.map((error, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className='form__valid-message'
                                        >
                                            {error}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className='form__footer'>
                <button
                    className='btn'
                    onClick={(e) => submitHandler(e, ERROR)}
                >
                    Отправить с ошибкой
                </button>
                <button
                    className='btn'
                    onClick={(e) => submitHandler(e, SUCCESS)}
                >
                    Отправить с успехом
                </button>
            </div>
        </form>
    );
}
