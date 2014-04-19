Bot.register("tsundere", function(game, player, move) {

  var me = game.me;
  var other = game.them;
    var board = game.board;
    var moves = board.safe_directions(me);
    var center = {x:15, y:7};
  
    //dictionary of distances from me to other after making a move
    var values = _.map(moves, function(dir){
      var coords = board.new_coords_from_dir(me, dir);
      return eval(board, coords, other);
    });

    function eval(board, here, there) {
      return (17.0/board.get_dist(here, there) + 170.0/board.get_dist(here, center) + 17.0*(board.safe_directions(here).length));
    }

    move(moves[values.indexOf(Math.max.apply(null, values))]);

})
