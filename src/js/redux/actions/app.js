import {CHANGE_PAGE, NEXT_LEVEL, REFRESH_GAME} from '../constants'

export const changePage = (page) => {
    return {type: CHANGE_PAGE, newPage: page}
}

export const nextLevel = (score, currentLevel, rows, lighten) => {
    const newScore = score + currentLevel * rows * lighten * 100;
    return {type: NEXT_LEVEL, score: newScore}
}

export const refreshGame = () => {
    return {type: REFRESH_GAME}
}

