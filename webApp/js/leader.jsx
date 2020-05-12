import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
var counter = 1

function PlayerTable ({ name, points, time }) {
    console.log("leaderboard")
    return (
        <tr>
            <td>{counter++}</td>
            <td>{name}</td>
            <td>{points}</td>
            <td>{time}</td>
        </tr>
    );
}

class Leader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        leaders: null,
      };
      counter = 1;
    }
  
    componentDidMount() {
        fetch('https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/DynamoDBOperations/DynamoDBManager/', {
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
            let orderThis = data.Items;

            // include time in rankings
            orderThis.sort((a, b) => {
              if (a.score === b.score)
              return a.time - b.time
            });

            this.setState({
                leaders: orderThis,
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
                    <th>Time (seconds)</th>
                </tr>
                    {leaders.map((person) => (
                    <PlayerTable
                        key={counter}
                        name={person.name}
                        points={person.score}
                        time={person.time}
                    />
                    ))}
            </tbody>
           </table>
           <p></p>
           <p></p>
           <div class="pinfo">
                <div class="info" style={{"tab-size": "4"}}>FAQ:</div>
                <p class="info" style={{"tab-size": "4"}}>        Why is time recorded on the leaderboard?</p>
                <li class="info" style={{"tab-size": "4"}}>       Time is a great measurement of conentration. Your time includes time spent studying the board and identifying pairs. It acts as the tie breaker in rankings.</li>
            </div>
            <p></p>
            <p></p>
            <p class="info2">Click <Link to={{pathname: "/templates/"}}>here</Link> to go to the home page.</p>
        </div>
      );
    }
}
  

PlayerTable.propTypes = {
    name: PropTypes.node.isRequired,
    points: PropTypes.node.isRequired,
    time: PropTypes.node.isRequired,
};

export default Leader;