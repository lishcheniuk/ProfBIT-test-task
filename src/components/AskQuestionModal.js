import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export function AskQuestionModal({ dataForm, isShow, close, submit }) {
    const [formValue, setFormValue] = useState({});
    const nodeRef = useRef(null);
    const formRef = useRef();

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
        if (validForm()) return false;
        const statusOk = await submit(formValue, typeSend);
        if (statusOk) setFormValue({});
    }

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isShow}
            timeout={500}
            classNames='modal'
            unmountOnExit
            mountOnEnter
        >
            <div className='modal__overlay' onClick={close} ref={nodeRef}>
                <div
                    className='modal__body'
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className='modal__title'>Задать вопрос</h2>
                    <div className='modal__main'>
                        <form className='modal__form form' ref={formRef}>
                            <div className='form__main'>
                                {dataForm.map((item, index) => {
                                    return (
                                        <div
                                            key={item.name + index}
                                            className='form__input-group'
                                        >
                                            <label>{item.label}</label>
                                            <div className='form__input-wrap'>
                                                {item.type === 'select' ? (
                                                    <select
                                                        className='form__select form__input'
                                                        name={item.name}
                                                        required={
                                                            item.attrs.required
                                                        }
                                                        onChange={changeHandler}
                                                        value={
                                                            formValue[
                                                                item.name
                                                            ] || ''
                                                        }
                                                    >
                                                        <option value=''></option>
                                                        {item.options.map(
                                                            (option) => {
                                                                const key =
                                                                    Object.keys(
                                                                        option
                                                                    );
                                                                return (
                                                                    <option
                                                                        key={
                                                                            key
                                                                        }
                                                                        value={
                                                                            key
                                                                        }
                                                                    >
                                                                        {
                                                                            option[
                                                                                key
                                                                            ]
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                ) : item.type === 'textarea' ? (
                                                    <textarea
                                                        className='form__textarea'
                                                        name={item.name}
                                                        required={
                                                            item.attrs.required
                                                        }
                                                        placeholder={
                                                            item.attrs
                                                                .placeholder
                                                        }
                                                        rows='4'
                                                        onChange={changeHandler}
                                                        value={
                                                            formValue[
                                                                item.name
                                                            ] || ''
                                                        }
                                                    ></textarea>
                                                ) : (
                                                    <input
                                                        className='form__input form__input'
                                                        type={item.type}
                                                        name={item.name}
                                                        required={
                                                            item.attrs.required
                                                        }
                                                        placeholder={
                                                            item.attrs
                                                                .placeholder
                                                        }
                                                        onChange={changeHandler}
                                                        value={
                                                            formValue[
                                                                item.name
                                                            ] || ''
                                                        }
                                                    />
                                                )}
                                                <div className='form__input-placeholder'>
                                                    {item.attrs.placeholder}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className='form__footer'>
                                <button
                                    className='btn'
                                    onClick={(e) => submitHandler(e, 'error')}
                                >
                                    Отправить с ошибкой
                                </button>
                                <button
                                    className='btn'
                                    onClick={(e) => submitHandler(e, 'success')}
                                >
                                    Отправить с успехом
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}
