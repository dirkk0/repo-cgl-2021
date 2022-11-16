extends Node2D

# var click_counter = 0

func _ready():
	pass # Replace with function body.

func _on_Button_pressed():
	print("button is pressed")
	get_tree().change_scene("res://main.tscn")
	pass # Replace with function body.


func _on_ClickButton_pressed():
	Global.other_counter += 1
	get_node("ClickButton").text = str(Global.other_counter) + " clicks!"
	pass # Replace with function body.
