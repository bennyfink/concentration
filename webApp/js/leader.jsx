import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
var counter = 1

class Leader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        leaders: null,
      };
    }
  
    componentDidMount() {
        fetch('http://127.0.0.1:3000/DynamoDBOperations/DynamoDBManager/', {
            method: 'POST',
            body: JSON.stringify({
              operation: 'query',
            }),
          })
          .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.setState({
                leaders: data.Items,
            });
          })
          .catch((error) => console.log(error));
        }
    
    render() {
        const { leaders } = this.state;

        if (!leaders) {
            return (<p>Loading...</p>)
        }

      return (
        <div className="App">
            <table>
             <tbody>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Points</th>
                </tr>
            {leaders.map((person) => {
                console.log(person);
                console.log(person.player_id);
                (<tr>
                    <td>{counter++}</td>
                    <td>{person.name}</td>
                    <td>{person.score}</td>
                    <td>{person.time}</td>
                </tr>)
            })}
            </tbody>
           </table>
        </div>
      );
    }
}
  

export default Leader;