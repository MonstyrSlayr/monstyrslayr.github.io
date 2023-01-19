if (global.paused) exit;

vsp = vsp + oGame.grv;

if (place_meeting(x, y + vsp, oBox) || bbox_bottom + vsp >= oGame.ground)
{
	grounded = true;
}
else grounded = false;

if (oGame.gameStartT <= 0)
{
	if (global.bot)
	{
		if (global.difficulty > -1)
		{
			#region bot
			//if the box is to the right of you, go right
			if (bbox_left <= oBox.bbox_right)
			{
				rightPress = true;
				leftPress = false;
			}
			//if the box is to the left of you, go left
			else if (bbox_left > oBox.bbox_right)
			{
				leftPress = true
				rightPress = false;
			}

			if (global.difficulty > 0)
			{
				//if you are on the wrong side of the box, jump over the box
				if (bbox_right < oBox.bbox_left) && (bbox_right + (hsp * 4) > oBox.bbox_left) && (grounded)
				{
					jumpPress = true;
				}
			}

			if (global.difficulty > 1)
			{
				//if the player is blocking the way, jump over the player
				if (bbox_left > oPlayer.bbox_right) && (bbox_left + (hsp * 4) < oPlayer.bbox_right) && (grounded)
				{
					jumpPress = true;
				}
			}

			//if you are touching the correct side of the box, push it
			if (pushT < 0) && (bbox_left >= oBox.bbox_right) && (rectangle_in_rectangle(bbox_left, bbox_top, bbox_right, bbox_bottom,
							oBox.bbox_left - oBox.pushRegion, oBox.bbox_top - oBox.pushRegion, oBox.bbox_right + oBox.pushRegion, oBox.bbox_bottom + oBox.pushRegion))
			{
				jumpPress = true;
				pushT = pushCooldown;
			}
	
			switch (global.difficulty)
			{
				case 0: pushCooldown = 60; maxWalkSpd = 3; break;
				case 1: pushCooldown = 30; maxWalkSpd = 4.5; break;
				case 2: pushCooldown = 6; maxWalkSpd = 6; break;
			}

			#endregion
		}
		else
		{
			leftPress = false;
			rightPress = false;
			upPress = false;
			jumpPress = false;
		}
	}
	
	#region move
	var move = 0;
	
	move = rightPress - leftPress;

	if (move != 0) hsp = approach(hsp, move * maxWalkSpd, acc);
	
	if (grounded) hsp = approach(hsp, 0, oGame.frict);

	if (jumpPress) && (grounded)
	{
		vsp = -jumpHeight;
	}
	#endregion
}

if (jumpPress) && (rectangle_in_rectangle(bbox_left, bbox_top, bbox_right, bbox_bottom,
				oBox.bbox_left - oBox.pushRegion, oBox.bbox_top - oBox.pushRegion, oBox.bbox_right + oBox.pushRegion, oBox.bbox_bottom + oBox.pushRegion))
					&& (oBox.iFrames < 0)
{
	var playerX = bbox_left + (bbox_right - bbox_left)/2;
	var boxX = oBox.bbox_left + (oBox.bbox_right - oBox.bbox_left)/2;
	var playerY = bbox_top + (bbox_bottom - bbox_top)/2;
	var boxY = oBox.bbox_top + (oBox.bbox_bottom - oBox.bbox_top)/2;
	
	var xdist = boxX - playerX;
	var ydist = boxY - playerY;
	
	var total = abs(ydist) + abs(xdist);
	
	var extraX = 1; //mult
	var extraY = 0; //add
	
	if (!oBox.grounded)
	{
		extraX += 2;
		extraY += -abs(ydist*2);
	}
	
	oBox.hsp = ((xdist/total) * pushForce) * extraX;
	
	if (keyboard_check(ord("W")))
	{
		extraY += -abs(ydist*4);
	}
	
	oBox.vsp = (((ydist*2) + extraY)/total) * pushForce;
	oBox.iFrames = oBox.iFrameMax;
	oBox.daPushTime = oBox.daPushMax;
	
	var xCen = bbox_right - (bbox_right - bbox_left)/2;
	var yCen = bbox_bottom - (bbox_bottom - bbox_top)/2;
	
	var boxXCen = oBox.bbox_right - (oBox.bbox_right - oBox.bbox_left)/2;
	var boxYCen = oBox.bbox_bottom - (oBox.bbox_bottom - oBox.bbox_top)/2;
	
	create_pulse(xCen + (boxXCen - xCen)/2, yCen + (boxYCen - yCen)/2, c_red);
}

#region collision
if (place_meeting(x + hsp, y, oBox))
{
	var whileLoop = 0;
	while ((!place_meeting(x + sign(hsp), y, oBox) && (whileLoop < global.whileLeniency)))
	{
		x = x + sign(hsp);
		whileLoop++;
		show_debug_message("bot x help " + string(whileLoop) + " " + string(whileLoop < global.whileLeniency));
	}
	hsp = 0;
}

if (place_meeting(x + hsp, y, oPlayer))
{
	while (!place_meeting(x + sign(hsp), y, oPlayer))
	{
		x = x + sign(hsp);
	}
	hsp = 0;
}

x = x + hsp;

if (place_meeting(x, y + 1, oPlayer))
{
	vsp = -jumpHeight/2;
}

if (place_meeting(x, y + vsp, oBox))
{
	var whileLoop = 0;
	while ((!place_meeting(x, y + sign(vsp), oBox)) && (whileLoop < global.whileLeniency))
	{
		y = y + sign(vsp);
		whileLoop++;
		show_debug_message("bot y help " + string(whileLoop) + " " + string(whileLoop < global.whileLeniency));
	}
	vsp = 0;
}

if (place_meeting(x, y + vsp, oPlayer))
{
	while (!place_meeting(x, y + sign(vsp), oPlayer))
	{
		y = y + sign(vsp);
	}
	vsp = 0;
}

if (bbox_bottom + vsp > oGame.ground)
{
	while (bbox_bottom + sign(vsp) > oGame.ground)
	{
		y = y - 1;
	}
	y = y + 1;
	vsp = 0;
}

y = y + vsp;
#endregion

jumpPress = false;
pushT--;

if (place_meeting(x, y, oBox))
{
	var walltime = 1;
		
	while (place_meeting(x, y, oBox))
	{
		show_debug_message("bot stuck! " + string(walltime))
		//check to the right
		if (!place_meeting(x + walltime, y, oBox))
		{
			x = x + walltime;
			break;
		}
			
		//check to the left
		if (!place_meeting(x - walltime, y, oBox))
		{
			x = x - walltime;
			break;
		}
			
		//check above
		if (!place_meeting(x, y - walltime, oBox))
		{
			y = y - walltime;
			break;
		}
			
		//check below
		if (!place_meeting(x, y + walltime, oBox))
		{
			y = y + walltime;
			break;
		}
			
		walltime++;
	}
}