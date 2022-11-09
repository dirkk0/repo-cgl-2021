extends KinematicBody

var gravity = -9.8

# state machine
var is_on_ground = false
var is_scanning = false
var is_following = false

var player_pos
var agent_pos

onready var my_label = get_node("Label3D")


func _ready():
	pass # Replace with function body.
	
func think():
	pass
	# var player = get_node("/root/Main/Player")
	var player = get_node("%Player")
	# print(player.translation)
	get_node("%Label").text = str(player.translation)
	
	player_pos = player.translation
	agent_pos = self.translation
	
	var body = get_node("GroundRayCast").get_collider()
	if body:
		if body.is_in_group("ground"):
			# print(body.is_in_group("ground"))
			is_on_ground = true

	
	#  is_scanning:
	body = get_node("Nose/LookRayCast").get_collider()
	if body:
		if body.is_in_group("player"):
			# print("I see the player")
			my_label.text = "I see you!"
			is_scanning = false
			is_following = true
	else:
		my_label.text = "where are you?"
		is_scanning = true
		is_following = false

	
	if is_on_ground == true and not is_following:
		is_scanning = true
		pass


	if is_scanning:
		my_label.text = "I am scanning!"
		self.rotate_y(0.1)
		

func _physics_process(odelta):
	var direction:Vector3 = Vector3(0.0, 0.0, 0.0) 
	# Vector3.ZERO
	var velocity:Vector3 = Vector3.ZERO
	
	if is_following:
		my_label.text = "I am following you!"
		# chase the player
		velocity = -(agent_pos - player_pos)
		is_scanning = false

	think()
	
	velocity.y += gravity
	move_and_slide(velocity)

func _on_Timer_timeout():
	print("timer")
	# think()
	pass # Replace with function body.
