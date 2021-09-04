import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'

const Header = ( {showAdd, isShowing} ) => {

    return (
        <header>
            <h1>Task Tracker</h1>
            <Button 
                color = { !isShowing? 'green' : 'red'} 
                text = { !isShowing ? 'Add' : 'Close'} 
                onClick = { showAdd }
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'hello kitty',
}

Header.protoTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
