import React, { useState, useRef, MutableRefObject } from "react";
import { coordMario } from "./components/moveAndJumpMario";
import {checkCollision } from "./components/detectionCollisions";
import { HandleCheckJump, HandleStopJump } from "./components/checkInputDesktop";
import { drawCanvas } from "./components/drawCanvas";
import { jump, moveMario, checkSpeedMario} from "./components/moveAndJumpMario";
import { speedUpUp, speedUpDown, HandleTouchStart, HandleTouchMove, HandleTouchEnd } from "./components/checkInputMobile";
import { animationWallJumpMario } from "./animations/animationWallJumpMario";
import { gravityMushrooms, moveMushRoom } from "./enemies/mushRooms";
import {
  obstacleFloor,
  floor,
speedAnimationTimeInMillies,
  spritesMario,
  directionsMario,
imageMap,
enemyMushRoom,
startAudio,
audioMusic,
} from "./resouces";
import { useEffect, useLayoutEffect } from "react";

import "../css/Game.css";
import { animationMushRooms } from "./animations/animationMushRooms";
declare module "*.png";
export let currentTime = 0;
let lastCalledTime = 0;
let timeForAnimationMario = 0;

export let directionMario = directionsMario.none;
export let prevoiusDirectionMario = directionsMario.none;

let countForAnimationMario = 0;

export const changeDirectionForMobile = (direction: directionsMario | "none" | "prevEgualDirection") =>{
  switch(direction){
    case directionsMario.right:
      prevoiusDirectionMario = directionMario;
      directionMario = directionsMario.right;
      break;
      case directionsMario.left:
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.left;
        break;
        case "prevEgualDirection":
          return prevoiusDirectionMario = directionMario
          case "none":
          return directionMario = directionsMario.none
          
  }
}

const useFrameLoop = (callback: Function) => {
  const requestID: MutableRefObject<undefined> | MutableRefObject<number> =
    useRef();
  const previousTime = useRef();
  const loop = (time: any) => {
    if (previousTime.current !== undefined) {
      // const deltaTime = time - previousTime.current;
      callback(time);
    }
    function requestAnimFrame() {
      if (!lastCalledTime) {
        lastCalledTime = Date.now();

        return;
      }
      let delta = (Date.now() - lastCalledTime) / 1000;
      lastCalledTime = Date.now();
      // eslint-disable-next-line
 
    }
    requestAnimFrame();
    previousTime.current = time;
    currentTime = time;

    requestID.current = requestAnimationFrame(loop);
  };
  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);
    return () => {
      callback(undefined);
    };
    // eslint-disable-next-line
  }, []);
};

const Canvas = () => {
  const canvasRef:
    | MutableRefObject<null>
    | MutableRefObject<HTMLCanvasElement> = useRef(null);
  // eslint-disable-next-line
  const [deltaTime, setDeltaTime] = useState<number>(1);
  const [animationSpriteMario, setAnimationSpriteMario] = useState(
    spritesMario.stop.right
  );


  const [touchStart, setTouchStart] = useState<any>(null);
  const [interiorCircle, setInteriorCircle] = useState<any>(null);
  const [tick, setTick] = useState(0);
  //const [tick2, setTick2] = useState();
  
  useFrameLoop((timestamp: number | undefined) => {
    if (timestamp === undefined || tick === undefined || !canvasRef.current)
      return;

    setTick(currentTime);
  });

  useEffect(
    () => {
      if (!imageMap.src || !canvasRef.current || currentTime === undefined)
        return;

      render();
    },
    [tick]
  );
  useLayoutEffect(() => {
    

     startAudio();

   
  
  }, [audioMusic])

  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown, true);
    window.addEventListener("keyup", checkKeyUp, true);

    return () => {
      window.removeEventListener("keydown", checkKeyDown, true);
      window.removeEventListener("keyup", checkKeyUp, true);
    };
  });

  function checkKeyDown(e: any) {
    var code = e.keyCode;
    speedUpUp();
    //Up arrow pressed
    switch (code) {
      case 65:
    return  changeDirectionForMobile(directionsMario.right)
      case 68:
        return changeDirectionForMobile(directionsMario.left)
      default:
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.none;
        break;
    }
  }

  function checkKeyUp() {
    directionMario = directionsMario.none;
    speedUpDown();
  }



  const checkAnimationMario = () => {
    if (prevoiusDirectionMario === directionMario) {
      if (currentTime - timeForAnimationMario > speedAnimationTimeInMillies) {
        countForAnimationMario =
          countForAnimationMario + 1 > spritesMario.runLeft.length - 1
            ? (countForAnimationMario = 0)
            : countForAnimationMario + 1;
        timeForAnimationMario = currentTime;
      }
    }
    switch (directionMario) {
      case directionsMario.right:
        setAnimationSpriteMario(spritesMario.runLeft[countForAnimationMario]);

        break;
      case directionsMario.left:
        setAnimationSpriteMario(spritesMario.runRight[countForAnimationMario]);
        break;
      case directionsMario.none:
        setAnimationSpriteMario(spritesMario.stop.right);
        break;
      default:
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
      if (directionMario === directionsMario.right) {
        jump.state ? setAnimationSpriteMario(spritesMario.jumpRight[0]) : setAnimationSpriteMario(spritesMario.jumpRight[1]);
      } else {
        jump.state ? setAnimationSpriteMario(spritesMario.jumpLeft[0]) : setAnimationSpriteMario(spritesMario.jumpLeft[1]);
      }
    }
  };


  function fullscreen(el: any) {
    if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen();
    }
  }

  const render = () => {
    setDeltaTime(currentTime - tick);

    const canvas:HTMLCanvasElement  = canvasRef.current!;
    // fullscreen(canvas);

    const ctx = canvas.getContext("2d");

              //    imported method draw Canvas
   drawCanvas(ctx,canvas,touchStart,interiorCircle,animationSpriteMario,coordMario);
   animationMushRooms();
   moveMushRoom();
  gravityMushrooms();
    moveMario();
    checkAnimationMario();
    checkSpeedMario();
    animationWallJumpMario();
  };
  return (
    <canvas
      id="canvas"
      onMouseDown={HandleCheckJump}
      onMouseUp={HandleStopJump}
      onTouchStart={(e) =>HandleTouchStart(e,setTouchStart,setInteriorCircle,touchStart)}
      onTouchMove={(e) => HandleTouchMove(e,setInteriorCircle,touchStart,prevoiusDirectionMario,directionMario)}
      onTouchEnd={(e) => HandleTouchEnd(e,setInteriorCircle,setTouchStart)}
      className="canvas"
      ref={canvasRef}
    />
  );
};
// <img src={imm} alt="ciao" width="2600" height="200" />
export default Canvas;
