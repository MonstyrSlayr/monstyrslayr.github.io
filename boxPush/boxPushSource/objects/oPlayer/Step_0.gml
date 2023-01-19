if (global.paused) exit;

vsp = vsp + oGame.grv;

if (place_meeting(x, y + vsp, oBox) || bbox_bottom + vsp >= oGame.ground)
{
	grounded = true;
}
else grounded = false;

if (oGame.gameStartT <= 0)
{
	#region movement
var move = 0;
	
move = keyboard_check(ord("D")) - keyboard_check(ord("A"));

if (move != 0) hsp = approach(hsp, move * maxWalkSpd, acc);
	
if (grounded) hsp = approach(hsp, 0, oGame.frict);

if (keyboard_check_pressed(vk_space)) && (grounded)
{
	vsp = -jumpHeight;
}
#endregion
}

#region boxPush
if (keyboard_check_pressed(vk_space)) && (rectangle_in_rectangle(bbox_left, bbox_top, bbox_right, bbox_bottom,
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
	
	create_pulse(xCen + (boxXCen - xCen)/2, yCen + (boxYCen - yCen)/2, c_orange);
}
#endregion

#region collision
if (place_meeting(x + hsp, y, oBox))
{
	var whileLoop = 0;
	while ((!place_meeting(x + sign(hsp), y, oBox) && (whileLoop < global.whileLeniency)))
	{
		x = x + sign(hsp);
		whileLoop++;
		show_debug_message("player x help " + string(whileLoop) + " " + string(whileLoop < global.whileLeniency));
	}
	hsp = 0;
}

if (place_meeting(x + hsp, y, oOpponent))
{
	while (!place_meeting(x + sign(hsp), y, oOpponent))
	{
		x = x + sign(hsp);
	}
	hsp = 0;
}

x = x + hsp;

if (place_meeting(x, y + 1, oOpponent))
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
		show_debug_message("player y help " + string(whileLoop) + " " + string(whileLoop < global.whileLeniency));
	}
	vsp = 0;
}

if (place_meeting(x, y + vsp, oOpponent))
{
	while (!place_meeting(x, y + sign(vsp), oOpponent))
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

if (place_meeting(x, y, oBox) || place_meeting(x, y, oOpponent))
{
	var walltime = 1;
		
	while (place_meeting(x, y, oBox) || place_meeting(x, y, oOpponent))
	{
		show_debug_message("player stuck! " + string(walltime))
		//check to the right
		if (!place_meeting(x + walltime, y, oBox) && !place_meeting(x + walltime, y, oOpponent))
		{
			x = x + walltime;
			break;
		}
			
		//check to the left
		if (!place_meeting(x - walltime, y, oBox) && !place_meeting(x - walltime, y, oOpponent))
		{
			x = x - walltime;
			break;
		}
			
		//check above
		if (!place_meeting(x, y - walltime, oBox) && !place_meeting(x, y - walltime, oOpponent))
		{
			y = y - walltime;
			break;
		}
			
		//check below
		if (!place_meeting(x, y + walltime, oBox) && !place_meeting(x, y + walltime, oOpponent))
		{
			y = y + walltime;
			break;
		}
			
		walltime++;
	}
}
#endregion