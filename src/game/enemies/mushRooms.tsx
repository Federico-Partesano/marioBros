import { enemyMushRoom, obstacleFloor, setEnemyMushRooms, setEnemyMushRoom, floor } from "../resouces";
import { Enemy } from "../components/interfaces";
import { speedMushRooms } from "../resouces";
import { checkCollision, checkCollisionMushrooms, intersectMushroom } from "../components/detectionCollisions";




export const moveMushRoom = () => {

 
       setEnemyMushRooms(enemyMushRoom.map((element: any) =>({x: element.x - speedMushRooms, y: element.y }) ))
}

export const gravityMushrooms = () => {
   // console.log(intersectMushroom(enemyMushRoom[0],floor),"--", enemyMushRoom[0]);
    for (let key in enemyMushRoom) {

            (!checkCollisionMushrooms(enemyMushRoom[key],floor)) && (setEnemyMushRoom(parseInt(key),{x: enemyMushRoom[key].x, y: enemyMushRoom[key]. y + 0.1}))

            }
            
     
       
   
        // Use `key` and `value`
    }


