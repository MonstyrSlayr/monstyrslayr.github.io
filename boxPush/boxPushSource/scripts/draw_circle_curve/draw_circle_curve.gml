function draw_circle_curve(x, y, radius, bones, angle, angleadd, width, outline)
{
	/*
	x,y — Center of circle.
	r — Radius.
	bones — Amount of bones. More bones = more quality, but less speed. Minimum — 3.
	ang — Angle of first circle's point.
	angadd — Angle of last circle's point (relative to ang). 
	width — Width of circle (may be positive or negative).
	outline — 0 = curve, 1 = sector. 
	*/

	var xx,yy,R,B,A,Aa,W,a,lp,lm,dp,dm,AAa,Wh,Out;
	
	xx = x;
	yy = y;
	R = radius;
	B = max(3,bones);
	A = angle;
	Aa = angleadd;
	W = width;
	Out = outline;

	a = Aa / B;
	Wh = W / 2;
	lp = R + Wh;
	lm = R - Wh;
	AAa = A + Aa;
	
	if (Out)
	{
		//OUTLINE
		draw_primitive_begin(pr_trianglestrip); //Change to pr_linestrip, to see how it works.
		
		draw_vertex(xx+lengthdir_x(lm,A),yy+lengthdir_y(lm,A)); //First point.
		
		for (var i = 1; i <= B; i += 1)
		{
			dp = A + a * i;
			dm = dp - a;
			draw_vertex(xx+lengthdir_x(lp,dm),yy+lengthdir_y(lp,dm));
			draw_vertex(xx+lengthdir_x(lm,dp),yy+lengthdir_y(lm,dp));
		}
		
		draw_vertex(xx+lengthdir_x(lp,AAa),yy+lengthdir_y(lp,AAa));
		draw_vertex(xx+lengthdir_x(lm,AAa),yy+lengthdir_y(lm,AAa)); //Last two points to make circle look right.
		//OUTLINE
	}
	else
	{
		//SECTOR
		draw_primitive_begin(pr_trianglefan); //Change to pr_linestrip, to see how it works.
		draw_vertex(xx,yy); //First point in the circle's center.
		
		for (var i = 1; i <= B; i += 1)
		{
			dp = A + a * i;
			dm = dp - a;
			draw_vertex(xx+lengthdir_x(lp,dm),yy+lengthdir_y(lp,dm));
		}
		
		draw_vertex(xx+lengthdir_x(lp,AAa),yy+lengthdir_y(lp,AAa)); //Last point.
		//SECTOR
	}
	draw_primitive_end();
}
