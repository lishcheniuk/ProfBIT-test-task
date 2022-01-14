import { useEffect, useRef, useState } from 'react';
import { AskQuestionModal } from './components/AskQuestionModal';
import { API } from './services/api';
import { Alert } from './components/Alert';
import { ERROR, SUCCESS } from './CONSTS';

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
            if (typeSend === ERROR) {
                data = await API.sendQuestionError();
            } else {
                data = await API.sendQuestionSuccess();
            }

            if (data.status === 200) {
                setIsShowModal(false);
            }

            if (data.message) {
                setMessage({
                    text: data.message,
                    type: data.status === 200 ? SUCCESS : ERROR,
                });
            }
            return data.form;
        } catch (error) {
            setMessage({
                text: error,
                type: ERROR,
            });
            return false;
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
