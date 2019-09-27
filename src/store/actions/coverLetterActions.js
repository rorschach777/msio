import * as actionTypes from '../actions/actionTypes';
import axiosFB from '../../axios/axios';
export const coverLetterLoad = (accessKey) => {

    return dispatch => {
        axiosFB.get('/job.json')
        .then((jobs, jobsReject) => {
            let job = {}
            jobs.data.forEach((cur, idx) => {
                console.log('-- PASSED ACCESS KEY : ---')
                console.log(accessKey)
                console.log('-- CUR : ---')
                console.log(cur.accessKey)
                if (cur.accessKey.toLowerCase() === accessKey.toLowerCase()) {
                    Object.assign(job, cur)
                }
            })
            return job
        })
        .then(targetJob => {

            dispatch(setJobData(targetJob))
        })
        .then(()=>{
            axiosFB.get('/coverLetter.json')
            .then(coverLetter => {
                let cl = coverLetter.data
                dispatch(setCL(cl))
            })
        })
        .then(()=>{
            dispatch(setLoadComplete())
        })
    }
}
const setJobData = (jobData)=> {
    return {
        type: actionTypes.COVERLETTER_SET_JOB,
        payload: {
            jobData: jobData
        }
    }
}
const setCL = (coverLetter) => {
    return {
        type: actionTypes.COVERLETTER_SET_CL,
        payload: {
            coverLetter: coverLetter
        }
    }
}
const setLoadComplete=()=>{
    return {
        type: actionTypes.COVERLETTER_LOADED
    }
}