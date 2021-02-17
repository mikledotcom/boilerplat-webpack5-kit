// redusers-2.js
import { combineReducers } from 'redux'
import C from '../constants'
// this metod rootReduserBasket any-requireds ???
const rootReduserBasket = () =>
  combineReducers({
    dances,
    rounds,
    settings,
    sort,
    uidProject,
    idProject,
    projectIsSaved,
    projectIsLoading,
    projectHasErrored,
  })

const generalRedusersBasket = (state = {}, action) => {
  return {
    dances: dances(state.dances, action),
    rounds: rounds(state.rounds, action),
    settings: settings(state.settings, action),
    sort: sort(state.sort, action),
    uidProject: uidProject(state.uidProject, action),
    idProject: idProject(state.idProject, action),
    projectIsSaved: action.projectIsSaved,
    projectIsLoading: projectIsLoading(state.projectIsLoading, action),
    projectHasErrored: projectHasErrored(state.projectHasErrored, action),
    projectIsNew: projectIsNew(state.projectIsNew, action),
  }
}

/*  deleted case??*/
export const new_round = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_ROUND_SPLIT:
      return {
        ...state,
        dances: action.dances,
        rounds: action.rounds,
      }
    default:
      return state
  }
}
