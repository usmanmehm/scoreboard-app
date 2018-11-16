import React, { Component } from 'react';

class AddPlayerForm extends Component {
    playerInput = React.createRef();

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPlayer(this.playerInput.current.value);
        event.currentTarget.reset();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    ref={this.playerInput}
                    // value={this.state.value} 
                    // onChange={this.handleValueChange}
                    placeholder="Enter a player's name"
                    />
                <input 
                    type="submit" 
                    value="Add Player"
                />
            </form>
        );
    }
}

export default AddPlayerForm;