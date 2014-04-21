Bot.register('Buggy Bot', function(board_state, player_state, move){
	console.log("started");

	var me = board_state.me;
	var op = board_state.them;
	move(bestMove(board_state.board, me, op));
	// var op_move = bestMove(board_state.board, op, me);

	function bestMove(board, me, op){
		var opCoor = {x:op.x, y:op.y}
		var hex = board.get_hex_at(me);
		var old_player = hex.player;
		var old_wall = hex.wall;
		hex.player = me;
		hex.wall = true;
		var safe_dirs = board.safe_directions(me);
		var tile, dir;
		var bestScore = -10000000;
		var bestDir = -1;
		var newBoard;
		for (var i=0; i<safe_dirs.length; i++){

			dir = safe_dirs[i];
			meCoor = board.new_coords_from_dir(me,dir);
			newBoard = board.get_copy()
			floodFill(newBoard, meCoor, op);
			score = floodFillDiff(newBoard);
			console.log("bestMove " + score + " " + dir);
			if (score > bestScore){
				bestScore = score;
				bestDir = dir;
			}
		}
		hex.player = old_player;
		hex.wall = old_wall;
		console.log("best dir is " + bestDir + ": " + bestScore);
		return bestDir;
	}

	function floodFill(board, me, op){

		window.floodFillCount++;
		var Q1 = [];
		Q1.push(me);
		var Q2 = [];
		var turns = 0;
		var i, curr, next;
		var hex;
		while (Q1.length || Q2.length){
			while (Q1.length > 0){
				curr = Q1.shift();
				hex = board.get_hex_at(curr);
				if (hex.meTurns != undefined){
					continue;
				}
				hex.meTurns = turns;
				dirs = board.safe_directions(curr); // can be faster?
				for (i=0; i<dirs.length; i++){
					dir = dirs[i];
					next = board.new_coords_from_dir(curr, dir);
					Q2.push(next);
				}
			}
			turns++;
			while (Q2.length > 0){
				curr = Q2.shift();
				hex = board.get_hex_at(curr);
				if (hex.meTurns != undefined){
					continue;
				}
				hex.meTurns = turns;
				dirs = board.safe_directions(curr); // can be faster?
				for (i=0; i<dirs.length; i++){
					dir = dirs[i];
					next = board.new_coords_from_dir(curr, dir);
					Q1.push(next);
				}
			}
			turns++;
		}
		Q1.push(op);
		turns = 0;
		while (Q1.length || Q2.length){
			while (Q1.length > 0){
				curr = Q1.shift();
				hex = board.get_hex_at(curr)
				if (hex.opTurns != undefined){
					continue;
				}
				hex.opTurns = turns;
				dirs = board.safe_directions(curr); // can be faster?
				for (i=0; i<dirs.length; i++){
					dir = dirs[i];
					next = board.new_coords_from_dir(curr, dir);
					Q2.push(next);
				}
			}
			turns++;
			while (Q2.length > 0){
				curr = Q2.shift();
				hex = board.get_hex_at(curr)
				if (hex.opTurns != undefined){
					continue;
				}
				hex.opTurns = turns;
				dirs = board.safe_directions(curr); // can be faster?
				for (i=0; i<dirs.length; i++){
					dir = dirs[i];
					next = board.new_coords_from_dir(curr, dir);
					Q1.push(next);
				}
			}
			turns++;
		}
	}

	function floodFillDiff(board){
		console.log(board);
		var hexes = board.hexes;
		var i,j,row,hex;
		var total = 0;
		for (i=0; i<hexes.length; i++){
			row = hexes[i];
			for (j=0; j<row.length; j++){
				hex = row[j];
				diff = hex.meTurns < hex.opTurns ? 1 : 0;
				diff = hex.meTurns > hex.opTurns ? -1 : diff;
				total += diff;
			}
		}
		return total;
	}
})

