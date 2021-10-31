import { Brick, TypeObstacle, ObstacleBrick, Enemy } from "./components/interfaces";
import imgMap from "../images/map2.png";
import imgWall from "../images/skyBrick.png";
import imgSprites from "../images/sprites.gif";
import imgEmptyBrick from "../images/emptyBrick.png";
import specialBrick from "../images/specialBrick.png";


export let imageMap = new Image();
imageMap.src = imgMap;
export let imageWall = new Image();
imageWall.src = imgWall;
export let imageEmptyBrick = new Image();
imageEmptyBrick.src = imgEmptyBrick;
export let imageSepcialBrick = new Image();
imageSepcialBrick.src = specialBrick;


export const BLOCK = 16;
export const pxForDontShowBlackInBottom = 8;
export const speedMario = 2;
export const speedAnimationTimeInMillies = 200;
export const speedAnimationTimeInMilliesMushrooms = 200;
export const fps = 0;
export const gravity: number = 0.05;
export const speedMushRooms: number = 0.05;

export let sprites = new Image();
sprites.src = imgSprites;

export enum directionsMario {
  right = "right",
  left = "left",
  down = "down",
  up = "up",
  none = "done",
}

export const spritesEnemyMushRoom = [
 {x:296, y: 186},
  {x: 315, y: 186}
];

export let enemyMushRoom: Array<Enemy> = [
{x: 15, y: 5}
];

export const setEnemyMushRooms = (value: any) => {
  enemyMushRoom = value;
  }
  export const setEnemyMushRoom = (index: number, object: any) => {
    enemyMushRoom[index] = object;
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

export let obstacleFloor: Array<ObstacleBrick> = [
  // brick in the sky

  { x: 16, y: 3 , type: "specialBrick"},
  { x: 20, y: 3 , type: "brick"},
  { x: 21, y: 3 , type: "specialBrick"},
  { x: 22, y: 3 , type: "brick"},
  { x: 23, y: 3 , type: "specialBrick"},
  { x: 24, y: 3 , type: "brick"},

  { x: 22, y: -1,type: "specialBrick" },
  // second block in the sky
  { x: 77, y: 3, type: "brick" },
  { x: 78, y: 3, type: "specialBrick" },
  { x: 79, y: 3, type: "brick" },

  { x: 80, y: -1, type: "brick" },
  { x: 81, y: -1, type: "brick" },
  { x: 82, y: -1, type: "brick" },
  { x: 83, y: -1, type: "brick" },
  { x: 84, y: -1, type: "brick" },
  { x: 85, y: -1, type: "brick" },
  { x: 86, y: -1, type: "brick" },
  { x: 87, y: -1, type: "brick" },

  { x: 91, y: -1, type: "brick" },
  { x: 92, y: -1, type: "brick" },
  { x: 93, y: -1, type: "brick" },
  { x: 94, y: -1, type: "specialBrick" },

  { x: 94, y: 3, type: "brick" },

  { x: 100, y: 3, type: "brick" },

  { x: 106, y: 3, type: "specialBrick" },

  { x: 109, y: 3, type: "specialBrick" },

  { x: 109, y: -1, type: "specialBrick" },

  { x: 112, y: 3, type: "specialBrick" },

  { x: 118, y: 3, type: "brick" },

  { x: 121, y: -1, type: "brick" },
  { x: 122, y: -1, type: "brick" },
  { x: 123, y: -1, type: "brick" },

  { x: 128, y: -1, type: "brick" },
  { x: 129, y: -1, type: "specialBrick" },
  { x: 130, y: -1, type: "specialBrick" },
  { x: 131, y: -1, type: "brick" },

  { x: 129, y: 3, type: "brick" },
  { x: 130, y: 3, type: "brick" },
  // first obstacle
  { x: 28, y: 6, type: "obstacleFloor" },
  { x: 28, y: 5, type: "obstacleFloor" },
  { x: 29, y: 5, type: "obstacleFloor" },
  { x: 29, y: 6, type: "obstacleFloor" },
  //second
  { x: 38, y: 6, type: "obstacleFloor" },
  { x: 38, y: 5, type: "obstacleFloor" },
  { x: 38, y: 4, type: "obstacleFloor" },
  { x: 39, y: 6, type: "obstacleFloor" },
  { x: 39, y: 5, type: "obstacleFloor" },
  { x: 39, y: 4, type: "obstacleFloor" },
  //third
  { x: 46, y: 6, type: "obstacleFloor" },
  { x: 46, y: 5, type: "obstacleFloor"},
  { x: 46, y: 4, type: "obstacleFloor"},
  { x: 46, y: 3, type: "obstacleFloor"},
  { x: 47, y: 6, type: "obstacleFloor" },
  { x: 47, y: 5, type: "obstacleFloor"},
  { x: 47, y: 4, type: "obstacleFloor"},
  { x: 47, y: 3, type: "obstacleFloor"},
  //quart
  { x: 57, y: 6, type: "obstacleFloor" },
  { x: 57, y: 5, type: "obstacleFloor"},
  { x: 57, y: 4, type: "obstacleFloor"},
  { x: 57, y: 3, type: "obstacleFloor"},
  { x: 58, y: 6, type: "obstacleFloor" },
  { x: 58, y: 5, type: "obstacleFloor"},
  { x: 58, y: 4, type: "obstacleFloor"},
  { x: 58, y: 3, type: "obstacleFloor"},

  { x: 134, y: 6, type: "obstacleFloor" },
  { x: 135, y: 6, type: "obstacleFloor" },
  { x: 136, y: 6, type: "obstacleFloor" },
  { x: 137, y: 6, type: "obstacleFloor" },
  { x: 135, y: 5, type: "obstacleFloor"},
  { x: 136, y: 5, type: "obstacleFloor"},
  { x: 137, y: 5, type: "obstacleFloor"},
  { x: 136, y: 4, type: "obstacleFloor"},
  { x: 137, y: 4, type: "obstacleFloor"},
  { x: 137, y: 3, type: "obstacleFloor"},

  { x: 140, y: 6, type: "obstacleFloor" },
  { x: 141, y: 6, type: "obstacleFloor" },
  { x: 142, y: 6, type: "obstacleFloor" },
  { x: 143, y: 6, type: "obstacleFloor" },
  { x: 140, y: 5, type: "obstacleFloor"},
  { x: 141, y: 5, type: "obstacleFloor"},
  { x: 142, y: 5, type: "obstacleFloor"},
  { x: 140, y: 4, type: "obstacleFloor"},
  { x: 141, y: 4, type: "obstacleFloor"},
  { x: 140, y: 3, type: "obstacleFloor"},

  { x: 148, y: 6, type: "obstacleFloor" },
  { x: 149, y: 6, type: "obstacleFloor" },
  { x: 150, y: 6, type: "obstacleFloor" },
  { x: 151, y: 6, type: "obstacleFloor" },
  { x: 152, y: 6, type: "obstacleFloor" },
  { x: 149, y: 5, type: "obstacleFloor"},
  { x: 150, y: 5, type: "obstacleFloor"},
  { x: 151, y: 5, type: "obstacleFloor"},
  { x: 152, y: 5, type: "obstacleFloor"},
  { x: 150, y: 4, type: "obstacleFloor"},
  { x: 151, y: 4, type: "obstacleFloor"},
  { x: 152, y: 4, type: "obstacleFloor"},
  { x: 151, y: 3, type: "obstacleFloor"},
  { x: 152, y: 3, type: "obstacleFloor"},
];


