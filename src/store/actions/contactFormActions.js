import * as actionTypes from '../actions/actionTypes';
import {checkElementValidity, checkTotalValidity} from '../../validation/validation';
import axiosInstanceFB from '../../axios/axios'

export const contactReset = (e) => {
    e.preventDefault();
    return {
        type: actionTypes.CONTACT_RESET
    }

}
const contactInputUpdated = (e, state) => {
    e.preventDefault();
    let form = {
        ...state.form
    }
    let inputId = e.target.id
    let value = e.target.value
    let isValid = checkElementValidity(value, form[inputId].validation)
    let errorVisible = !isValid
    let touched = true
    let updatedAuthFormElement = {
        ...form[inputId],
        value: value,
        isValid: isValid,
        inputConfig: {
            ...form[inputId].inputConfig, 
            errorVisible: errorVisible
        },
        touched: touched
    }
    return {
        type: actionTypes.CONTACT_INPUT_UPDATED,
        payload:{
            id: inputId,
            values: updatedAuthFormElement
        } 
    }
}
export const contactFormSubmit = (e, mainState, contactState) => {
e.preventDefault();
return dispatch => {
axiosInstanceFB.get('users.json')
.then((usersObj)=>{
    let users = usersObj.data
    return users
})
.then((usersObj)=>{
    for (let key in usersObj){
        if (usersObj[key].userId === mainState.userInfo.userId){
            let submitObj = {
                date: Date.now(), 
                email: contactState.form.emailAddress.value,
                firstName: contactState.form.firstName.value,
                lastName: contactState.form.lastName.value,
                phoneNumber: contactState.form.phoneNumber.value,
                message: contactState.form.message.value,
                subjectLine: contactState.form.subjectLine.value,
            }
            axiosInstanceFB.post(`/users/${key}/messages.json`, submitObj)
        }
    }
})

.then((_)=>{
    dispatch(contactFormSubmitSuccess())

})
}
}
const contactFormSubmitSuccess = () => {
    return {
        type: actionTypes.CONTACT_FORM_SUBMITTED
    }
}
export const contactFormInit = (e, state) => {
    let reducerAction = actionTypes.CONTACT_TOTAL_VALIDITY
    return dispatch => {
       dispatch(contactInputUpdated(e, state));
       dispatch(checkTotalValidity(state, reducerAction));
    }
}