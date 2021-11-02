
import { spritesEnemyMushRoom,speedAnimationTimeInMilliesMushrooms } from "../resouces";
import { currentTime } from "../game";




let timeForAnimationMushRooms: number = 0;
export let imageAnimationMushRooms = spritesEnemyMushRoom[0];

 export  const animationMushRooms = () => {
        
      if ((currentTime - timeForAnimationMushRooms > speedAnimationTimeInMilliesMushrooms)) {
        imageAnimationMushRooms = imageAnimationMushRooms === spritesEnemyMushRoom[0] ? spritesEnemyMushRoom[1] : spritesEnemyMushRoom[0];
        timeForAnimationMushRooms = currentTime;
      }
    }