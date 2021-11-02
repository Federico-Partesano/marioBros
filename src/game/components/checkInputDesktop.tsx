
import { checkCollision } from "./detectionCollisions";
import { coordMario } from "./moveAndJumpMario";
import { audioMusic, floor,obstacleFloor } from "../resouces";
import { jump,resetJump } from "./moveAndJumpMario";
import { audioJump } from "../resouces";


export const HandleCheckJump = () => {
    if (
      checkCollision(
        coordMario,
        floor,
        "down"
      ) ||
      checkCollision(
        coordMario,
        obstacleFloor,
        "down"
      )
    ) {
    
      jump.state = true;

    }
  };

  export const HandleStopJump = () => {
    resetJump();
  };


