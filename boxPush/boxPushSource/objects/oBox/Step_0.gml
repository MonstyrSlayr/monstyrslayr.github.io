if (global.paused) exit;

vsp = vsp + oGame.grv;

pushRegion = max(4, abs(hsp * 2));

if (bbox_bottom + vsp >= oGame.ground)
{
	grounded = true;
}
else grounded = false;

if (grounded) hsp = approach(hsp, 0, oGame.frict);

#region collision
var plrCol = false;
var oppCol = false;

if (place_meeting(x + hsp, y, oPlayer))
{
	plrCol = true;
}

if (place_meeting(x + hsp, y, oOpponent))
{
	oppCol = true;
}

x = x + hsp;

if (plrCol)
{
	oPlayer.x += hsp;
}

if (oppCol)
{
	oOpponent.x += hsp;
}

if (bbox_bottom + vsp > oGame.ground)
{
	while (bbox_bottom > oGame.ground)
	{
		y = y - 1;
	}
	y = y + 1;
	vsp = 0;
}

y = y + vsp;
#endregion

//end con
if (x < 0)
{
	global.oppPoints++;
	room_restart();
}

if (x > room_width)
{
	global.plrPoints++;
	room_restart();
}

for (var i = array_length(daPushArr) - 1; i >= 0; i--)
{
	daPushArr[i + 1] = daPushArr[i];
}

if (array_length(daPushArr) > daPushMax) array_resize(daPushArr, daPushMax);

if (daPushTime > 0)
{
	daPushArr[0] = {};
	daPushArr[0].x = id.x;
	daPushArr[0].y = id.y;
}
else
{
	daPushArr[0] = undefined;
}

//if (daPushTime < -daPushMax) daPushArr = [];

daPushTime--;
iFrames--;