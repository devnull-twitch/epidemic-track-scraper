const optionForm = document.querySelector('#optionform');
const tokenField = document.querySelector('#token');
optionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submit();
});

const submit = async () => {
    await browser.storage.local.set({
        'token': tokenField.value,
    });
};

const setup = async () => {
    const res = await browser.storage.local.get(['token']);
    tokenField.value = res.token;
};
setup();