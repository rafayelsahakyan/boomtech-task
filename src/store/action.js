import * as actionTypes from '../store/actionTypes';

export function addPerson(person){
    return(dispatch)=>{
        dispatch({type:actionTypes.ADD_PERSON, person: person});
    }
}

export function deletePerson(person){
    return(dispatch)=>{
        dispatch({type:actionTypes.DELETE_PERSON, person: person});
    }
}

export function sortPerson(ordered){
    return(dispatch)=>{
        dispatch({type:actionTypes.SORT_PERSON, ordered:ordered});
    }
}