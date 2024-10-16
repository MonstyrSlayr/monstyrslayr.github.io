if (t > pulseTime) instance_destroy();

draw_set_alpha((pulseTime - t)/pulseTime);
draw_set_color(pulseColor);
draw_circle_curve(x, y, ease_out_quad(t, 0, pulseRadMax, pulseTime), 36, 0, 360, pulseWidth, true);
draw_set_alpha(1);

t++;