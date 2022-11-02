extends Spatial

export var inc = 0.08

var is_launching = false

func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if is_launching:
		get_node("Cube").translation.y += inc
		pass

func activate():
	if not is_launching:
		print("i am activated!")
	is_launching = true
