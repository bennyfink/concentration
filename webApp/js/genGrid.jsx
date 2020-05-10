import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
var pairs = new Map();
var numToEmoji = new Map();
var mapper = new Array();
var matched = new Set();
var selected = new Set();
var cards;
var lastClick;
var player;
var height;
var size;
var setupDone = false;
var startTime;

function ListBlocks ({ pic, fxn, num2e }) {
    let font = {'font-size': `var(--emoji-size-${pic})`}
    if (pic == size*2+1) {
      setupDone = true;
    }
    return (<div class="item" id={pic} onClick={fxn}>
                    <div class="emoji" id={pic} style={font}>{num2e.get(pic)}</div>
            </div>);
}

function BootUp ({ go, sleep }) {
  if (!setupDone && !go) {
  console.log('Go!')
  document.getElementById(0).style.setProperty('--column-number', (size*2)/height)
  sleep(0)
        .then(() => {
        cards = document.querySelectorAll(".emoji")
        if (cards && setupDone) {
          cards.forEach(input => {
          console.log("forEach!");
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
    return (<div class="congrats">Press start to play!</div>)
  } else if (win) {
    return (<div class="congrats">Congrats {player}! You finished in {time} seconds with a score of {score}. You can play this board again or click on one of the links below.</div>)
    // Display link to post to leaderboard here.
  } else {
    return (<div class="congrats">Try to identify a pair of emojis!</div>)
  }
}

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: new Array(),
      n2e: new Map(),
      checkMatch: false,
      studyingMap: true,
      firstRun: true,
      score: 0,
      newPoints: 0,
      success: false,
      clicks: 0,
      time: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleCard = this.handleCard.bind(this);
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
    const promises = Promise.all(
      [fetch(`https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/leaderboard?pairs=${size}`),
       fetch(`https://aw06fep7p2.execute-api.us-east-1.amazonaws.com/Prod/hello?pairs=${size}`)]
    )

    .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2]) => {
        console.log(res1.message)
        console.log(res2.message)
        height = res2.message
        this.setState({
          emojis: res1.message,
          });
        

          console.log(this.state.emojis)
          console.log(this.state.height)
        
        // init pairs
        let temp = new Set();
        let i
        const { emojis } = this.state

        console.log("done fetching")
        console.log
        for (i = 2; i < size*2 + 2; i++) {
          temp.add(i.toString())
        }

        console.log("heading into while")
        console.log(size)

        var index1 = Math.floor(Math.random()*size + 2);
        var index2 = Math.floor(Math.random()*size + 2);
        console.log(index1)
        console.log(index2)
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

        this.setState({
          n2e: numToEmoji,
          checkMatch: false,
          studyingMap: true,
        });
      })
         
  }
  handleCard (e) {
    e.preventDefault();
    const {  studyingMap, checkMatch, clicks, score } = this.state;
    let inputId = e.target.id;
    let foundPair = false;
    let points = 0;

    selected.add(inputId);
    
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

    // Check to see if 
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
    console.log(inputId);
    console.log(lastClick);
    console.log(pairs.get(inputId));
    console.log(pairs);
    console.log("============================")
    console.log(cards)
    console.log(selected)
    console.log(matched)

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

    const { studyingMap } = this.state;

    let vw = '3.5vw';
    startTime = Date.now();
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
    });

    matched.clear();
    selected.clear();

    if (studyingMap) {
      this.timer = setInterval(() => this.setState({
      time: Math.floor((Date.now() - startTime)/ 1000)
    }), 1000);
    } else {
      clearInterval(this.timer)
      this.sleep(500)
      .then (() => {
        cards.forEach(input => {
          let label = `--emoji-size-${input.id}`
          document.getElementById(input.id).style.setProperty(label, '3.5vw');
          })
      })
    }

    }
    
    // Define a sleep function so we can show emoji before recognizing a pair alert
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  render() {
    const { firstRun, emojis, studyingMap, score,
             clicks, time, success, newPoints, } = this.state;
    console.log("in render, top")
    if (!emojis) {
      return (null)
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
            console.log("forEach!");
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
    console.log("rendering!");
    var num = 2
    let startStop = studyingMap ? "start!" : "start over";
    let outcome = matched.size/2 == size;

    if (outcome) {
      clearInterval(this.timer);
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
                win={outcome}  
                time={time}
                score={score}
              />}
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