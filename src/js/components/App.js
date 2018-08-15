import React, {Component} from 'react'
import { connect } from "react-redux";
import {Start} from './pages/Start'
import Game from './pages/Game'
import Score from './pages/Score'

class App extends Component {

    getPage = () => {
        switch (this.props.currentPage) {
            case 0: return <Start />;
            case 1: return <Game />;
            case 2: return <Score />;
            case 3: return <Start />; 
        }
    }

    render() {
        return (
            <div className='wrapper'>{this.getPage()}</div>
        )
    }
}

const mapStateToProps = state => ({
    currentPage: state.app.currentPage,
})

export default connect(mapStateToProps)(App)
