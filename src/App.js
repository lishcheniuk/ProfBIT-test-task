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
        let data = null;
        try {
            if (typeSend === 'error') {
                data = await API.sendQuestionError();
            } else {
                data = await API.sendQuestionSuccess();
                setIsShowModal(false);
            }

            const errors = data.form
                .filter((item) => !!item.errors)
                .map((item) => item.errors)
                .flat();

            if (!errors.length) {
                setMessage({
                    text: data.message || 'Успешный запрос',
                    type: 'success',
                });
            }

            return { status: data.status, errors };
        } catch (error) {
            setMessage({
                text: error,
                type: 'error',
            });
            return { status: 400 };
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
