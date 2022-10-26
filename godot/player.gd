extends KinematicBody

var inc = 0.0

# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

func _physics_process(delta):
	if Input.is_action_just_pressed("ui_w"):
		print("you hit W")

	if Input.is_action_just_pressed("ui_right"):
		inc = 0.2
	if Input.is_action_just_pressed("ui_left"):
		inc = -0.2
	if Input.is_action_just_pressed("ui_select"):
		inc = 0
	
	translation.x += inc
	pass
