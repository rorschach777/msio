import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loadProgress: false
}
const skillsReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SKILLS_LOAD_PROGRESS:
            return {
                ...state,
                loadProgress: true
            }
    }
    return state
}
export default skillsReducer