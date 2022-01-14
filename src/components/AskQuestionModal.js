import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FormModal } from './FormModal';

export function AskQuestionModal({ dataForm, isShow, close, submit }) {
    const nodeRef = useRef(null);

    return (
        <>
            {isShow && <div className='modal__overlay' onClick={close}></div>}

            <CSSTransition
                nodeRef={nodeRef}
                in={isShow}
                timeout={500}
                classNames='modal'
                unmountOnExit
                mountOnEnter
            >
                <div
                    ref={nodeRef}
                    className='modal__body'
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className='modal__title'>Задать вопрос</h2>
                    <div className='modal__main'>
                        <FormModal dataForm={dataForm} submit={submit} />
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}
