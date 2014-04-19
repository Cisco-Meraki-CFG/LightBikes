Bot.register('PenguinBot', function(game_state, player_state, move) {
  var me = game_state.me;
  var board = game_state.board;
  var moves = board.safe_directions(me);

  if (me.last_move == 4 && _.contains(moves, 4) && me.y < 13) {
    move(4);
  } else if (me.y == 13 && me.x > 1 && _.contains(moves,2)) {
    move(2);
  } else if (me.x < 2 && _.contains(moves,4)) {
    move(4);
  } else if ((me.x + me.y) % 2 == 0 && me.y == 0 && _.contains(moves, 2) && !_.contains(moves, 4)) {
    move(2);
  } else if (_.contains(moves,1) && !_.contains(moves, 0)) {
    move(1);
  } else if (_.contains(moves, 4) && !_.contains(moves, 0)) {
    move(4);
  } else if (!_.contains(moves, 4) && _.contains(moves, 3) && !_.contains(moves, 1)) {
    move(3);
  } else if (_.contains(moves, 1) && !_.contains(moves, 0)) {
    move(1);
  } else if (me.y == 0 && _.contains(moves, 2)) {
    move(2);
  } else if (me.y == 0 && _.contains(moves, 3)) {
    move(3);
  } else if (_.contains(moves, 0)) {
    move(0);
  } else if (_.contains(moves, 1)) {
    move(1);
  } else {
    for (var i = 0; i < 6; i ++) {
      if (_.contains(moves, i)) {
        move(i);
      }
    }
  }
})
