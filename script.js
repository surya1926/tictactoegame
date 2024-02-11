let boxes=document.querySelectorAll(".box");
let resetBoxes=document.querySelector(".reset-btn");
let newGame=document.querySelector(".newGame-btn");
let turn0=true;
let count=0

let Turn= document.querySelector(".Turn");
// let music = new Audio("./music/music.mp3")
let audioTurn = new Audio("./music/ting.mp3")
let gameOver = new Audio("./music/gameOver.mp3")
const win=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame=()=>{
   boxes.forEach(box=>{
   box.classList.remove("cp")
   box.classList.add("hov")
   })
    Turn.innerHTML=`<img src="./imgs/cross.png" alt="">` + "Turn.."
      turn0=true;
      gameOver.play();
      enableBoxes();
      count=0;
      
}
const New=()=>{
    resetBoxes.disabled=false;
    gameOver.play();
    resetGame()
    document.querySelector(".winMsg ").classList.remove("show")
    count=0;
}
const draw=()=>{
    document.querySelector(".winMsg ").classList.add("show")
    document.querySelector(".winner").innerHTML="Draw...!!"
  
    document.querySelector('.gif').src="./imgs/dull.gif"
}
Turn.innerHTML=`<img src="./imgs/cross.png" alt="">` + "Turn.."
boxes.forEach(box=>{
    
    box.addEventListener("click",()=>{
        audioTurn.play();
          if(turn0){
           Turn.innerHTML=`<img src="./imgs/circle.png" alt="">` + "Turn.."
            box.innerHTML=`<img src="./imgs/cross.png" alt="">`
            turn0=false;
            box.disabled=true;

          }
          else{
            Turn.innerHTML=`<img src="./imgs/cross.png" alt="">` + "Turn.."
            box.innerHTML=`<img src="./imgs/circle.png" alt="">`
            turn0=true;
            box.disabled=true;
          }
        //   box.disabled=true;
          count++;
         let isWinner=checkWinner();
         if(count==9 && !isWinner){
            setTimeout(draw, 800);
          
            Turn.innerHTML="Game Over..";
             disableBoxes();
        }
        // console.log(count);
    })
   
    
})
const disableBoxes=()=>{
    boxes.forEach(box=>{
        box.disabled=true;
    })
}
const enableBoxes=()=>{
boxes.forEach(box=>{
    box.disabled=false;
    box.innerText="";
})
}
// function every(){
//     boxes.forEach(box=>{
//         if((box.innerHTML==`<img src="./imgs/circle.png" alt="">`||box.innerHTML==`<img src="./imgs/cross.png" alt="">`)
//         &&(box.innerHTML!="")) 
//             cnt=cnt+1;
//     })
//     if(cnt==9)
//        return true;
// }
const  winner=()=>{
    document.querySelector('.gif').src="./imgs/excited.gif"
    document.querySelector(".winMsg ").classList.add("show")
   
}


const checkWinner=()=>{
    win.forEach(e=>{
        let cp1=boxes[e[0]]
        let cp2=boxes[e[1]]
        let cp3=boxes[e[2]]
        let pos1=boxes[e[0]].innerHTML;
        let pos2=boxes[e[1]].innerHTML;
        let pos3=boxes[e[2]].innerHTML;
        if(pos1!="" && pos2!="" &&pos3!="") {
            if(pos1===pos2 && pos2===pos3 && pos3===pos1)
            {
                boxes.forEach(box=>{
                    box.classList.remove("hov");
                })
                cp1.classList.add("cp")
                cp2.classList.add("cp")
                cp3.classList.add("cp")
                setTimeout(winner, 1500);
                resetBoxes.disabled=true;
                document.querySelector(".winner").innerHTML="Congratulations"+pos1+"Won..!"
                Turn.innerHTML="Game Over..";
                count=0;
            disableBoxes();
            gameOver.play();
           return true
            
            }
        }

    })
   
}
resetBoxes.addEventListener("click",resetGame)
newGame.addEventListener("click",New);