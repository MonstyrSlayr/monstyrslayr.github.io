// Script assets have changed for v2.3.0 see
// https://help.yoyogames.com/hc/en-us/articles/360005277377 for more information
function create_pulse(x, y, color)
{
	var pulse = instance_create_layer(x, y, "Pulse", oPulse);
	
	with (pulse)
	{
		pulseColor = color;
	}
}