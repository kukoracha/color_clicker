import React, {Component} from 'react'
import {connect} from 'react-redux'
import COLORS, {COLORS_LENGTH} from '../../colors'
import {LEVELS} from '../../levels'
import Color from 'color'


import store from '../../redux/store'
import {nextLevel, changePage} from '../../redux/actions/app'

const Cell = ({color, isActiveClick}) => 
    <div className='cell' style={{background: color}} onClick={isActiveClick}></div>

const Score = ({score}) =>
    <div className='score'>Score: {score}</div>

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentSecond: 0,
        }

        let interval = setInterval(() => {
            let {currentSecond} = this.state;
            const {to, clearTimer} = this.props;
            currentSecond++;
            if (currentSecond===to+1) {
                clearInterval(interval);
                clearTimer();
            } else {
                this.setState({currentSecond});
            }
            
        }, 1000)
    }

    render(){
        const {to} = this.props;
        const {currentSecond} = this.state;
        return (
            <div className='timer'>Time: {to - currentSecond}</div>
        )
    }
}

class Board extends Component {

    activeClick = () => store.dispatch(nextLevel(this.props.score, this.props.currentLevel, this.props.rows, this.props.lighten))

    getCells = () => {
        let cells = []
        const {countCells, activeCell, color, lighten} = this.props;
        //let color = '#ff0000'
        for (let i=0; i<countCells; i++) {
            const isActiveClick = i===activeCell ? this.activeClick : null;
            cells.push(<Cell key={i} color={i===activeCell ? Color(color).lighten(lighten).toString() : color} isActiveClick={isActiveClick} />)
        }
        return cells
    }

    render () {
        const {rows} = this.props;
        const cls = `board x${rows}`
        return (
            <div className={cls}>
                {this.getCells()}
            </div>
        )
    }
}


class Game extends Component {

    getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    getColor = () => COLORS[this.getRandomInt(0, COLORS_LENGTH-1)]
    getActiveCell = (countCells) => this.getRandomInt(0, countCells-1) 

    callbackTimer = () => store.dispatch(changePage(2))

    render () {

        const {currentLevel, score} = this.props;
        const optionsLevel = LEVELS[currentLevel]
        optionsLevel.color = this.getColor()
        optionsLevel.countCells = Math.pow(optionsLevel.rows, 2)
        optionsLevel.activeCell = this.getActiveCell(optionsLevel.countCells)  
        optionsLevel.currentLevel = currentLevel

        return (
            <div className='game-page'>
                <div className='info'>
                    <Score score={score} />
                    <Timer to={30} clearTimer={this.callbackTimer}/>
                </div>
                <Board {...optionsLevel} score={score} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentLevel: state.app.currentLevel,
    score: state.app.score,
})

export default connect(mapStateToProps)(Game)
    