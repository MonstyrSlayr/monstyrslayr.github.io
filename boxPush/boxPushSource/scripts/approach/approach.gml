// Script assets have changed for v2.3.0 see
// https://help.yoyogames.com/hc/en-us/articles/360005277377 for more information
function approach(start, finish, increment)
{
	if (start != finish) && (increment != 0)
	{
		var diff = finish - start;
		
		if (sign(diff) == -1) && (sign(increment) == 1) increment *= -1;
		if (sign(diff) == 1) && (sign(increment) == -1) increment *= -1;
	
		start = start + increment;
		
		if (sign(diff) == 1)
		{
			start = clamp(start, start, finish);
		}
		else start = clamp(start, finish, start);
	}
	
	return start;
}