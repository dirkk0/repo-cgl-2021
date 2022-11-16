extends MeshInstance


func _ready():
	pass # Replace with function body.

func activate():
	print("activate on plane")
	if Global.found_key:
		visible = false
		get_node("StaticBody/CollisionShape").disabled = true
		pass
