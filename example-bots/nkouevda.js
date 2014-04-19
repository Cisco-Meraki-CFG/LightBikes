// Nikita Kouevda
// 2014/04/19

Bot.register('nkouevda', function(board_state, player_state, move) {
  var me = board_state.me;
  var board = board_state.board;
  var safe_dirs = board.safe_directions(me);

  if (safe_dirs.length === 0) {
    move(me.straight());
    return;
  }

  var ordered_dirs = [
    me.sharp_right(), me.right(), me.straight(), me.left(), me.sharp_left()
  ];

  var ordered_safe_dirs = _.filter(ordered_dirs, function(dir) {
    return _.contains(safe_dirs, dir);
  });

  var dest = board.new_coords_from_dir(me, ordered_safe_dirs[0]);
  var best_dir = ordered_safe_dirs[0];
  var best_num_opts = board.safe_surrounding_tiles(dest).length;
  var num_opts;

  for (var i = 1; i < ordered_safe_dirs.length; ++i) {
    dest = board.new_coords_from_dir(me, ordered_safe_dirs[i]);
    num_opts = board.safe_surrounding_tiles(dest).length;

    if (num_opts > best_num_opts) {
      best_num_opts = num_opts;
      best_dir = ordered_safe_dirs[i];
    }
  }

  move(best_dir);
})
