import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {refreshGame} from '../../redux/actions/app'
class Score extends Component {
    render(){
        return (
            <div className='start-page'>
            <h1>Game over</h1>
            <h2>Your score: {this.props.score}</h2>
            <input type='button' className='btn' value='Retry' onClick = {(e) => store.dispatch(refreshGame())} />
            </div>   
        )
    }
}
    

const mapStateToProps = state => ({
    score: state.app.score,
})
export default connect(mapStateToProps)(Score)

