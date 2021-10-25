const intersects = require("intersects");
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

export function checkCollisionObstacledirectionRight(
  coordMario: Player,
  BLOCK: number,
  pxForDontShowBlackInBottom: number
) {
  return obstacleFloor.some(
    (brick) =>
      Math.abs(coordMario.x) + BLOCK + BLOCK * 9 + 1 >= brick.x * BLOCK &&
      Math.abs(coordMario.x) + BLOCK + BLOCK * 9 + 1 <=
        brick.x * BLOCK + BLOCK &&
      coordMario.y >= brick.y * BLOCK - pxForDontShowBlackInBottom &&
      coordMario.y <= brick.y * BLOCK + BLOCK - pxForDontShowBlackInBottom &&
      coordMario.y + BLOCK >= brick.y * BLOCK - pxForDontShowBlackInBottom &&
      coordMario.y + BLOCK <=
        brick.y * BLOCK + BLOCK - pxForDontShowBlackInBottom
  );
}
export function checkCollisionObstacledirectionLeft(
  coordMario: Player,
  BLOCK: number,
  pxForDontShowBlackInBottom: number
) {
  return obstacleFloor.some(
    (brick) =>
      Math.abs(coordMario.x) + BLOCK * 9 - 1 >= brick.x * BLOCK &&
      Math.abs(coordMario.x) + BLOCK * 9 - 1 <= brick.x * BLOCK + BLOCK &&
      Math.abs(coordMario.y) >= brick.y * BLOCK - pxForDontShowBlackInBottom &&
      Math.abs(coordMario.y) <=
        brick.y * BLOCK + BLOCK - pxForDontShowBlackInBottom
  );
}

export function checkCollisionObstacleFloordirectionDown(
  coordMario: Player,
  BLOCK: number,
  pxForDontShowBlackInBottom: number
) {
  return floor.some(
    (brick) =>
      coordMario.y + BLOCK + 1 > brick.y * BLOCK + pxForDontShowBlackInBottom &&
      coordMario.y + BLOCK + 1 <
        brick.y * BLOCK + BLOCK + pxForDontShowBlackInBottom
  );
}

export function checkCollisionFloordirectionDown(
  coordMario: Player,
  BLOCK: number,
  pxForDontShowBlackInBottom: number
) {
  return obstacleFloor.some(
    (brick) =>
      coordMario.y + BLOCK >= brick.y * BLOCK - pxForDontShowBlackInBottom &&
      coordMario.y + BLOCK <=
        brick.y * BLOCK + BLOCK - pxForDontShowBlackInBottom
  );
}

export function intersect(
  coordMario: Player,
  BLOCK: number,
  obj: Brick,
  direction: string,
  pxForDontShowBlackInBottom: number
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

export function checkCollision(
  coordMario: Player,
  BLOCK: number,
  array: Array<Brick>,
  pxForDontShowBlackInBottom: number,
  direction: string
) {
  return array.some((element) =>
    intersect(coordMario, BLOCK, element, direction, pxForDontShowBlackInBottom)
  );
}
