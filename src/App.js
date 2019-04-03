import React, {Component} from 'react';
import './App.css';
import { directions, initCells, moveCells, populateField } from "./logic";
import Layout from "./UI/Layout";
import ControlPanel from "./UI/ControlPanel";
import Button from "./UI/Button";
import Score from "./UI/Score";
import Field from "./UI/Field";

class App extends Component {

    state = App.getNewState();

    mapKeyCodeToDirection = {
        KeyA: directions.LEFT,
        KeyS: directions.DOWN,
        KeyD: directions.RIGHT,
        KeyW: directions.UP,
    };

    newGame = () => this.setState(App.getNewState());

    static getNewState() {
        return { cells: initCells(), score: 0, playgroundChanged: false }
    };

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress = async event => {
        if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code)) {
            const moveResult = moveCells(this.state.cells, this.mapKeyCodeToDirection[event.code]);

            this.setState(state => ({
                ...state,
                cells: moveResult.cells,
                playgroundChanged: moveResult.playgroundChanged
            }));
        }

        await delay(100);

        if (this.state.playgroundChanged) {
            this.setState(state => ({
                ...state,
                cells: populateField(state.cells),
            }));
        }
    };

    render() {
        const {cells, score} = this.state;

        return (
            <Layout>
                <ControlPanel>
                    <Button onClick={this.newGame}>New Game</Button>
                    <Score>{score}</Score>
                </ControlPanel>
                <Field cells={cells}/>
            </Layout>
        )
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default App;
