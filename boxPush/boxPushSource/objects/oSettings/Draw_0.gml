var buttonSize = 64;
var panelWidth = 256 + 128;

if (global.showControls)
{
	panelWidth = 1024;
}

var panelStart = ease_out_quad(panelOpenT, 0, panelWidth, panelTime);

var button =
{
	x1: room_width - oGame.padding - buttonSize - panelStart,
	x2: room_width - oGame.padding - panelStart,
	y1: oGame.padding,
	y2: oGame.padding + buttonSize
}

draw_rectangle_color(button.x1, button.y1, button.x2, button.y2, c_fuchsia, c_fuchsia, c_fuchsia, c_fuchsia, false);

if (panelOpen)
{
	panelOpenT++;
	global.paused = true;
}
else
{
	panelOpenT--;
	global.paused = false;
}

panelOpenT = clamp(panelOpenT, 0, panelTime);

if (mouse_click(button.x1, button.y1, button.x2, button.y2)) || (keyboard_check_pressed(vk_escape))
{
	panelOpen = !panelOpen;
	global.showControls = false;
}

draw_set_alpha(0.75);
draw_rectangle_color(room_width + 1 - panelStart, -1, room_width + 1, room_height + 1, c_dkgray, c_dkgray, c_gray, c_gray, false);
draw_set_alpha(1);

var panelMid = room_width - panelStart + panelWidth/2;
var rowHeight = string_height("bruh") + oGame.padding;
var triangleHeight = rowHeight;
var triangleWidth = triangleHeight/2;

var daRow = 0;

draw_set_color(c_white);
draw_set_halign(fa_center);
draw_set_valign(fa_top);

if (global.showControls)
{
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Info:");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "You are the orange cube.");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Your goal is to push the brown box to the right.");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "The red cube will try to stop you.");
	daRow += 2;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Controls:");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Use WASD to move");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Use SPACEBAR to jump and to push the box");
	daRow++;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "Use ESCAPE to pause the game and configure physics options");
	daRow += 2;
	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight), "(Press ESCAPE to continue to game)");
}
else
{
	#region ground
	var daString = "Ground Type:";

	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight * 3), daString);
	draw_text(panelMid, oGame.padding + rowHeight * 2 + (daRow * rowHeight * 3), groundTypes[global.groundNum].name);

	//left
	draw_triangle(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.groundNum--;
					if (global.groundNum < 0) global.groundNum = array_length(groundTypes) - 1;
				}

	//right
	draw_triangle(panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.groundNum++;
					if (global.groundNum > array_length(groundTypes) - 1) global.groundNum = 0;
				}
	#endregion

	daRow++;

	#region gravit
	var daString = "Gravity Type:";

	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight * 3), daString);
	draw_text(panelMid, oGame.padding + rowHeight * 2 + (daRow * rowHeight * 3), gravitTypes[global.gravitNum].name);

	//left
	draw_triangle(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.gravitNum--;
					if (global.gravitNum < 0) global.gravitNum = array_length(gravitTypes) - 1;
				}

	//right
	draw_triangle(panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.gravitNum++;
					if (global.gravitNum > array_length(gravitTypes) - 1) global.gravitNum = 0;
				}
	#endregion

	daRow++;

	#region bot
	var daString = "Bot Difficulty:";

	draw_text(panelMid, oGame.padding + rowHeight + (daRow * rowHeight * 3), daString);
	draw_text(panelMid, oGame.padding + rowHeight * 2 + (daRow * rowHeight * 3), string(global.difficulty));

	//left
	draw_triangle(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid - string_width(daString)/2 - oGame.padding*2 - triangleWidth, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid - string_width(daString)/2 - oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.difficulty--;
					if (global.difficulty < -1) global.difficulty = global.botDifficultyMax;
				}

	//right
	draw_triangle(panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + (daRow * rowHeight * 3),
						panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
							panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3),
								false);
				if (mouse_click(panelMid + string_width(daString)/2 + oGame.padding*2, oGame.padding + rowHeight * 1.5 - triangleHeight/2 + (daRow * rowHeight * 3),
									panelMid + string_width(daString)/2 + oGame.padding*2 + triangleWidth, oGame.padding + rowHeight * 1.5 + triangleHeight/2 + (daRow * rowHeight * 3)))
				{
					global.difficulty++;
					if (global.difficulty > global.botDifficultyMax) global.difficulty = -1;
				}
	#endregion
}