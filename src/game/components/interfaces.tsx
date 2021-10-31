export type TypeObstacle = "obstacleFloor" | "brick" | "specialBrick" | "emptyBrick";
export interface Player {
    x: number;
    y: number;
    vel: number;
  }
  export type Brick = {
    x: number;
    y: number;

  };

  export type Enemy = {
    x: number;
    y: number;

  };

  export type ObstacleBrick ={
    x: number;
    y: number;
    type: TypeObstacle;
  }


  export type Jump = {
    state: boolean;
    count: number;
  };