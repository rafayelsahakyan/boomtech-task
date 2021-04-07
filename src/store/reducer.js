import * as actionTypes from '../store/actionTypes';

const defaultState={
  persons : [],
} 

export default function reducer(state = defaultState, action){
    switch(action.type){

      case actionTypes.ADD_PERSON:{
        return{
          ...state,
          persons:[...state.persons,action.person]
        }
      }
      case actionTypes.DELETE_PERSON:{
        const afterDelete = state.persons.filter((person) => action.person !== person.id)
        return{
          ...state,
          persons: afterDelete
        }
      }
      case actionTypes.SORT_PERSON:{
        return{
          ...state,
          persons: [...action.ordered]
        }
      }
      
      default:return state
    }
}