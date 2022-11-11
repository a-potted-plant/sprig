/*
@title: speedy snake
@author: ItsAStarryKnight
*/

//Classic snake game with a twist!
//Controls: a to go left, w to go up, s to go down, d to go right, l to restart
//To try hard mode, press j - to go back to easy mode, press k
//If you eat the apple, your score increases (and so does the speed!!)
//If you hit the wall, the game ends
//Instead of having the snake increase in size, the snake will increase in speed,
//making it much more difficult to maneuver!! See how fast you can go!

const player = "p";
const wall="w";
const apple="a";

setLegend(
  [ player, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ wall, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [apple, bitmap `
.....44..44.....
......4444......
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
);

setSolids([]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwwwwww  
wwwwwwwwwwwwwwwwwww  
wwwwwwwwwwwwwwwwwww  
wwwwwwwwwwwwwwwwwww  
wwwwwwwwwwwwwwwwwww  
wwwwwwwwwwwwwwwwwww 
w.................w 
w.................w
w.................w
w.................w
w........p........w
w.................w
w.................w
w.................w
w.................w
w.................w
w........a........w
w.................w
w.................w
w.................w
w.................w
w.................w
w.................w
wwwwwwwwwwwwwwwwwww
`,
  //17x17 grid of open space, not including walls
];

let score=0;
addText("score: "+score, 
  {x:4, 
   y:2, 
   color: color`2` })
addText("Speedy Snake", 
  {x:4, 
   y:1, 
   color: color`4` })

setMap(levels[level]);

var g=null;
var dir="d";
var speed=150;
var x=3;
var mode="easy";

onInput("s", () => {
  dir="d";
});

onInput("w", () => {
  dir="u";
});

onInput("a", () => {
  dir="l";
});

onInput("d", () => {
  dir="r";
});
onInput("l", () => {
  resetGame();
});
onInput("j", () => {
  mode="hard";
  resetGame();
});
onInput("k", () => {
  mode="easy";
  resetGame();
}); 

const appleTune = tune`
283.0188679245283,
283.0188679245283: f5~283.0188679245283,
8490.566037735849`
const wallTune = tune `
145.63106796116506,
145.63106796116506: c5~145.63106796116506,
145.63106796116506: c5~145.63106796116506,
145.63106796116506: b4~145.63106796116506,
145.63106796116506: b4~145.63106796116506,
145.63106796116506: a4~145.63106796116506,
145.63106796116506: a4~145.63106796116506,
3640.7766990291266`

function resetApple(){
  playTune(appleTune);
  getFirst(apple).x=Math.floor(Math.random()*16)+1;
  getFirst(apple).y=Math.floor(Math.random()*15)+6;
  score++;
  addText("score: "+score, 
          {x:4, 
           y:2, 
           color: color`2` })
  if(mode=="easy"){
    x=3;
  }
  else if(mode=="hard"){
    x=5;
  }
  speed-=x;
  setI();
}

function gameOver(){
  clearInterval(g);
  playTune(wallTune);
  if(dir=="d"){
    getFirst(player).y--;
  } else if(dir=="u"){
    getFirst(player).y++;
  } else if(dir=="r"){
    getFirst(player).x--;
  } else if(dir=="l"){
    getFirst(player).x++;
  }
  addText("Game Over!", 
  {x:5, 
   y:10, 
   color: color`3` })
  addText("L=restart", 
  {x:6, 
   y:12, 
   color: color`3` })
}

function checkState(){
  var arr = getTile(getFirst(player).x,getFirst(player).y)
  if(arr.length>1){
    if(arr[1].type=="a"){
      resetApple();
    }
  } else{
    console.log(getFirst(player).y, getFirst(player).x)
    if(dir=="d"){
      if(getFirst(player).y++==22){
        gameOver();
      }
    } else if(dir=="u"){
      if(getFirst(player).y--==6){
        gameOver();
      }
    } else if(dir=="r"){
      if(getFirst(player).x++==17){
        gameOver();
      }
    } else if(dir=="l"){
      if(getFirst(player).x--==1){
        gameOver();
      }
    }
  }
}

function resetGame(){
  score=0;
  speed=150;
  clearTile(getFirst(player).x, getFirst(player).y);
  clearTile(getFirst(apple).x, getFirst(apple).y);
  addSprite(9,10,player);
  addSprite(9,16,apple);
  clearText();
  addText("score: "+score, 
    {x:4, 
     y:2, 
     color: color`2` })
  if(mode=="easy"){
    addText("Speedy Snake", 
    {x:4, 
     y:1, 
     color: color`4` })
  }
  if(mode=="hard"){
    addText("Speedy Snake", 
    {x:4, 
     y:1, 
     color: color`9` })
  }
  dir="d";
  setI();
}

function setI(){
  clearInterval(g);
  g=window.setInterval(checkState, speed);
}
setI();