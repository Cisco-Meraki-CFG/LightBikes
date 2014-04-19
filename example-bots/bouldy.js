Bot.register('BoldBot', function(board_state, player_state, move) {
	var me = board_state.me;
	var my_dirs = board_state.board.safe_directions(me);
	var them = board_state.them;
	var their_dirs = board_state.board.safe_directions(them);
	var current_player = me;
	function getSuccessor(state, player, move, who) {
		var newState = state;
		var oldX = player.x;
		var oldY = player.y;
		var newX = oldX;
		var newY = oldY;
		var maxX = 30;
		var maxY = 15;
		if (move == 0) {
			newX = (newX + 1) % maxX;
		} else if (move == 1) {
			newY  = (newY - 1) % maxY;
		} else if (move == 2) {
			newX = (newX - 1) % maxX;
		} else if (move == 3) {
			newY = (newY + 1) % maxY;
			newX = (newX - 1) % maxX;
		} else if (move == 4) {
			newY = (newY + 1) % maxY;
		} else if (move == 5) {
			newX = (newX + 1) % maxX;
			newY = (newY + 1) % maxY;
		}
		player.x = newX;
		player.y = newY;
		// newState.board.hexes[oldY][oldX].wall = true;
		if (who == 1) {
			newState.me = player;
		} else {
			newState.them = player;
		}
		return newState;
	}
	function evaluation(board_state, player) {
		var score = 0;
		score += board_state.board.safe_surrounding_tiles(player).length;

		return score;
	}
	var best_move = my_dirs[0];
	var best_value = -1000000;
	for (var i = 0; i < my_dirs.length; i++) {
		var current_successor = getSuccessor(board_state, me, my_dirs[i], 1);
		var next_value = 0;
		var nextnext_value = 0;
		for (var j = 0; j < current_successor.board.safe_directions(me).length; j++) {
			var next_successor = getSuccessor(current_successor, me, my_dirs[j], 1);
			next_value = Math.max(next_value, evaluation(next_successor, me));
			for (var k = 0; k < current_successor.board.safe_directions(me).length; k++) {
				var nextnext_successor = getSuccessor(next_successor, me, my_dirs[k], 1);
				nextnext_value = Math.max(nextnext_value, evaluation(nextnext_successor, me));
			}
		}
		var successor_value = evaluation(current_successor, me) - evaluation(current_successor, them);
		if (next_value == 0 || nextnext_value == 0) {
			break;
		}
		// console.log("Best value is: " + successor_value.toString());
		if (successor_value > best_value) {
			best_value = successor_value;
			best_move = my_dirs[i];
		}
	}
	move(best_move);
})