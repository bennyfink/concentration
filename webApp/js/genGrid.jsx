import React from 'react';
import { Link } from 'react-router-dom';
var pairs = new Map();
var matched = new Set();
var selected = new Set();
var cards;
var lastClick;

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMatch: false,
      studyingMap: true,
      firstRun: true,
    };
    //this.makeGrid = this.makeGrid.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleCard = this.handleCard.bind(this);
  }

  componentDidMount() {
    
    // init pairs
    pairs.set('3','9');
    pairs.set('9','3');

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
      console.log(lastClick)
      console.log(pairs.get(inputId))
      console.log(inputId)
      matched.add(lastClick)
      matched.add(inputId)
      selected.delete(inputId)

      this.sleep(500)
        .then( () => {
        alert("Congrats! You have identified a pair!")
        })

    } else if (checkMatch) {
      selected.delete(inputId)
      selected.delete(lastClick)

      this.sleep(500)
      .then( () => {
      alert("Oops! These are not a match!")
      })
      .then( () => {
        this.sleep(1500)
        .then( () => {
            cards.forEach((card) => {
              if (!matched.has(card.id) && !selected.has(card.id)) {
                document.getElementById(card.id).style.setProperty(`--emoji-size-${card.id}`, '0vw')
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
          document.getElementById(card).style.setProperty(`--emoji-size-${card}`, '3.5vw');
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
      document.getElementById(input.id).style.setProperty(label, '0vw')
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
    const { firstRun, } = this.state;
    var style1 = {
      'font-size': 'var(--emoji-size-2)'
    };

    var style2 = {
      'font-size': 'var(--emoji-size-3)'
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
    }
    console.log("rendering!");
    return (
        <div className="play">
          <div class="input" id="1"><button class="button" onClick={this.handleStart}>start!</button></div>
          <div class="grid">
              <div class="item" id="2" onClick={this.handleCard}><div class="emoji" style={style1} id="2">🐑</div></div>
              <div class="item" id="3" onClick={this.handleCard}><div class="emoji" style={style2} id="3">🐑</div></div>
              <div class="item" id="4" onClick={this.handleCard}><div class="emoji" style={style3} id="4">🐑</div></div>
              <div class="item" id="5" onClick={this.handleCard}><div class="emoji" style={style4} id="5">🐑</div></div>
              <div class="item" id="6" onClick={this.handleCard}><div class="emoji" style={style5} id="6">🐑</div></div>
              <div class="item" id="7" onClick={this.handleCard}><div class="emoji" style={style6} id="7">🐑</div></div>
              <div class="item" id="8" onClick={this.handleCard}><div class="emoji" style={style7} id="8">🐑</div></div>
              <div class="item" id="9" onClick={this.handleCard}><div class="emoji" style={style8} id="9">🐑</div></div>
              <div class="item" id="10" onClick={this.handleCard}><div class="emoji" style={style9} id="10">🐑</div></div>
              <div class="item" id="11" onClick={this.handleCard}><div class="emoji" style={style10} id="11">🐑</div></div>
              <div class="item" id="12" onClick={this.handleCard}><div class="emoji" style={style11} id="12">🐑</div></div>
              <div class="item" id="13" onClick={this.handleCard}><div class="emoji" style={style12} id="13">🐑</div></div>
              <div class="item" id="14" onClick={this.handleCard}><div class="emoji" style={style13} id="14">🐑</div></div>
              <div class="item" id="15" onClick={this.handleCard}><div class="emoji" style={style14} id="15">🐑</div></div>
              <div class="item" id="16" onClick={this.handleCard}><div class="emoji" style={style15} id="16">🐑</div></div>
            </div>
          </div>
    );
  }
}


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
