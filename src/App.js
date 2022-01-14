import { useEffect, useRef, useState } from 'react';
import { AskQuestionModal } from './components/AskQuestionModal';
import { API } from './services/api';
import { Alert } from './components/Alert';

function App() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [message, setMessage] = useState(null);
    const timeout = useRef();

    useEffect(() => {
        if (message) {
            timeout.current = setTimeout(() => setMessage(null), [2000]);
        }

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, [message]);

    async function askQuestionHandler() {
        try {
            const data = await API.fetchQuestions();
            setDataForm(data.form);
            setIsShowModal(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function submitForm(formValue, typeSend) {
        console.log(formValue);
        let messagePayload = null;
        try {
            if (typeSend === 'error') {
                const data = await API.sendQuestionError();
                messagePayload = {
                    text: data.message || 'Ошибка! Что-то пошло не так',
                    type: 'error',
                };
            } else {
                const data = await API.sendQuestionSuccess();
                messagePayload = {
                    text: data.message || 'Успешный запрос',
                    type: 'success',
                };

                setIsShowModal(false);
            }
            setMessage(messagePayload);
        } catch (error) {
            messagePayload = {
                text: error,
                type: 'error',
            };
            setMessage(messagePayload);
        } finally {
            return messagePayload.type === 'success';
        }
    }

    return (
        <div className='App'>
            {message && <Alert message={message} />}

            <button className='btn' onClick={askQuestionHandler}>
                Задать вопрос
            </button>

            <AskQuestionModal
                isShow={isShowModal}
                dataForm={dataForm}
                close={() => setIsShowModal(false)}
                submit={(...params) => submitForm(...params)}
            />
        </div>
    );
}

export default App;
