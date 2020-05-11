import React from 'react';
import { Link } from 'react-router-dom';

class Leader extends React.Component {
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
        Testing!
        </div>
      );
    }
  }
  
  export default Leader;

  <div class="tablep" style:"text-align": "center">
  <table>
    <tbody>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Points</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Jessie</td>
        <td>102,345</td>
    </tr>
      <tr>
        <td>2</td>
        <td>Bob</td>
        <td>2,321</td>
    </tr>
    </tbody>
  </table></div>