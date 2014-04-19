Bot.register('DummyBot', function(board_state, player_state, move) {
  // Bot code, then call move!
function goLeftUntilHit() {
    x = me.x;
    y = me.y;
    desiredDirection = 2;
    if (!(validDirections.contains(2) && validDirections.contains(3))) {
        if (validDirections.contains(1)) {
            return 1;
        }
        if (validDirections.contains(0)) {
            return 0;
        }
    }
    if (isEven(x) && isEven(y)) {
        desiredDirection = 2;
    } else if (isOdd(x) && isEven(y)) {
        desiredDirection = 3;
    } else if (isEven(x) && isOdd(y)) {
        desiredDirection = 2;
    } else if (isOdd(x) && isOdd(y)) {
        desiredDirection = 3;
    }
    if (validDirections.contains(desiredDirection)) {
        return desiredDirection;
    }
    return validDirections[0];
}
    
function goRightUntilHit() {
    x = me.x;
    y = me.y;
    desiredDirection = 0;
    if (!(validDirections.contains(0) && validDirections.contains(5))) {
        if (validDirections.contains(1)) {
            return 1;
        }
        if (validDirections.contains(2)) {
            return 2;
        }
    }
    if (isEven(x) && isEven(y)) {
        desiredDirection = 0;
    } else if (isOdd(x) && isEven(y)) {
        desiredDirection = 5;
    } else if (isEven(x) && isOdd(y)) {
        desiredDirection = 0;
    } else if (isOdd(x) && isOdd(y)) {
        desiredDirection = 5;
    }
    if (validDirections.contains(desiredDirection)) {
        return desiredDirection;
    }
    return validDirections[0];
}
    
function isOdd(i) {
    return (i%2)==1;
}

function isEven(i) {
    return (i%2)==0;
}



  var fillingAdjacent = false;
  var me = board_state.me;
  window.me = me;
  var ZERO = 0;
  var ONE = 1;
  var TWO = 2;
  var THREE = 3;
  var FOUR = 4;
  var FIVE = 5;
  if (me.color === "blue") {
      var ZERO = 2;
      var TWO = 0;
      var THREE = 5;
      var FIVE = 3;  
    }
  var valid_directions = board_state.board.safe_directions(me);
  var hard_coded = [0, 0, 0, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4];
  if (me.color === "blue") {
    //hard_coded = _.map(hard_coded, function (element ) { return (element == 0) ? 2 : element });
    hard_coded = [2, 2, 2, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4];

  }
  if (me.walls.length < 15) {
    /* Defense for if opponent is too close during setup
    if (board_state.board.get_distance(board_state.me, board_state.them) < 3) {

    }
    */
    move(hard_coded[me.walls.length]);
  } else {
        var bottom_stats =  _.filter(me.walls, function (coordinates) { coordinates.y == 14; }).length;
        var reached_bottom = bottom_stats > 1;
        if (!reached_bottom && me.y == 14) {
            if (me.color === "blue") {
                if (_.contains(valid_directions, 5)) {
                    move(5);
                } else {
                    move(0);
                }
            } else {
                if (_.contains(valid_directions, 3)) {
                    move(3);
                } else {      
                    move(2);
                }      
            }
        } else if (reached_bottom) {
            if (me.color === "blue") {
                if (isEven(me.y)) {
                    goRightUntilHit();
                } else if (isOdd(me.y)) {
                    goLeftUntilHit();
                }
            }
            if (me.color === "darkred") {
                if (isEven(me.y)) {
                    goLeftUntilHit();
                } else if (isOdd(me.y)) {
                    goRedUntilHit();
                }
            }
        } else if (((me.color === "blue" &&  me.x > 10) || (me.color === "darkred" && me.x < 20)) && _.contains(valid_directions, FIVE)) {
            move(FIVE);
        } else if (_.contains(valid_directions, FOUR)) {
            move(FOUR);
        } else {
            move(valid_directions[0]);
        }
    }
})


