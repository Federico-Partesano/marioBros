import { Player, Brick, ObstacleBrick, Enemy } from "./interfaces";
import { pxForDontShowBlackInBottom,BLOCK, enemyMushRoom } from "../resouces";
const intersects = require("intersects");

export function intersect(
    coordMario: Player | Enemy,
    BLOCK: number,
    obj: Brick,
    direction: string,

  ) {
   
    switch (direction) {
      case "left":
        return intersects.boxBox(
          Math.abs(coordMario.x) + BLOCK * 9 + 2,
          coordMario.y,
          BLOCK,
          BLOCK,
          obj.x * BLOCK,
          obj.y * BLOCK + pxForDontShowBlackInBottom - coordMario.y + 102,
          BLOCK,
          BLOCK
        );
  
      case "right":
        return intersects.boxBox(
          Math.abs(coordMario.x) + BLOCK * 9 - 2,
          coordMario.y,
          BLOCK,
          BLOCK,
          obj.x * BLOCK,
          obj.y * BLOCK + pxForDontShowBlackInBottom - coordMario.y + 102,
          BLOCK,
          BLOCK
        );
  
      case "down":
        return intersects.boxBox(
          Math.abs(coordMario.x) + BLOCK * 9,
          coordMario.y + 3,
          BLOCK,
          BLOCK,
          obj.x * BLOCK,
          obj.y * BLOCK + pxForDontShowBlackInBottom - coordMario.y + 102,
          BLOCK,
          BLOCK
        );
  
      case "up":
        return intersects.boxBox(
          Math.abs(coordMario.x) + BLOCK * 9,
          coordMario.y - 2,
          BLOCK,
          BLOCK,
          obj.x * BLOCK,
          obj.y * BLOCK + pxForDontShowBlackInBottom - coordMario.y + 102,
          BLOCK,
          BLOCK
        );
    }
  }

  export function intersectMushroom(
    coordMushRoom: Enemy,
    obj:   any,

  ) {

    return intersects.boxBox(
      coordMushRoom.x * BLOCK,
      coordMushRoom.y * BLOCK + 3 ,
      BLOCK,
      BLOCK,
      obj.x * BLOCK,
      obj.y * BLOCK,
      BLOCK,
      BLOCK
    )
  }
  
  export function checkCollision(
    coordMario: Player,
    array: Array<Brick> | Array<ObstacleBrick>,
    direction: string
  ): Brick | ObstacleBrick | undefined {
    return array.find((element: Brick | ObstacleBrick) =>
      intersect(coordMario, BLOCK,element, direction)
    );
  }
  export function checkCollisionMushrooms(
    coordMushroom: Enemy,
    array: Array<Brick> | Array<ObstacleBrick>,
  ): Brick | ObstacleBrick | undefined {
    return array.find((element: Brick | ObstacleBrick) =>
      intersectMushroom(coordMushroom, element)
    );
  }
  