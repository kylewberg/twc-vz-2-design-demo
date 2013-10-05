/*--Modal------------*/

var Modal = {
	"title" : "#modal-title",
	"content" : "#modal-content",
	"defaultTemplate" : "#default-modal",
	"buttons" : {
		"close" : "#modal-close",
		"confirm" : "#modal-confirm-button",
		"deny" : "#modal-deny-button"
	}
}

Modal.init = function(id){
	var title, message, template, clone, buttons;
	
	switch(id) {	
		case 0:
		    title = "Forgot Username";
			message = "Click below to retrieve username";
			buttons = {
				"confirm" : {
					"label" : "Retrieve",
					"action" : function(){
						Modal.close();
					}
				}
			}
			break;
		case 1:
		    title = "Forgot Password";
			message = "Click below to retrieve password";
			buttons = {
				"confirm" : {
					"label" : "Retrieve",
					"action" : function(){
						Modal.close();
					}
				}
			}
			break;	
		case 2:
		    title = "Voicemail Pin";
			message = "";
			template = "#enter-pin-modal";
			buttons = {
				"confirm" : {
					"label" : "Submit",
					"action" : function(){
						App.navigate('voicemails');
					}
				},
				"deny" : {
					"label" : "Cancel",
					"action" : function(){}
				}
			}
			break;												
		default: 
			title = "Notice";	
			message = "Default Content";
			buttons = {
				"confirm" : {
					"label" : "Okay",
					"action" : function(){}
				},
				"deny" : {
					"label" : "Cancel",
					"action": function(){}
				}
			}
	}	
	
	//modal title
	$(this.title).html(title);
	
	//modal content
	if(template){
		clone = $('#modals '+template).clone();
	}else{
		clone = $('#modals '+this.defaultTemplate).clone();
		if(message){
			clone.html(message);	
		}
	}
	$(this.content).html(clone);
	
	//modal buttons	
	if(buttons.confirm){
		$(this.buttons.confirm).html(buttons.confirm.label).show();
		$(this.buttons.confirm).click(function(){
			Modal.close();
			buttons.confirm.action();
		});
	}else{
		$(this.buttons.confirm).hide();		
	}
	
	if(buttons.deny){
		$(this.buttons.deny).html(buttons.deny.label).show();
		$(this.buttons.deny).click(function(){
			Modal.close();
			buttons.deny.action();
		});
	}else{
		$(this.buttons.deny).hide();
	}
	
}

Modal.close = function(){
	App.hideModal();
}

$(document).ready(function(){
	$(Modal.buttons.close).click(function(){Modal.close();});	
});
