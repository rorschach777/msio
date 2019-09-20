import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loaded: false,
    jobs: {},
    coverLetter: {},
}
const coverLetterReducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.COVERLETTER_SET_CL:
        return {
            ...state,
            coverLetter: {
                ...action.payload.coverLetter
            }
        }
        //
        case actionTypes.COVERLETTER_SET_JOB:
        return{
            ...state,
            jobs: {
                ...action.payload.jobData
            }
        }
        //
        case actionTypes.COVERLETTER_LOADED:
            return {
                ...state,
                loaded: true
            }
    }
    return state
}
export default coverLetterReducer