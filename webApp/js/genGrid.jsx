import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
var pairs = new Map();
var numToEmoji = new Map();
var mapper = new Array();
var matched = new Set();
var selected = new Set();
var noCheating = new Map();
var cards;
var lastClick;
var player;
var height;
var size;
var setupDone = false;
var startTime, outcome;
var showAlert = false;
var posted = false;
var lastSelected = null;
var showing = new Set();
var victory;

function ListBlocks ({ pic, fxn, num2e, }) {
    let font = {'font-size': `var(--emoji-size-${pic})`};
    let emoj = num2e.get(pic);
    if (pic == size*2+1) {
      setupDone = true;
    }
    if (!matched.has(pic) && lastClick && !noCheating.has(pic)) {
      // emoj = "No Cheating!";
        emoj = "";
    }
    noCheating.forEach((value, key, map) => {
     // console.log(time - parseInt(value), noCheating)
      if ((Date.now() - parseInt(value)) > 3000 && !selected.has(key) && lastSelected != value && !showing.has(key)) {
        map.delete(key)
      }
    })
    lastSelected = lastClick;
    return (<div class="item" id={pic} onClick={fxn}>
                    <div class="emoji" id={pic} style={font}>{emoj}</div>
            </div>);
}

function BootUp ({ go, sleep }) {
  if (!setupDone && !go) {
  //console.log('Go!')
  document.getElementById(0).style.setProperty('--column-number', (size*2)/height)
  sleep(0)
        .then(() => {
        cards = document.querySelectorAll(".emoji")
        if (cards && setupDone) {
          cards.forEach(input => {
        //  console.log("forEach!");
          // Might not need this first line (put handler in render)
          //input.addEventListener("click", this.handleCard);
          let label = `--emoji-size-${input.id}`
          document.getElementById(input.id).style.setProperty(label, '3.5vw');
          })
          }
          return (null)
        });
}
  return (null)
}

function Congrats ({ go, points, notPlaying, win, score, time, }) {
  if (go && !win) {
    return (<div class="congrats">Nice work! You've identified a pair (+{points} points)</div>)
  } else if (notPlaying) {
    return (<div class="congrats">Press start to begin matching!</div>)
  } else if (win) {
    return (<div class="congrats">Congrats {player}! You finished in {time} seconds with a score of {score}. You can play this board again or click on one of the links below. </div>)
    // Display link to post to leaderboard here.
  } else {
    return (<div class="congrats">Try to identify a pair of emojis!</div>)
  }
}

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: null,
      n2e: new Map(),
      checkMatch: false,
      studyingMap: true,
      firstRun: true,
      score: 0,
      newPoints: 0,
      success: false,
      clicks: 0,
      time: 0,
      htmlWin: null,
      congrats: false,
    };
     pairs = new Map();
     numToEmoji = new Map();
     mapper = new Array();
     matched = new Set();
     selected = new Set();
     noCheating = new Map();
     showing = new Set();
     cards = null;
     lastClick = null;
     player = null;
     height = null;
     size = null;
     setupDone = false;
     startTime = null;
     showAlert = false;
     posted = false;
     lastSelected = null

    this.handleStart = this.handleStart.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleCard = this.handleCard.bind(this);
    this.handleWin = this.handleWin.bind(this);
  }

  componentDidMount() {
    const { boardSize, userName } = this.props.location.state;
    player = userName;
    size = boardSize;

    if (player == '' || !player) {
      player = "Guest";
    }

    if (size < 2 || size > 50 || !size) {
      size = 8;
    }


    // These are dummy api's to try out API Gateway and cloudFormation.
    // The logic implemented in them can be implemented on client side as well

    // This is a way to make more than one api call for this component
   /* const promises = Promise.all(
      [fetch(`https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/leaderboard?pairs=${size}`),
       fetch(`https://aw06fep7p2.execute-api.us-east-1.amazonaws.com/Prod/hello?pairs=${size}`)]
    ) */
    const promises = Promise.all(
      [fetch(`https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/leaderboard/?pairs=${size}`),
       fetch(`https://aw06fep7p2.execute-api.us-east-1.amazonaws.com/Prod/hello?pairs=${size}`)])


    .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2]) => {
       // console.log(res1.message)
       // console.log(res2.message)
        height = res2.message
        this.setState({
          emojis: res1.message,
          });
        

       //   console.log(this.state.emojis)
        //  console.log(this.state.height)
        
        // init pairs
        let temp = new Set();
        let i
        const { emojis } = this.state

       // console.log("done fetching")
      //  console.log
        for (i = 2; i < size*2 + 2; i++) {
          temp.add(i.toString())
        }

       // console.log("heading into while")
      //  console.log(size)

        var index1 = Math.floor(Math.random()*size + 2);
        var index2 = Math.floor(Math.random()*size + 2);
       // console.log(index1)
       // console.log(index2)
        let emojiCounter = 0
        let itemCounter = 2
        
        // these may need to be strings?
        while (temp.size != 0) {
          if (!pairs.has(index1.toString()) && !pairs.has(index2.toString()) && index2 != index1) {
            pairs.set(index1.toString() , index2.toString());
            pairs.set(index2.toString(), index1.toString());

            temp.delete(index1.toString());
            temp.delete(index2.toString());

            numToEmoji.set(index1.toString(), emojis[emojiCounter]);
            numToEmoji.set(index2.toString(), emojis[emojiCounter]);

            // to render cards
            mapper.push(itemCounter.toString());
            itemCounter++;
            mapper.push(itemCounter.toString());
            itemCounter++;

            emojiCounter++;
          } else if (temp.size == 4) {
            let littleAr = new Array()
            temp.forEach((entry) => {
              littleAr.push(entry);
            })
            
            // handling the last four greatly improves run time for small requests
            pairs.set(littleAr[0].toString(), littleAr[1].toString());
            pairs.set(littleAr[1].toString(), littleAr[0].toString());
            pairs.set(littleAr[2].toString(), littleAr[3].toString());
            pairs.set(littleAr[3].toString(), littleAr[2].toString());

            temp.delete(littleAr[0].toString());
            temp.delete(littleAr[1].toString());
            temp.delete(littleAr[2].toString());
            temp.delete(littleAr[3].toString());

            numToEmoji.set(littleAr[0].toString(), emojis[emojiCounter]);
            numToEmoji.set(littleAr[1].toString(), emojis[emojiCounter++]);
            numToEmoji.set(littleAr[2].toString(), emojis[emojiCounter]);
            numToEmoji.set(littleAr[3].toString(), emojis[emojiCounter]);

            // to render cards
            mapper.push(itemCounter.toString());
            itemCounter++;
            mapper.push(itemCounter.toString());
            itemCounter++;
            mapper.push(itemCounter.toString());
            itemCounter++;
            mapper.push(itemCounter.toString());
            itemCounter++;
          }

          // generate new random numbers
          index1 = Math.floor(Math.random()*size*2 + 2);
          index2 = Math.floor(Math.random()*size*2 + 2);
        }
        startTime = Date.now()
        this.timer = setInterval(() => this.setState({
          time: Math.floor((Date.now() - startTime)/ 1000)}));

        this.setState({
          n2e: numToEmoji,
          checkMatch: false,
          studyingMap: true,
        });
      })
         
  }
  handleCard (e) {
    e.preventDefault();
    const {  studyingMap, checkMatch, clicks, score, time, } = this.state;
    let inputId = e.target.id;
    let points = 0;

    selected.add(inputId);
    noCheating.set(inputId, Date.now());
    
    // if player is studing board, do nothing
    if (studyingMap) {
      return
    }

    if (inputId === lastClick && checkMatch) {
      return
    }


    // check that user does not click a card already matched
      if (matched) {
        if (matched.has(inputId)) {
          return 
        }
      }

    //root.style.setProperty('--emoji-size-1', '7.5vw')
    let label = `--emoji-size-${inputId}`
    

    document.getElementById(inputId).style.setProperty(label, '3.5vw')
    showing.add(inputId)

    // Check to see if we have a match
    if (lastClick === pairs.get(inputId) && checkMatch) {
      matched.add(lastClick)
      matched.add(inputId)
      selected.delete(inputId)

      this.sleep(0)
        .then( () => {
        //alert("Congrats! You have identified a pair!");
          if (clicks > size*2) {
            points = 100 - (clicks - size*2);
          } else {
            points = 100;
          }
          this.setState({
            score: score + points,
            newPoints: points,
            success: true,
          })
      })

    } else if (checkMatch) {
      selected.delete(inputId)
      selected.delete(lastClick)
      this.setState({
        success: false,
      })

      this.sleep(500)
      .then( () => {
        this.sleep(1500)
        .then( () => {
            cards.forEach((card) => {
              if (!matched.has(card.id) && !selected.has(card.id)) {
                document.getElementById(card.id).style.setProperty(`--emoji-size-${card.id}`, '0vw')
                showing.delete(card.id)
            }
          })
        })
      })

    } else {
        lastClick = inputId
       // document.getElementById(inputId).style.setProperty(label, '3.5vw')
    }

    // toggle checkMatch
    let newCheckMatch = checkMatch ? false : true;

    // ensure all matched display properly
    if (matched.size > 0) {
      matched.forEach((card) => {
          document.getElementById(card).style.setProperty(`--emoji-size-${card}`, '3.5vw');
      })
    }
    let tempClicks = clicks;
    this.setState({
      studyingMap: studyingMap,
      checkMatch: newCheckMatch,
      score: score + points,
      clicks: ++tempClicks,
    });

    //lastClick = inputId this did not work do to timing issues with the promises above
  }
  
  // clicking 'start' resets the board 
  handleStart (e) {
    e.preventDefault();
    lastClick = null

    const { studyingMap, congrats } = this.state;

    if (congrats) {
       startTime = Date.now();
      this.timer = setInterval(() => this.setState({
        time: Math.floor((Date.now() - startTime)/ 1000)}));
    }

    let vw = '3.5vw';
    if (studyingMap) {
      vw = '0vw';
    }

    cards.forEach(input => {
      let label = `--emoji-size-${input.id}`
      document.getElementById(input.id).style.setProperty(label, vw)
    });


    // clear any matches, player is no longer studying
    this.setState({
      studyingMap: !studyingMap,
      score:  0,
      newPoints: 0,
      time: 0,
      clicks: 0,
      success: false,
      checkMatch: false,
      htmlWin: null,
      congrats: false,
    });

    matched.clear();
    selected.clear();
    noCheating.clear();
    posted = false;
    showing = new Set();
    lastSelected = null;

      if (!studyingMap ) {
        startTime = Date.now()
        this.sleep(500)
        .then (() => {
          cards.forEach(input => {
            let label = `--emoji-size-${input.id}`
            document.getElementById(input.id).style.setProperty(label, '3.5vw');
            })
        })
    }

    }

    handleWin () {
        const { score, time } = this.state;
        let writeWin;
        if (showAlert) {
          alert("Congrats! You found all of the pairs. See your results at the bottom of this page!");
          showAlert = false;
        }
          fetch('https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/DynamoDBOperations/DynamoDBManager/', {
            method: 'POST',
            body: JSON.stringify({
              operation: 'count',
              score: score,
              tableName: 'leaderboard',
            }),
          })
          .then((response) => {
              if (!response.ok) throw Error(response.statusText);
              return response.json();
            })
          .then((data) => {
            var rank = data.Count + 1;
            let rankString;
            if (rank == 1) {
              rankString = 'Congrats! You have the high score. No one';
            } else if (rank == 2) {
              rankString = '1 person';
            } else {
              rankString = `${rank - 1} people`;
            }
            writeWin = (<p class='congrats'> {rankString} scored higher than you! To view the top scores, click <Link to={{pathname: "/templates/leaderboard.html"}}>here</Link>.</p>)
             this.setState({
            htmlWin: writeWin,
            congrats: true,
          });
          return data;
          })
          .then((data) => {
            if (posted) {
              return
            }
            posted = true;
            fetch('https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/DynamoDBOperations/DynamoDBManager/', {
            method: 'POST',
            body: JSON.stringify({
              operation: 'create',
              score: score,
              id: Math.floor(Math.random()*1000000000).toString(),
              tableName: 'leaderboard',
              name: player,
              time: time,
              type: "static",
            }),
          })
          })
          .catch((error) => console.log(error));
    }
    
    // Define a sleep function so we can show emoji before recognizing a pair alert
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  render() {
    const { firstRun, emojis, studyingMap, score,
             clicks, time, success, newPoints, htmlWin, congrats } = this.state;
    //console.log("in render, top")
    if (!emojis) {
      return (<p>Loading...</p>)
    }
    var style1 = {
      '---column-numbergrid-template-columns': `${(size*2)/height}`
    };
    
    let checkBoot = firstRun;
    if (checkBoot) {
      this.setState({
              firstRun: false,
      })
    }
    if (firstRun){
      this.sleep(0)
        .then(() => {
          this.setState({
            firstRun: false,
          })
          cards = document.querySelectorAll('.item')
          if (cards) {
            cards.forEach(input => {
           // console.log("forEach!");
            // Might not need this first line (put handler in render)
            //input.addEventListener("click", this.handleCard);
            let label = `--emoji-size-${input.id}`;
            document.getElementById(input.id).style.setProperty(label, '3.5vw');
            })
          }
        });
    } else {
      document.getElementById(0).style.setProperty('--column-number', (size*2)/height)
    }
   // console.log("rendering!");
    var num = 2
    let startStop = studyingMap ? "start!" : "start over";
    outcome = matched.size/2 == size;

    if (outcome && !congrats) {
      clearInterval(this.timer);
      this.sleep(300).then(() => {this.handleWin()});
      showAlert = true;
    }

    return (
        <div className="play">
          <div class="input" id="1"><button class="button" onClick={this.handleStart}>{startStop}</button>
              <div class="stats" style={{'font-size': '18px'}}>
                <p>Clicks: {clicks}</p>
                <p>Matches: {matched.size/2}</p>
                <p>Points: {score}</p>
                <p>Time: {time}</p>
              </div>  
          </div>
          <div class="grid" id="0" style={style1}>
              {mapper.map((item) => (
                <ListBlocks 
                  key={item}
                  pic={item}
                  num2e={numToEmoji}
                  fxn={this.handleCard}
                />))}
          </div>
          <div class="pcongrats">
            {<Congrats
                key={num}
                go={success}
                points={newPoints}
                notPlaying={studyingMap}
                win={congrats}  
                time={time}
                score={score}
              />}
              {htmlWin}
          </div>  
            <div class="help" style={{"tab-size": "2"}}><p> Hey {player}, having trouble seeing emojis? Try doing a hard refresh of this page (on Chrome press together: cmd-shift-r).</p></div>
            {<BootUp
              key={num}
              go={checkBoot}
              sleep={this.sleep}
            />}
          </div>
    );
  }
}


// IMPORTANT!! These function names must start with a capital letter :)
ListBlocks.propTypes = {
  pic: PropTypes.node.isRequired,
  fxn: PropTypes.node.isRequired,
  num2e: PropTypes.node.isRequired,
};

BootUp.propTypes = {
  go: PropTypes.node.isRequired,
  sleep: PropTypes.node.isRequired,
};

Congrats.propTypes = {
  go: PropTypes.node.isRequired,
  points: PropTypes.node.isRequired,
  notPlaying: PropTypes.node.isRequired,
  win: PropTypes.node.isRequired,
  score: PropTypes.node.isRequired,
  time: PropTypes.node.isRequired,
}


export default Play;
