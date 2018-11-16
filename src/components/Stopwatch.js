import React, { Component } from 'react';

class Stopwatch extends Component {

    state = {
        isRunning: false,
        elapsedTime: 0,
        previousTime: 0,

    };

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 100);
    };

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    tick = () => {
        if (this.state.isRunning) {
            const now = Date.now();
            this.setState( prevState => {
                return ({
                    previousTime: now,
                    elapsedTime: prevState.elapsedTime + (now - prevState.previousTime)
                });
            });
        };
    };

    resetTime = () => {
        this.setState( () => {
            return ({
                elapsedTime: 0
            });
        });
    };

    handleStopwatch = () => {
        this.setState( prevState => ({ isRunning: !prevState.isRunning }));
        if (!this.state.isRunning) {
            this.setState({ previousTime: Date.now() });
        };
    };

    render() {
        const seconds = Math.floor(this.state.elapsedTime / 1000);


        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <span className="stopwatch-time">{seconds}</span>
                <button onClick={this.handleStopwatch}>
                    {this.state.isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={this.resetTime}>Reset</button>
            </div>
        );
    }
}

export default Stopwatch;