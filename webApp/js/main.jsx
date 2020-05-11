import React from 'react';
import { Link } from 'react-router-dom';
import Main from './routes.jsx';

class Concentration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gridSize: null,
        userName: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeNum = this.handleChangeNum.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        // TODO make dummy user profile

    }

    handleChangeNum (e) {
        this.setState({
            gridSize: e.target.value,
        });
    }

    handleChangeName (e) {
        this.setState({
            userName: e.target.value,
        });
    }


    render() {
        const { gridSize, userName } = this.state;
      return (
        <div className="App">
          <div class="concentration">Welcome to Concentration!</div>
          <p></p>
          <p></p>
          <p></p>
            <div className="board">
                <form className="form-wrap" onSubmit={this.handleSubmit}>
                    <p><label for="userName">Enter a nickname!</label></p>
                    <input type="text" id="userName" name="User Name" placeholder="Guest" value={userName} onChange={this.handleChangeName}></input>
                    <p><label for="boardNum">Enter the number of pairs you would like to match (between 2 and 50):</label></p>
                    <input type="number" id="boardNum" name="boardNum" placeholder="8" value={gridSize} onChange={this.handleChangeNum}></input>
                    <Link to={{
                        pathname: "/templates/play.html",
                        state:  {
                            boardSize: gridSize,
                            userName:  userName,
                        }
                    }}>
                        <input type="submit" value="Play!"></input>
                    </Link>
                </form>
            </div>
            <p></p>
            <p></p>
            <p class="info2">Click <Link to={{pathname: "/templates/leaderboard.html"}}>here</Link> to check out the top global players!</p>
        </div>
      );
    }
  }
  
  export default Concentration;