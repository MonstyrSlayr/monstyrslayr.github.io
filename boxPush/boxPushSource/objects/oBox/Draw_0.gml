draw_set_alpha(0.5);
draw_rectangle_color(bbox_left - pushRegion, bbox_top - pushRegion, bbox_right + pushRegion, bbox_bottom + pushRegion, c_lime, c_lime, c_lime, c_lime, false);
draw_set_alpha(1);

for (var i = 0; i < array_length(daPushArr); i++)
{
	if (!is_undefined(daPushArr[i]))
	{
		var inv = daPushMax - i;
	
		draw_sprite_ext(sprite_index, image_index, daPushArr[i].x, daPushArr[i].y, image_xscale, image_yscale, image_angle, c_lime, (inv/daPushMax) * 0.5);
		//draw_text(daPushArr[i].x, daPushArr[i].y, string(i));
	}
}

draw_self();