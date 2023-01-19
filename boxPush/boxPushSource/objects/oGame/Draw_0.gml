#region draw ground
var groundWidth = 24;

draw_rectangle_color(-1, ground, room_width + 1, room_height + 1,
	oSettings.groundTypes[global.groundNum].color, oSettings.groundTypes[global.groundNum].color, oSettings.groundTypes[global.groundNum].color, oSettings.groundTypes[global.groundNum].color,
		false);

draw_line_width_color(-1, ground + groundWidth/2, room_width + 1, ground + groundWidth/2, groundWidth, c_black, c_black);

draw_set_alpha(0.5);
#endregion

#region box stuffs
var boxX = room_width/2;
var boxY = room_height * 0.9;
var arrowFactor = 4;

draw_sprite(sBox, 0, boxX, boxY);

draw_set_color(c_red);
draw_arrow(boxX, boxY - sprite_get_height(sBox)/2, boxX + box.hsp * arrowFactor, boxY - sprite_get_height(sBox)/2 + box.vsp * arrowFactor, 10);
draw_set_color(c_black);

draw_set_alpha(1);

draw_set_halign(fa_left);
draw_set_valign(fa_top);

draw_text(padding, ground + groundWidth + padding,
				"Friction Coefficient: " + string(frict) +
					"\nGravity Coefficient: " + string(grv) +
						"\nBox hspeed :" + string(box.hsp) +
							"\nBox vspeed :" + string(box.vsp));
#endregion

#region daPoints
draw_set_halign(fa_center);
draw_text(room_width/2, padding, "Score:\n" + string(global.plrPoints) + " - " + string(global.oppPoints));
#endregion

#region countdown
var count = floor(gameStartT/secondFrame);

if (count == 0) count = "Go";

draw_set_halign(fa_center);

if (gameStartT >= 0)
{
	draw_text(room_width/2, room_height/2, string(count));
}

if (!global.paused) gameStartT--;
#endregion

grv = settings.gravitTypes[global.gravitNum].grv;
frict = settings.groundTypes[global.groundNum].frict;

if (keyboard_check_pressed(ord("R")))
{
	room_restart();
}