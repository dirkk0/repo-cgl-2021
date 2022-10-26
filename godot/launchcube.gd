extends Spatial

export var inc = 0.08

func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	get_node("Cube").translation.y += inc
	pass
