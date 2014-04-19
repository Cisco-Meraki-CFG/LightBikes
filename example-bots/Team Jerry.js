Bot.register ("Team Jerry", function(game_state, my_state, done) {
    var me = game_state.me;
    var board = game_state.board;
    var hexes = new Array();
    for (var i = 0; i < board.hexes.length; i ++) {
	hexes = hexes.concat(board.hexes[i]);
    }
    var safe_dirs = board.safe_directions(me);
    var move = 1;
    var regions = new Array(6);
    for (var i = 0; i < 6; i ++) {
	regions[i] = new Array();
    }
    var my_x = me.x;
    var my_y = me.y;
    function in_range(test, neg_x, neg_y, pos_x, pos_y) {
	var real_pos_x = my_x + pos_x;
	var real_neg_x = my_x - neg_x;
	var real_pos_y = my_y + pos_y;
	var real_neg_y = my_y - neg_y;
	return (test.x <= real_pos_x && test.x >= real_neg_x && test.y <= real_pos_y && test.y >= real_neg_y);
    };
    function printable(hexes) {
	var r = new Array();
	for (var i = 0; i < hexes.length; i ++) {
	    var hex = new Array(2);
	    hex[0] = hexes[i].x;
	    hex[1] = hexes[i].y;
	    r.push(hex);
	}
	return r;
    };
    for (var i = 0; i < hexes.length; i++) {
	var hex = hexes[i];
	if (in_range(hex, 7, 1, 7, 13)) {
	    regions[1].push(hex);
	}
	if (in_range(hex,1, 1, 13, 13)) {
	    regions[0].push(hex);
	} 
	if (in_range(hex, 13, 1, 1, 13)) {
	    regions[2].push(hex);
	}
	if (in_range(hex, 13, 13, 1, 1)) {
	    regions[3].push(hex);
	}
	if (in_range(hex, 7, 13, 7, 1)) {
	    regions[4].push(hex);
	}
	if (in_range(hex, 1, 13, 13, 1)) {
	    regions[5].push(hex);
	}
    }
    var best_score = 0;
    var best_region = 0;
    var not_bad = new Array();
    function possible(coor, level) {
	var hex = board.get_hex_at(coor);
	if (_.isNull(hex) || !_.isNull(hex.player)) {
	    return 0;
	}
	else if (level == 0) {
	    return 1;
	}
	var sum = 0;
	for (var i = 0; i < 6; i ++) {
	    sum += possible(board.new_coords_from_dir(coor, i), level - 1);
	}
	return sum;
    };
    for (var i = 0; i < safe_dirs.length; i ++) {
	if (possible(board.new_coords_from_dir(me, safe_dirs[i]), 2) > 0) {
	    not_bad.push(safe_dirs[i]);
	}
    }
    for (var i = 0; i < not_bad.length; i ++) { 
	var score = 0;
	var region_num = not_bad[i];
	var region = regions[region_num];
	for (var j = 0; j < region.length; j ++) {
	    var hex = region[j];
	    if (hex.player === null) {
		score += 1;
		if (Math.abs(my_x - hex.x) < 2 || Math.abs(my_y - hex.y) < 2) {
		    score += 5;
		}
		else if (Math.abs(my_x - hex.x) <  4 || Math.abs(my_y - hex.y) < 4) {
		    score += 3;
		}
	    }
	}
	if (score > best_score) {
	    best_score = score;
	    best_region = region_num;
	}
    }
    done(best_region);
})