import { Player, Jump} from "./interfaces";
import { directionMario } from "../game";
import { speedUp } from "./checkInputMobile";
import { directionsMario, obstacleFloor,floor, BLOCK,gravity} from "../resouces";
import { checkCollision } from "./detectionCollisions";
import { setStartAnimation } from "../animations/animationWallJumpMario";


let yVal = 0;  
let velocity = 0; 
let mass = 10; 
let accel = mass * 0.1; 
export let coordMario: Player = { x: 0, y: BLOCK * 6, vel: 0 };
export let jump: Jump = { state: false, count: 0 };
export let speedM: number = 0;




export const moveMario = () => {
    switch (directionMario) {
      case directionsMario.left:
        if (
          !checkCollision(
            coordMario,
            obstacleFloor,
            "left",
          ) &&
          !checkCollision(
            coordMario,
            floor,
            "left"
          )
        ) {
          coordMario.x -= speedM;
        }
        break;
      case directionsMario.right:
        if (
          !checkCollision(
            coordMario,
            obstacleFloor,
            "right"
          ) &&
          !checkCollision(
            coordMario,
            floor,
            "right"
          )
        ) {
          coordMario.x += speedM;
        }
        break;
      case directionsMario.down:
        coordMario.y += speedM;
        break;
      case directionsMario.up:
        !checkCollision(
          coordMario,

          obstacleFloor,

          "up"
        ) && (coordMario.y -= 2);
        break;
    }

    if (
      !checkCollision(
        coordMario,
        floor,
        "down"
      ) &&
      !checkCollision(
        coordMario,
        obstacleFloor,
        "down"
      )
    ) {
      if (jump.state) {
        if (
          !checkCollision(
            coordMario,
            floor,
            "up"
          ) &&
          !checkCollision(
            coordMario,
            obstacleFloor,
            "up"
          )
        ) {
          coordMario.y--;
        }
        jump.count++;
      } else {
        coordMario.y++;
      }
      if (jump.count > 30 || checkCollision(coordMario,obstacleFloor,"up")) {
        if(checkCollision(coordMario,obstacleFloor,"up")){
        let wall: any = checkCollision(coordMario,obstacleFloor,"up")!;
        wall.type !=="emptyBrick" &&  setStartAnimation(true, wall!);
        if(wall.type === "specialBrick") { wall!.type = "emptyBrick"};
        }
        jump = { state: false, count: 0 };
      }
    } else {
      if (!(jump.state && jump.count === 0)) {
        jump = { state: false, count: 0 };
      } else if (jump.state && jump.count === 0) {
        if (
          !checkCollision(
            coordMario,
            floor,
            "up"
          ) &&
          !checkCollision(
            coordMario,
            obstacleFloor,
            "up"
          )
        ) {
          coordMario.y--;
        }
      }
    }
  };


export   const checkSpeedMario = () => {
    if (speedUp) {
      if (speedM < 2) {
        speedM += gravity;
      }
    } else {
      speedM = 0;
    }
  };

export const   resetJump = ()=>{
    jump = { state: false, count: 0 };
}