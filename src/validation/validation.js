export const checkElementValidity = (value, validationRules) => {
    let isValid = true;
    if (validationRules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (validationRules.email) {
        const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        isValid = regExEmail.test(value.toLowerCase())
    }
    if (validationRules.password) {
        const regExPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        isValid = regExPassword.test(value)
    }
    if (validationRules.maxLength) {
        isValid = value.length <= validationRules.maxLength 
    }
    if (validationRules.minLength) {
        isValid = value.length >= validationRules.minLength
    }
    if (validationRules.notHTML){
        const regexHTML = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/
        isValid = value.length <= validationRules.maxLength && !regexHTML.test(value);
    }
    return isValid
}

export const checkTotalValidity = (containerState, reducerAction) => {
    let authForm = {
        ...containerState.form
    }
    let validSettings = []
    // Put all the input setting boolean values in an array
    for (let key in authForm) {
        validSettings.push(authForm[key].touched, authForm[key].isValid)
    }
    // If the valid settings does not contain false, the form is valid  // data can be submitted. 
    return dispatch => {
        if (!validSettings.includes(false)) {
            dispatch(setTotalValidity(true, reducerAction))
        }
        // otherwise...
        else {
            dispatch(setTotalValidity(false, reducerAction))
        }
    }
}
const setTotalValidity = (val, type) => {
    return {
        type: type,
        payload: {
            bool: val
        }
    }
}