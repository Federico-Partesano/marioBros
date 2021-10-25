import React, { useState, useRef, MutableRefObject } from "react";
import imm from "../images/map.png";
import im2 from "../images/wall.png";
import im3 from "../images/sprites.gif";
import {
  obstacleFloor,
  floor,
  Brick,
  Player,
  // eslint-disable-next-line
  intersect,
  spritesMario,
  Jump,
  checkCollision,
} from "./resouces";
import { useEffect } from "react";

import "../css/Game.css";
declare module "*.png";
// eslint-disable-next-line
const intersects = require("intersects");
let currentTime = 0;
let lastCalledTime = 0;
let timeForAnimationMario = 0;
let speedAnimationTimeInMillies = 200;
// eslint-disable-next-line
let fps = 0;

const pxForDontShowBlackInBottom = 8;
const speedMario = 2;
// eslint-disable-next-line
const gravity: number = 0.05;
let speedM: number = 0;
let speedUp: boolean = false;
// eslint-disable-next-line
const limitJumpHeight = 32;
// eslint-disable-next-line
let jump: Jump = { state: false, count: 0 };

enum directionsMario {
  right = "right",
  left = "left",
  down = "down",
  up = "up",
  none = "done",
}
let directionMario = directionsMario.none;
let prevoiusDirectionMario = directionsMario.none;
let countForAnimationMario = 0;

let imageObj1 = new Image();
imageObj1.src = imm;

let imageObj2 = new Image();
imageObj2.src = im2;

let sprites = new Image();
sprites.src = im3;

const BLOCK = 16;
let coordMario: Player = { x: 0, y: BLOCK * 6, vel: 0 };

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
        fps = 0;
        return;
      }
      let delta = (Date.now() - lastCalledTime) / 1000;
      lastCalledTime = Date.now();
      // eslint-disable-next-line
      fps = 1 / delta;
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
// eslint-disable-next-line
const FPS = 10;
//let lastTimestamp = 0;

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
      if (!imageObj1.src || !canvasRef.current || currentTime === undefined)
        return;

      render();

      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [tick]
  );

  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown, true);
    window.addEventListener("keyup", checkKeyUp, true);

    return () => {
      window.removeEventListener("keydown", checkKeyDown, true);
      window.removeEventListener("keyup", checkKeyUp, true);
    };
  });

  const checkSpeedMario = () => {
    if (speedUp) {
      if (speedM < 2) {
        speedM += gravity;
      }
    } else {
      speedM = 0;
    }
  };

  function checkKeyDown(e: any) {
    var code = e.keyCode;
    speedUp = true;
    //Up arrow pressed
    switch (code) {
      case 65:
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.right;
        console.log(prevoiusDirectionMario, "--", directionMario);
        break;
      case 68:
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.left;

        break;
      default:
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.none;
        break;
    }
  }

  function checkKeyUp() {
    directionMario = directionsMario.none;
    speedUp = false;
  }

  const moveMario = () => {
    switch (directionMario) {
      case directionsMario.left:
        if (
          !checkCollision(
            coordMario,
            BLOCK,
            obstacleFloor,
            pxForDontShowBlackInBottom,
            "left"
          ) &&
          !checkCollision(
            coordMario,
            BLOCK,
            floor,
            pxForDontShowBlackInBottom,
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
            BLOCK,
            obstacleFloor,
            pxForDontShowBlackInBottom,
            "right"
          ) &&
          !checkCollision(
            coordMario,
            BLOCK,
            floor,
            pxForDontShowBlackInBottom,
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
          BLOCK,
          obstacleFloor,
          pxForDontShowBlackInBottom,
          "up"
        ) && (coordMario.y -= 2);
        break;
    }

    if (
      !checkCollision(
        coordMario,
        BLOCK,
        floor,
        pxForDontShowBlackInBottom,
        "down"
      ) &&
      !checkCollision(
        coordMario,
        BLOCK,
        obstacleFloor,
        pxForDontShowBlackInBottom,
        "down"
      )
    ) {
      if (jump.state) {
        if (
          !checkCollision(
            coordMario,
            BLOCK,
            floor,
            pxForDontShowBlackInBottom,
            "up"
          ) &&
          !checkCollision(
            coordMario,
            BLOCK,
            obstacleFloor,
            pxForDontShowBlackInBottom,
            "up"
          )
        ) {
          coordMario.y--;
        }
        jump.count++;
      } else {
        coordMario.y++;
      }
      if (jump.count > 30) {
        jump = { state: false, count: 0 };
      }
    } else {
      if (!(jump.state && jump.count === 0)) {
        jump = { state: false, count: 0 };
      } else if (jump.state && jump.count === 0) {
        if (
          !checkCollision(
            coordMario,
            BLOCK,
            floor,
            pxForDontShowBlackInBottom,
            "up"
          ) &&
          !checkCollision(
            coordMario,
            BLOCK,
            obstacleFloor,
            pxForDontShowBlackInBottom,
            "up"
          )
        ) {
          coordMario.y--;
        }
      }
    }
  };

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
        BLOCK,
        floor,
        pxForDontShowBlackInBottom,
        "down"
      ) &&
      !checkCollision(
        coordMario,
        BLOCK,
        obstacleFloor,
        pxForDontShowBlackInBottom,
        "down"
      )
    ) {
      if (directionMario === directionsMario.right) {
        if (jump.state) {
          setAnimationSpriteMario(spritesMario.jumpRight[0]);
        } else {
          setAnimationSpriteMario(spritesMario.jumpRight[1]);
        }
      } else {
        if (jump.state) {
          setAnimationSpriteMario(spritesMario.jumpLeft[0]);
        } else {
          setAnimationSpriteMario(spritesMario.jumpLeft[1]);
        }
      }
    }
  };

  const HandleTouchStart = (e: any) => {
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
              BLOCK,
              floor,
              pxForDontShowBlackInBottom,
              "down"
            ) ||
            checkCollision(
              coordMario,
              BLOCK,
              obstacleFloor,
              pxForDontShowBlackInBottom,
              "down"
            )
          ) {
            jump.state = true;
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
              BLOCK,
              floor,
              pxForDontShowBlackInBottom,
              "down"
            ) ||
            checkCollision(
              coordMario,
              BLOCK,
              obstacleFloor,
              pxForDontShowBlackInBottom,
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
  const HandleTouchEnd = (e: any) => {
    e.touches.length === 0 && setInteriorCircle(null);
    jump = { state: false, count: 0 };
    e.touches.length === 0 && (prevoiusDirectionMario = directionMario);
    e.touches.length === 0 && (directionMario = directionsMario.none);
    e.touches.length === 0 && setTouchStart(null);
    e.touches.length === 0 && (speedUp = false);
  };
  const HandleTouchMove = (e: any) => {
    setInteriorCircle({
      x: e.touches[0].clientX - e.target.offsetLeft,
      y: e.touches[0].clientY - e.target.offsetTop,
    });
    if (touchStart !== null) {
      if (touchStart.xAbsolute.clientX! < e.touches[0].clientX) {
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.left;
      } else {
        prevoiusDirectionMario = directionMario;
        directionMario = directionsMario.right;
      }
    }
  };

  const HandleCheckJump = () => {
    if (
      checkCollision(
        coordMario,
        BLOCK,
        floor,
        pxForDontShowBlackInBottom,
        "down"
      ) ||
      checkCollision(
        coordMario,
        BLOCK,
        obstacleFloor,
        pxForDontShowBlackInBottom,
        "down"
      )
    ) {
      jump.state = true;
    }
  };
  const HandleStopJump = () => {
    jump = { state: false, count: 0 };
  };
  // eslint-disable-next-line
  function fullscreen(el: any) {
    if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen();
    }
  }
  //touchStart && console.log(touchStart.posRelative.x, "--", 300);
  const render = () => {
    setDeltaTime(currentTime - tick);

    const canvas: any = canvasRef.current;
    // fullscreen(canvas);

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = "rgba(225,225,225,0.1)";
    ctx.fill();
    touchStart !== null &&
      ctx.arc(
        (touchStart.posRelative.x * 300) / touchStart.posRelative.offSet.x,
        (touchStart.posRelative.y * 150) / touchStart.posRelative.offSet.y,
        20,
        0,
        2 * Math.PI
      );

    ctx.fillStyle = "red";
    ctx.fill();
    if (interiorCircle !== null && touchStart !== null)
      ctx.arc(
        (interiorCircle.x * 300) / touchStart.posRelative.offSet.x,
        (interiorCircle.y * 150) / touchStart.posRelative.offSet.y,
        6,
        0,
        2 * Math.PI,
        true
      );

    ctx.stroke();

    ctx.drawImage(imageObj1, coordMario.x, -coordMario.y + 30, 3392, 224);
    ctx.save();

    ctx.restore();
    // PLAYER MARIOd
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();

    // ctx.drawImage(
    //   sprites,
    //   124,
    //   44,
    //   16,
    //   16,
    //   BLOCK * 9,
    //   coordMario.y,
    //   BLOCK,
    //   BLOCK
    // );

    ctx.drawImage(
      sprites,
      animationSpriteMario.x,
      animationSpriteMario.y,
      16,
      16,
      BLOCK * 9,
      coordMario.y,
      BLOCK,
      BLOCK
    );

    // floor.forEach((element: Brick) => {
    //   ctx.rect(
    //     BLOCK * element.x + coordMario.x,
    //     BLOCK * element.y + pxForDontShowBlackInBottom - coordMario.y + 102,
    //     BLOCK,
    //     BLOCK
    //   );

    //   ctx.font = "12px serif";
    //   ctx.fillText(
    //     `${element.x}`,
    //     BLOCK * element.x + coordMario.x,
    //     BLOCK * element.y + pxForDontShowBlackInBottom - coordMario.y + 102
    //   );
    // });

    // obstacleFloor.forEach((element: Brick) => {
    //   ctx.rect(
    //     BLOCK * element.x + coordMario.x,
    //     BLOCK * element.y + pxForDontShowBlackInBottom - coordMario.y + 102,
    //     BLOCK,
    //     BLOCK
    //   );
    // });

    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(225,225,225,0.1)";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";

    ctx.stroke();

    moveMario();
    checkAnimationMario();
    checkSpeedMario();
  };
  return (
    <canvas
      id="canvas"
      onMouseDown={HandleCheckJump}
      onMouseUp={HandleStopJump}
      onTouchStart={HandleTouchStart}
      onTouchMove={HandleTouchMove}
      onTouchEnd={HandleTouchEnd}
      className="canvas"
      ref={canvasRef}
    />
  );
};
// <img src={imm} alt="ciao" width="2600" height="200" />
export default Canvas;
