import React, {Component} from 'react'
import store from '../../redux/store'
import {changePage} from '../../redux/actions/app'

export const Start = () =>
    <div className='start-page'>
        <h1>Color clicker</h1>
        <input type='button' className='btn' value='Start' onClick = {(e) => store.dispatch(changePage(1))}  />
    </div>    
