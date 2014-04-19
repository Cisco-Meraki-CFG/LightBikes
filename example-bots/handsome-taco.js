Bot.register('handsome-taco', function(board_state, player_state, move) {
  // Bot code, then call move!
    var color = board_state.me.color;
    var me = board_state.me;
    var them = board_state.them;
    var board = board_state.board;
    //initially moves should be go right
    var moves = board.safe_directions(me);

    if(!("phase1" in player_state))
    {
      player_state.phase1 = false;
    }

    if(!("phase2" in player_state))
    {
      player_state.phase2 = false;
    }

    if(!("phase3" in player_state))
    {
      player_state.phase3 = false;
    }

    if(!("phase4" in player_state))
    {
      player_state.phase4 = false;
    }

    if(!("phase5" in player_state))
    {
      player_state.phase5 = false;
    }

    if(!("lastturn" in player_state))
    {
      player_state.lastturn = 0;
    }

    if(!player_state.phase1)
    {
      if(check_to_turn(color))
      {
        player_state.lastturn = board_state.me.x;
        choose_turn(color);
      }
      else
      {
        mv = move_straight(color == "blue" ? 3 : 0);
        tag = false;
        for(i = 0; i < moves.length; i++)
        {
          if(moves[i] == mv)
            tag = true;
        }
        if(tag)
        {
          move(mv);
        }
        else
        {
          player_state.phase1 = true;
          player_state.lastturn = board_state.me.x;
          choose_turn(color);
        }
      }
    }
    else if(!player_state.phase2)
    {
      phase2_choose(color);
    }
    else if(!player_state.phase3)
    {
      phase3_choose(color);
    }
    else if(!player_state.phase4)
    {
      phase4_choose(color);
    }
    else
    {
      phase5_choose(color);
    }

    function check_to_turn(color)
    {
      var x = board_state.me.x;
      var target = board_state.them.x + (color == "blue" ? 1 : -1);
          target = (color == "blue" ? (target < 11 ? 11 : target) : (target > 18 ? 18 : target));
      if(x == target)
      {
        return true;
      }
      return false;
    }

    function phase3_choose(color)
    {
      if("turned" in player_state)
      {
        if(board_state.me.x == player_state.lastturn)
        {
          var tag = false;
          var mv = 4;
          for(i = 0; i < moves.length; i++)
          {
            if(4 == moves[i])
            {
              tag = true;
            }
          }

          if(tag)
          {
            mv = 4;
          }
          else
          {
            mv = 1;
          }
          player_state.phase3 = true;
          move(mv);
        }
        else
        {
          spiral(color);
        }
      }
      else
      {
        player_state.turned = 1;
        spiral(color);
      }
    }

    function spiral(color)
    {
      if (_.contains(moves, me.sharp_left())) {
        move(me.sharp_left());
      } else if (_.contains(moves, me.left())) {
        move(me.left());
      } else if(_.contains(moves, me.straight())) {
        move(me.straight());
      } else if(_.contains(moves, me.right())) {
        move(me.right());
      } else {
        move(me.sharp_right());
      }
    }

    function spiral2(color)
    {
      if (_.contains(moves, me.sharp_right())) {
        move(me.sharp_right());
      } else if (_.contains(moves, me.right())) {
        move(me.right());
      } else if(_.contains(moves, me.straight())) {
        move(me.straight());
      } else if(_.contains(moves, me.left())) {
        move(me.left());
      } else {
        move(me.sharp_left());
      }
    }

    function choose_turn(color)
    {
      if(1 in moves)
      {
        move(1);
      }
      else
      {
        move(4);
      }
    }

    function move_straight(dir)
    {
      if(board_state.me.last_move == dir)
      {
        return ((dir - 1 + 6)%6);
      }
      else
      {
        return (dir);
      }
    }

    function phase2_choose(color)
    {
      var tag = false;
      for(i = 0 ; i < moves.length; i++)
      {
        if(moves[i] == board_state.me.last_move)
          tag = true;
      }
      if(tag && (board_state.me.last_move in moves))
      {
        move(board_state.me.last_move);
      }
      else
      {
        player_state.phase2 = true;
        phase3_choose(color);
      }
    }

    function phase4_choose(color)
    {
      var tag = false;
      for(i = 0 ; i < moves.length; i++)
      {
        if(moves[i] == board_state.me.last_move)
          tag = true;
      }
      if(tag)
      {
        move(board_state.me.last_move);
      }
      else
      {
        player_state.phase4 = true;
        phase5_choose(color);
      }
    }

    function phase5_choose(color)
    {
      if(color == "blue")
      {
        spiral2(color);
      }
      else
      {
        spiral(color);
      }
    }
})