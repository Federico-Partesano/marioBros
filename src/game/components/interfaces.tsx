export interface Player {
    x: number;
    y: number;
    vel: number;
  }
  export type Brick = {
    x: number;
    y: number;
  };
  export type Jump = {
    state: boolean;
    count: number;
  };