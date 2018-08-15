import {CHANGE_PAGE, NEXT_LEVEL, REFRESH_GAME} from '../constants'
import {MAX_LEVEL} from '../../levels'

const initialState = {
    currentPage: 0,  
    currentLevel: 1,
    score: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return (
                {
                    ...state,
                    currentPage: action.newPage,
                }
            )
        case NEXT_LEVEL:
            const currentLevel = state.currentLevel < MAX_LEVEL ? state.currentLevel+1 : MAX_LEVEL;
            return (
                {
                    ...state,
                    currentLevel: currentLevel,
                    score: action.score,
                }
            )
        case REFRESH_GAME:
            return (
                {
                    ...initialState
                }
            )
        default:
            return ({...state})
    }
} 