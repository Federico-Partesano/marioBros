import { Brick } from "./components/interfaces";
import imgMap from "../images/map.png";
import imgWall from "../images/wall.png";
import imgSprites from "../images/sprites.gif";

export let currentTime = 0;
export let imageMap = new Image();
imageMap.src = imgMap;
export const BLOCK = 16;
export const pxForDontShowBlackInBottom = 8;
export const speedMario = 2;
export const speedAnimationTimeInMillies = 200;
export const fps = 0;
export const gravity: number = 0.05;
export let imageWall = new Image();
imageWall.src = imgWall;

export let sprites = new Image();
sprites.src = imgSprites;

export enum directionsMario {
  right = "right",
  left = "left",
  down = "down",
  up = "up",
  none = "done",
}

export const spritesMario = {
  stop: { left: { x: 222, y: 44 }, right: { x: 274, y: 44 } },
  runLeft: [
    { x: 206, y: 44 },
    { x: 193, y: 44 },
    { x: 176, y: 44 },
  ],

  runRight: [
    { x: 290, y: 44 },
    { x: 304, y: 44 },
    { x: 320, y: 44 },
  ],
  jumpLeft: [
    { x: 356, y: 44 },
    { x: 372, y: 44 },
  ],
  jumpRight: [
    { x: 142, y: 44 },
    { x: 124, y: 44 },
  ],
};



export const floor: Array<Brick> = [];

for (let index = 0; index <= 68; index++) {
  floor.push({ x: index, y: 7 });
  floor.push({ x: index, y: 8 });
}
for (let index = 71; index <= 85; index++) {
  floor.push({ x: index, y: 7 });
  floor.push({ x: index, y: 8 });
}
for (let index = 89; index <= 152; index++) {
  floor.push({ x: index, y: 7 });
  floor.push({ x: index, y: 8 });
}
for (let index = 155; index <= 180; index++) {
  floor.push({ x: index, y: 7 });
  floor.push({ x: index, y: 8 });
}

export const obstacleFloor: Array<Brick> = [
  // brick in the sky

  { x: 16, y: 3 },
  { x: 20, y: 3 },
  { x: 21, y: 3 },
  { x: 22, y: 3 },
  { x: 23, y: 3 },
  { x: 24, y: 3 },

  { x: 22, y: -1 },
  // second block in the sky
  { x: 77, y: 3 },
  { x: 78, y: 3 },
  { x: 79, y: 3 },

  { x: 80, y: -1 },
  { x: 81, y: -1 },
  { x: 82, y: -1 },
  { x: 83, y: -1 },
  { x: 84, y: -1 },
  { x: 85, y: -1 },
  { x: 86, y: -1 },
  { x: 87, y: -1 },

  { x: 91, y: -1 },
  { x: 92, y: -1 },
  { x: 93, y: -1 },
  { x: 94, y: -1 },

  { x: 94, y: 3 },

  { x: 100, y: 3 },

  { x: 106, y: 3 },

  { x: 109, y: 3 },

  { x: 109, y: -1 },

  { x: 112, y: 3 },

  { x: 118, y: 3 },

  { x: 121, y: -1 },
  { x: 122, y: -1 },
  { x: 123, y: -1 },

  { x: 128, y: -1 },
  { x: 129, y: -1 },
  { x: 130, y: -1 },
  { x: 131, y: -1 },

  { x: 129, y: 3 },
  { x: 130, y: 3 },
  // first obstacle
  { x: 28, y: 6 },
  { x: 28, y: 5 },
  { x: 29, y: 5 },
  { x: 29, y: 6 },
  //second
  { x: 38, y: 6 },
  { x: 38, y: 5 },
  { x: 38, y: 4 },
  { x: 39, y: 6 },
  { x: 39, y: 5 },
  { x: 39, y: 4 },
  //third
  { x: 46, y: 6 },
  { x: 46, y: 5 },
  { x: 46, y: 4 },
  { x: 46, y: 3 },
  { x: 47, y: 6 },
  { x: 47, y: 5 },
  { x: 47, y: 4 },
  { x: 47, y: 3 },
  //quart
  { x: 57, y: 6 },
  { x: 57, y: 5 },
  { x: 57, y: 4 },
  { x: 57, y: 3 },
  { x: 58, y: 6 },
  { x: 58, y: 5 },
  { x: 58, y: 4 },
  { x: 58, y: 3 },

  { x: 134, y: 6 },
  { x: 135, y: 6 },
  { x: 136, y: 6 },
  { x: 137, y: 6 },
  { x: 135, y: 5 },
  { x: 136, y: 5 },
  { x: 137, y: 5 },
  { x: 136, y: 4 },
  { x: 137, y: 4 },
  { x: 137, y: 3 },

  { x: 140, y: 6 },
  { x: 141, y: 6 },
  { x: 142, y: 6 },
  { x: 143, y: 6 },
  { x: 140, y: 5 },
  { x: 141, y: 5 },
  { x: 142, y: 5 },
  { x: 140, y: 4 },
  { x: 141, y: 4 },
  { x: 140, y: 3 },

  { x: 148, y: 6 },
  { x: 149, y: 6 },
  { x: 150, y: 6 },
  { x: 151, y: 6 },
  { x: 152, y: 6 },
  { x: 149, y: 5 },
  { x: 150, y: 5 },
  { x: 151, y: 5 },
  { x: 152, y: 5 },
  { x: 150, y: 4 },
  { x: 151, y: 4 },
  { x: 152, y: 4 },
  { x: 151, y: 3 },
  { x: 152, y: 3 },
];


