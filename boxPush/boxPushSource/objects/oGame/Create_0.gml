depth = -100;
draw_set_font(fMain);

base_width = room_width;
base_height = room_height;
width = base_width;
height = base_height;

frict = 0.4;
grv = 1;
ground = room_height * 0.6;

playerDist = room_width * 0.4;

player =	instance_create_layer(room_width/2 - playerDist/2, ground + 32, "Instances", oPlayer);
box =		instance_create_layer(room_width/2, ground, "Instances", oBox);
opponent =	instance_create_layer(room_width/2 + playerDist/2, ground, "Instances", oOpponent);
settings =	instance_create_layer(0, 0, "Pulse", oSettings);

secondFrame = 20;
gameStartCountdown = secondFrame * 4;
gameStartT = gameStartCountdown;
	
global.paused = false;

padding = 8;

if (!variable_global_exists("init"))
{
	global.plrPoints = 0;
	global.oppPoints = 0;

	global.groundNum = 1;
	global.gravitNum = 1;
	global.bot = true;
	
	global.whileLeniency = 16;
	
	global.difficulty = 1;
	
	var ratio = 1;
	//window_set_size(640 * ratio, 480 * ratio);

	global.init = true;
	
	global.botDifficultyMax = 2;
	global.showControls = true;
	settings.panelOpen = true;
}