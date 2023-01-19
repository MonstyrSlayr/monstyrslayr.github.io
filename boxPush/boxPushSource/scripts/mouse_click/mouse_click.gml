// Script assets have changed for v2.3.0 see
// https://help.yoyogames.com/hc/en-us/articles/360005277377 for more information
function mouse_click(x1, y1, x2, y2)
{
	return (mouse_check_button_pressed(mb_left)) && (point_in_rectangle(mouse_x, mouse_y, x1, y1, x2, y2))
}