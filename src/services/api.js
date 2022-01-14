export const API = {
    fetchQuestions() {
        return fetch('/backend/customer-message-form.json').then((res) =>
            res.json()
        );
    },
    sendQuestionSuccess() {
        return fetch('/backend/customer-message-form-success.json').then(
            (res) => res.json()
        );
    },
    sendQuestionError() {
        return fetch('/backend/customer-message-form-error.json').then((res) =>
            res.json()
        );
    },
};
