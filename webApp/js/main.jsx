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
  /*
    componentDidMount() {
      if (performance.getEntriesByType('navigation')[0].type === 'back_forward') {
        this.setState({
          next: window.history.state.next,
          results: window.history.state.results,
          url: window.history.state.url,
        });
      } else {
        const { url } = this.props;
  
        fetch(url, { credentials: 'same-origin' })
          .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          })
          .then((data) => {
            this.setState({
              next: data.next,
              results: data.results,
              url: data.url,
            });
            window.history.pushState(this.state, '/');
          })
          .catch((error) => console.log(error));
      }
    }
    */

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
            <div className="board">
                <form className="comment-form" onSubmit={this.handleSubmit}>
                    <label for="userName">Enter a username:</label>
                    <input type="text" id="userName" name="User Name" value={userName} onChange={this.handleChangeName}></input>
                    <label for="boardNum">Enter Number of pairs you would like to use:</label>
                    <input type="number" id="boardNum" name="boardNum" value={gridSize} onChange={this.handleChangeNum}></input>
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
        </div>
      );
    }
  }
  
  export default Concentration;