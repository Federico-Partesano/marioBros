import { checkCollision } from "./detectionCollisions";
import { coordMario } from "./moveAndJumpMario";
import { obstacleFloor, floor, startAudioJump } from "../resouces";
import { jump } from "./moveAndJumpMario";
import { directionsMario } from "../resouces";
import { changeDirectionForMobile } from "../game";
import { resetJump } from "./moveAndJumpMario";
import { audioJump } from "../resouces";

export let speedUp: boolean = false;
export const speedUpUp = () => speedUp = true;
export const speedUpDown = () => speedUp = false;


export const HandleTouchStart = (e: any, setTouchStart: any,setInteriorCircle: any, touchStart: any) => {
    switch (e.touches.length) {
      case 1:
        if (e.touches[0].clientX < window.innerWidth / 2) {
          speedUp = true;
          setTouchStart({
            xAbsolute: e.touches[0],
            posRelative: {
              x: e.touches[0].clientX - e.target.offsetLeft,
              y: e.touches[0].clientY - e.target.offsetTop,
              offSet: { x: e.target.offsetWidth, y: e.target.offsetHeight },
            },
          });
          setInteriorCircle({
            x: e.touches[0].clientX - e.target.offsetLeft,
            y: e.touches[0].clientY - e.target.offsetTop,
          });
        } else {
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
            console.log("jump");
            jump.state = true;
           startAudioJump();
          }
        }
        break;
      case 2:
        if (e.touches[0].clientX < window.innerWidth / 2) {
          speedUp = true;
          !touchStart &&
            setTouchStart({
              xAbsolute: e.touches[0],
              posRelative: {
                x: e.touches[0].clientX - e.target.offsetLeft,
                y: e.touches[0].clientY - e.target.offsetTop,
                offSet: { x: e.target.offsetWidth, y: e.target.offsetHeight },
              },
            });
          setInteriorCircle({
            x: e.touches[0].clientX - e.target.offsetLeft,
            y: e.touches[0].clientY - e.target.offsetTop,
          });
        }
        if (e.touches[1].clientX > window.innerWidth / 2) {
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
        }

        break;
      default:
        break;
    }
  };

  export   const HandleTouchMove = (e: any,setInteriorCircle: any, touchStart: any,prevoiusDirectionMario: any,directionMario: any) => {
    setInteriorCircle({
      x: e.touches[0].clientX - e.target.offsetLeft,
      y: e.touches[0].clientY - e.target.offsetTop,
    });
    if (touchStart !== null) {
      if (touchStart.xAbsolute.clientX! < e.touches[0].clientX) {
      changeDirectionForMobile(directionsMario.left);
      } else {
        prevoiusDirectionMario = directionMario;
        changeDirectionForMobile(directionsMario.right);
      }
    }
  };

  export const HandleTouchEnd = (e: any, setInteriorCircle: any,setTouchStart: any) => {
    e.touches.length === 0 && setInteriorCircle(null);
        resetJump();
    e.touches.length === 0 && (changeDirectionForMobile("prevEgualDirection"));
    e.touches.length === 0 && (changeDirectionForMobile("none"));
    e.touches.length === 0 && setTouchStart(null);
    e.touches.length === 0 && speedUpUp();
  };

