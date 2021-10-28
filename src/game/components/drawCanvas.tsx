import { imageMap, sprites, BLOCK } from "../resouces";

export const drawCanvas = (ctx: any, canvas: any, touchStart: any, interiorCircle: any, animationSpriteMario: any,coordMario: any) => {
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

ctx.drawImage(imageMap, coordMario.x, -coordMario.y + 30, 3392, 224);
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



ctx.fill();
ctx.stroke();

ctx.fillStyle = "rgba(225,225,225,0.1)";
ctx.fill();
ctx.strokeStyle = "#ffffff";

ctx.stroke();
}


    // UTILE PER MAPPARE IL CAMPO, MOSTRA I BLOCCHI DI MURI NELLA MAPPA.


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