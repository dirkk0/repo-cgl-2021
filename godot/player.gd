extends KinematicBody

var velocity:Vector3

export var acceleration = 5
export var speed = 10
var mouse_sensitivity = 0.3
var gravity = 0.98
export var jump_power = 35.0

var paused = false

# Called when the node enters the scene tree for the first time.
func _ready():
	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	pass # Replace with function body.

func _physics_process(delta):
	var aim = get_node("Head/Camera").get_camera_transform().basis
	var direction:Vector3 = Vector3.ZERO
	if Input.is_action_just_pressed("ui_cancel"):
		if not paused:
			Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
			paused = true
		else:
			Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
			paused = false
		# get_tree().quit()

	if Input.is_action_pressed("ui_f"):
		OS.window_fullscreen = !OS.window_fullscreen
	if Input.is_action_pressed("ui_w"):
		direction = -aim.z
	if Input.is_action_pressed("ui_s"):
		direction = aim.z
	if Input.is_action_pressed("ui_a"):
		direction = -aim.x
	if Input.is_action_pressed("ui_d"):
		direction = aim.x
	if Input.is_action_just_pressed("ui_select"):
		print("you pressed space")
		velocity.y += 35.0
		pass
	
	direction = direction.normalized()
	velocity = velocity.linear_interpolate(direction * speed, acceleration * delta)
	velocity.y = velocity.y - gravity
	move_and_slide(velocity)
	

	if Input.is_action_pressed("ui_e"):
		var raycast = get_node("Head/Camera/RayCast")
		var body = raycast.get_collider()
		if body:
			print(body.name)
			if body.is_in_group("launchgroup"):
				# var cube = body.get_parent().get_parent()
				var cube = body.get_parent()
				if cube.has_method("activate"):
					cube.activate()
					#print("I see a body", str(body))

func _input(event):
	if event is InputEventMouseMotion:
		if not paused:
			var cam = get_node("Head/Camera")
			self.rotate_y(deg2rad(-event.relative.x * mouse_sensitivity))
			cam.rotate_x(deg2rad(-event.relative.y * mouse_sensitivity))
			cam.rotation.x = clamp(cam.rotation.x, -PI*0.3, PI*0.3)
	
