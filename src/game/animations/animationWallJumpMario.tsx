

import { currentTime } from "../game";

const speedAnimationTimeInMillies = 15;
let timeForAnimationMario: number = 0;


let startAnimation: any = {status: false, wall: {}, count: 0};

export const setStartAnimation = (choice: boolean, wall: any) =>{
   
    startAnimation = {status: choice, wall: wall, count: 0, state: "start" };
}

 export  const animationWallJumpMario = () => {
        
      if ((currentTime - timeForAnimationMario > speedAnimationTimeInMillies) && startAnimation.status ) {
     


        if(startAnimation.count === 5){
           startAnimation.state = "end"
        } else if(startAnimation.count ===10){
            startAnimation = {status: false, wall: {}, count: 0, state: "start" };
        }

        if(startAnimation.state === "end"){
            startAnimation.wall.y+= 0.1;
        } else{
            startAnimation.wall.y-= 0.1;
        }
       
        startAnimation.count++;
        timeForAnimationMario = currentTime;
      }
    }