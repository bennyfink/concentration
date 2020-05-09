import React from 'react';
import { Link } from 'react-router-dom';
import Main from './routes.jsx';

class Concentration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gridSize: null,
        url: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
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

    handleChange (e) {
        this.setState({
            gridSize: e.target.value,
        });
    }


    render() {
        const { gridSize } = this.state;
      return (
        <div className="App">
            <div className="board">
                <form className="comment-form" onSubmit={this.handleSubmit}>
                    <label for="boardNum">Enter Number of pairs you would like to use:</label>
                    <input type="number" id="boardNum" name="boardNum" value={gridSize} onChange={this.handleChange}></input>
                    <Link to="/templates/play.html">
                        <input type="submit" value="Play!"></input>
                    </Link>
                </form>
            </div>
        </div>
      );
    }
  }
  
  export default Concentration;