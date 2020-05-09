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

function ListBlocks ({ pic, fxn, num2e }) {
    let font = {'font-size': `var(--emoji-size-${pic})`}
    console.log('Three-burritos================')
    console.log(numToEmoji.get(pic))
    console.log(num2e)
    console.log(pic)
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

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMatch: false,
      studyingMap: true,
      firstRun: true,
      emojis: new Array(),
      n2e: new Map(),
    };
    //this.makeGrid = this.makeGrid.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleCard = this.handleCard.bind(this);
  }

  componentDidMount() {
    const { boardSize, userName } = this.props.location.state;
    player = userName;
    size = boardSize;
    /*
    fetch(' https://aw06fep7p2.execute-api.us-east-1.amazonaws.com/Prod/hello?pairs=10')
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log(data.height)
          console.log(data.message)
          /*
          this.setState({
            next: data.next,
            results: data.results,
            url: data.url,
          });
          
        })
        .catch((error) => console.log(error));
        */

        console.log(boardSize)
    const promises = Promise.all(
      [fetch(`https://uvyewae4k8.execute-api.us-east-1.amazonaws.com/Prod/leaderboard?pairs=${boardSize}`), fetch(`https://aw06fep7p2.execute-api.us-east-1.amazonaws.com/Prod/hello?pairs=${boardSize}`)]
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
        //pairs.set('3','9');
        //pairs.set('9','3');
        let temp = new Set();
        let i
        const { emojis } = this.state

        console.log("done fetching")
        console.log
        for (i = 2; i < boardSize*2 + 2; i++) {
          temp.add(i)
        }

        console.log("heading into while")
        console.log(boardSize)

        var index1 = Math.floor(Math.random()*boardSize + 2);
        var index2 = Math.floor(Math.random()*boardSize + 2);
        console.log(index1)
        console.log(index2)
        let emojiCounter = 0
        let itemCounter = 2
        
        // these may need to be strings?
        while (temp.size != 0) {
          if (!pairs.has(index1) && !pairs.has(index2) && index2 != index1) {
            pairs.set(index1, index2);
            pairs.set(index2, index1);

            temp.delete(index1);
            temp.delete(index2);

            numToEmoji.set(index1, emojis[emojiCounter]);
            numToEmoji.set(index2, emojis[emojiCounter]);

            // to render cards
            mapper.push(itemCounter++);
            mapper.push(itemCounter++);

            emojiCounter++;
          } else if (temp.size == 4) {
            let littleAr = new Array()
            temp.forEach((entry) => {
              littleAr.push(entry);
            })

            pairs.set(littleAr[0], littleAr[1]);
            pairs.set(littleAr[1], littleAr[0]);
            pairs.set(littleAr[2], littleAr[3]);
            pairs.set(littleAr[3], littleAr[2]);

            temp.delete(littleAr[0]);
            temp.delete(littleAr[1]);
            temp.delete(littleAr[2]);
            temp.delete(littleAr[3]);

            numToEmoji.set(littleAr[0], emojis[emojiCounter]);
            numToEmoji.set(littleAr[1], emojis[emojiCounter++]);
            numToEmoji.set(littleAr[2], emojis[emojiCounter]);
            numToEmoji.set(littleAr[3], emojis[emojiCounter]);

            // to render cards
            mapper.push(itemCounter++);
            mapper.push(itemCounter++);
            mapper.push(itemCounter++);
            mapper.push(itemCounter++);
          }

          index1 = Math.floor(Math.random()*boardSize*2 + 2);
          index2 = Math.floor(Math.random()*boardSize*2 + 2);
          console.log(temp)
          console.log(index1)
          console.log(index2)
          console.log(numToEmoji)
          console.log(pairs)
        }
        console.log(pairs)
        this.setState({
          n2e: numToEmoji,
          checkMatch: false,
          studyingMap: true,
        });
      })

    // renderGrid
    //makeGrid()

     //cards = document.querySelectorAll('.item')
    //const root = document.documentElement
    //root.style.setProperty('--emoji-size-1', '3.5vw')
    //root.style.setProperty('--emoji-size-2', '3.5vw')

    //as the value in the input changes, do something.
    //let elem = document.getElementById("1");

   //var checkMatch = false
    //var studyingMap = true

    //var pairs = new Map()
    //var matched = new Set()
    //var selected = new Set()

    //pairs.set('3','9')
    //pairs.set('9','3')
    //var lastClick

    //eventListener("click", handleInputChange)


    console.log("ctor");
         

      
    // root.style.setProperty('--emoji-size-2', '0vw');
      //root.style.font-size('0vw')

  }
  handleCard (e) {
    e.preventDefault();
    const {  studyingMap, checkMatch, } = this.state;
    let inputId = e.target.id;
    selected.add(parseInt(inputId));

    
    // if player is studing board, do nothing
    if (studyingMap) {
      return
    }

    if (parseInt(inputId) === parseInt(lastClick) && checkMatch) {
      return
    }


    // check that user does not click a card already matched
      if (matched) {
        if (matched.has(parseInt(inputId))) {
          return
        }
      }

    //root.style.setProperty('--emoji-size-1', '7.5vw')
    let label = `--emoji-size-${inputId}`

    //document.getElementById(inputId).style.setProperty(label, '3.5vw')

    // Check to see if 
    if (parseInt(lastClick) === pairs.get(parseInt(inputId)) && checkMatch) {
      console.log(lastClick)
      console.log(pairs.get(inputId))
      console.log(inputId)
      matched.add(parseInt(lastClick))
      matched.add(parseInt(inputId))
      selected.delete(parseInt(inputId))

      this.sleep(500)
        .then( () => {
        alert("Congrats! You have identified a pair!")
        })

    } else if (checkMatch) {
      selected.delete(parseInt(inputId))
      selected.delete(parseInt(inputId))

      this.sleep(500)
      .then( () => {
      alert("Oops! These are not a match!")
      })
      .then( () => {
        this.sleep(1500)
        .then( () => {
            cards.forEach((card) => {
              if (!matched.has(parseInt(card.id)) && !selected.has(parseInt(card.id))) {
               // document.getElementById(card.id).style.setProperty(`--emoji-size-${card.id}`, '0vw')
            }
          })
          //let oldLabel = `--emoji-size-${lastClick}`
          //document.getElementById(inputId).style.setProperty(label, '0vw')
          //document.getElementById(lastClick).style.setProperty(oldLabel, '0vw')
          //console.log(oldLabel)
        })
      })

    } else {
        lastClick = inputId
        //document.getElementById(inputId).style.setProperty(label, '3.5vw')
    }

    // toggle checkMatch
    let newCheckMatch = checkMatch ? false : true;
    console.log(inputId);
    console.log(lastClick);
    console.log(pairs.get(inputId));
    console.log(pairs);

    // ensure all matched display properly
    if (matched.size > 0) {
      matched.forEach((card) => {
         // document.getElementById(card).style.setProperty(`--emoji-size-${card}`, '3.5vw');
      })
    }

    this.setState({
      studyingMap: studyingMap,
      checkMatch: newCheckMatch,
    });

    //lastClick = inputId this did not work do to timing issues with the promises above
  }



  
  // clicking 'start' resets the board 
  handleStart (e) {
    e.preventDefault();
    cards.forEach(input => {
      let label = `--emoji-size-${input.id}`
      //document.getElementById(input.id).style.setProperty(label, '0vw')
    });


    // clear any matches, player is no longer studying
    this.setState({
      studyingMap: false,
    });

    matched.clear();

    }
    
    // Define a sleep function so we can show emoji before recognizing a pair alert
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  render() {
    const { firstRun, emojis } = this.state;
    console.log("in render, top")
    if (!emojis) {
      return (null)
    }
    var style1 = {
      '---column-numbergrid-template-columns': `${(size*2)/height}`
    };


    var style3 = {
      'font-size': 'var(--emoji-size-4)'
    };

    var style4 = {
      'font-size': 'var(--emoji-size-5)'
    };

    var style5 = {
      'font-size': 'var(--emoji-size-6)'
    };

    var style6 = {
      'font-size': 'var(--emoji-size-7)'
    };

    var style7 = {
      'font-size': 'var(--emoji-size-8)'
    };

    var style8 = {
      'font-size': 'var(--emoji-size-9)'
    };

    var style9 = {
      'font-size': 'var(--emoji-size-10)'
    };

    var style10 = {
      'font-size': 'var(--emoji-size-11)'
    };

    var style11 = {
      'font-size': 'var(--emoji-size-12)'
    };

    var style12 = {
      'font-size': 'var(--emoji-size-13)'
    };
    var style13 = {
      'font-size': 'var(--emoji-size-14)'
    };
    var style14 = {
      'font-size': 'var(--emoji-size-15)'
    };
    var style15 = {
      'font-size': 'var(--emoji-size-16)'
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
            //document.getElementById(input.id).style.setProperty(label, '3.5vw');
            })
          }
        });
    } else {
      document.getElementById(0).style.setProperty('--column-number', (size*2)/height)
    }
    console.log("rendering!");
    var num = 2


    return (
        <div className="play">
          <div class="input" id="1"><button class="button" onClick={this.handleStart}>start!</button></div>
          <div class="grid" id="0" style={style1}>
              {mapper.map((item) => (
                <ListBlocks 
                  key={item}
                  pic={item}
                  num2e={numToEmoji}
                  fxn={this.handleCard}
                />))}
          </div>
            <div class="help"><p>Hey {player}, having trouble seeing emojis? Try doing a hard refresh of this page (on Chrome press together: cmd-shift-r).</p></div>
            {<BootUp key={num} go={checkBoot} sleep={this.sleep}/>}
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

export default Play;

































/*

const cards = document.querySelectorAll('.item')
const root = document.documentElement
//root.style.setProperty('--emoji-size-1', '3.5vw')
//root.style.setProperty('--emoji-size-2', '3.5vw')

//as the value in the input changes, do something.
var elem = document.getElementById("1")

var checkMatch = false
var studyingMap = true

var pairs = new Map()
var matched = new Set()
var selected = new Set()

pairs.set('3','9')
pairs.set('9','3')
var lastClick

elem.addEventListener("click", handleInputChange)

cards.forEach(input => {
    input.addEventListener("click", handleCard)
    let label = `--emoji-size-${input.id}`
    document.getElementById(input.id).style.setProperty(label, '3.5vw')
})


// clicking 'start' resets the board
function handleInputChange (e) {
  //let value = e.target.value
  //let inputId = e.target.parentNode.id
  cards.forEach(input => {
    let label = `--emoji-size-${input.id}`
    document.getElementById(input.id).style.setProperty(label, '0vw')
  })
  
  // clear matches
  matched.clear()

  // player is playing
  studyingMap = false
  
 // root.style.setProperty('--emoji-size-2', '0vw');
  //root.style.font-size('0vw')

}

function handleCard (e) {

  let inputId = e.target.id;
  selected.add(inputId)
  
  // if player is studing board, do nothing
  if (studyingMap) {
    return
  }

  if (inputId === lastClick && checkMatch) {
    return
  }


  // check that user does not click a card already matched
  if (matched.has(inputId)) {
    return
  }

  //root.style.setProperty('--emoji-size-1', '7.5vw')
  let label = `--emoji-size-${inputId}`

  document.getElementById(inputId).style.setProperty(label, '3.5vw')

  // Check to see if 
  if (lastClick === pairs.get(inputId) && checkMatch) {
    matched.add(lastClick)
    matched.add(inputId)
    selected.delete(inputId)

    sleep(500)
      .then( () => {
      alert("Congrats! You have identified a pair!")
      })

  } else if (checkMatch) {
    selected.delete(inputId)
    selected.delete(lastClick)
    sleep(500)
    .then( () => {
    alert("Oops! These are not a match!")
    })
    .then( () => {
      sleep(1500)
      .then( () => {
        cards.forEach((card) => {
          if (!matched.has(card.id) && !selected.has(card.id)) {
            document.getElementById(card.id).style.setProperty(`--emoji-size-${card.id}`, '0vw')
        }
      }
      )
        //let oldLabel = `--emoji-size-${lastClick}`
        //document.getElementById(inputId).style.setProperty(label, '0vw')
        //document.getElementById(lastClick).style.setProperty(oldLabel, '0vw')
        //console.log(oldLabel)
      })
    })

  } else {
      lastClick = inputId
      //document.getElementById(inputId).style.setProperty(label, '3.5vw')
  }

  // toggle checkMatch
  checkMatch = checkMatch ? false : true
  console.log(inputId)
  console.log(lastClick)
  console.log(pairs.get(inputId))
  console.log(pairs)

  // ensure all matched display properly
  matched.forEach((card) => {
    document.getElementById(card.id).style.setProperty(`--emoji-size-${card.id}`, '3.5vw')
  })

  //lastClick = inputId this did not work do to timing issues with the promises above
}

// Define a sleep function so we can show emoji before recognizing a pair alert
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/
