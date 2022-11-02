extends KinematicBody

var velocity:Vector3

var acceleration = 5
var speed = 10
var mouse_sensitivity = 0.3
var gravity = 0.98

# Called when the node enters the scene tree for the first time.
func _ready():
	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	pass # Replace with function body.

func _physics_process(delta):
	var aim = get_node("Head/Camera").get_camera_transform().basis
	var direction:Vector3 = Vector3.ZERO
	if Input.is_action_just_pressed("ui_cancel"):
		# Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
		get_tree().quit()
	if Input.is_action_pressed("ui_w"):
		direction = -aim.z
	if Input.is_action_pressed("ui_s"):
		direction = aim.z
	if Input.is_action_pressed("ui_a"):
		direction = -aim.x
	if Input.is_action_pressed("ui_d"):
		direction = aim.x
	if Input.is_action_just_pressed("ui_select"):
		pass
	
	direction = direction.normalized()
	velocity = velocity.linear_interpolate(direction * speed, acceleration * delta)
	velocity.y = velocity.y - gravity
	move_and_slide(velocity)

func _input(event):
	if event is InputEventMouseMotion:
		var cam = get_node("Head/Camera")
		self.rotate_y(deg2rad(-event.relative.x * mouse_sensitivity))
		cam.rotate_x(deg2rad(-event.relative.y * mouse_sensitivity))
		cam.rotation.x = clamp(cam.rotation.x, -PI*0.3, PI*0.3)
	
