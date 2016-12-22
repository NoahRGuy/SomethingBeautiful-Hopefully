//bobbyong.com/blog/installing-postgresql-on-windows
//Source: http://www.emanueleferonato.com/2016/05/17/match-3-bejeweled-html5-prototype-made-with-phaser/
function orbMove(event, pX, pY){ //function to move the orbs
     if(event.id == 0){
          //vars to determine distance and change
          var distX = pX - selectedOrb.orbSprite.x;
          var distY = pY - selectedOrb.orbSprite.y;
          var deltaRow = 0;
          var deltaCol = 0;
          if(Math.abs(distX) > orbSize / 2){ //if the x-distance is greater than half the orb-size
               if(distX > 0){ //if the x-distance is greater than 0
                    deltaCol = 1; //you're gonna move right
               }
               else{ //if not
                    deltaCol = -1; //you're gonna move left
               }
          }
          else{ //if the x-distance isn't affected...
               if(Math.abs(distY) > orbSize / 2){ //if the y-distance is greater than half the orb size
                    if(distY > 0){ //if your y-distance is positive
                        deltaRow = 1; //move down.
                    }
                    else{
                         deltaRow = -1; //else, move up.
                    }
               }
          }
          if(deltaRow + deltaCol != 0){ //if there is an eminent change, either up or down,
               var pickedOrb = gemAt(getOrbRow(selectedOrb) + deltaRow, getOrbCol(selectedOrb) + deltaCol); //grab the orb to swap with
               if(pickedOrb != -1){ //if there is an orb at the valid area
                    //swap them.
                    selectedOrb.orbSprite.scale.setTo(1);
                    swapOrbs(selectedOrb, pickedOrb, true);
                    game.input.deleteMoveCallback(orbMove);
               }
          }
     }
}

function swapOrbs(orb1, orb2, swapBack){ //swapping orbs function
     canPick = false; //disables the ability to swap other orbs
     var fromColor = orb1.orbColor; //grabs the first orbs' color and sprite
     var fromSprite = orb1.orbSprite;
     var toColor = orb2.orbColor; //grabs the second orbs' color and sprit
     var toSprite = orb2.orbSprite;
     //changes the color and sprite in the first orbs' position to the second orb's attributes
     gameArray[getOrbRow(orb1)][getOrbCol(orb1)].orbColor = toColor;
     gameArray[getOrbRow(orb1)][getOrbCol(orb1)].orbSprite = toSprite;
     //vice-versa for the second orb
     gameArray[getOrbRow(orb2)][getOrbCol(orb2)].orbColor = fromColor;
     gameArray[getOrbRow(orb2)][getOrbCol(orb2)].orbSprite = fromSprite;

     //add tweens, or transition/change states for both of the orbs
     var orb1Tween = game.add.tween(gameArray[getOrbRow(orb1)][getOrbCol(orb1)].orbSprite).to({
          x: getOrbCol(orb1) * orbSize + orbSize / 2,
          y: getOrbRow(orb1) * orbSize + orbSize / 2
     }, swapSpeed, Phaser.Easing.Linear.None, true);
     var orb2Tween = game.add.tween(gameArray[getOrbRow(orb2)][getOrbCol(orb2)].orbSprite).to({
          x: getOrbCol(orb2) * orbSize + orbSize / 2,
          y: getOrbRow(orb2) * orbSize + orbSize / 2
     }, swapSpeed, Phaser.Easing.Linear.None, true);
     //when the second orb stops moving, check to see if a match has been made as a result
     orb2Tween.onComplete.add(function(){
          if(!matchInBoard() && swapBack){ //if none are found, swap-em back
               swapOrbs(orb1, orb2, false);
          }
          else{ //else let the board do its thing with the matches
               if(matchInBoard()){
                    handleMatches();
               }
               else{
                    canPick = true;
                    selectedOrb = null;
               }
          }
     });
}
