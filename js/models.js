/*--Calls------------*/

var Calls = {
	"container" : "#call-list",
	"template" : "#templates .call"
};

Calls.load = function(n){
	var contact, clone;
	for (var i = n - 1; i >= 0; i--){
		contact = (Math.random() > 0.5) ? true : false;
		clone = $(this.template).clone();
		if(contact){
			clone.find('.name').html("First Last");	
			clone.find('.number').html("Number Type");	
		}
		$(this.container).append(clone);
	};	
}


/*--Contacts------------*/

var Contacts = {
	"container" : "#contact-list",
	"template" : "#templates .contact"
};

Contacts.load = function(n){
	var state, clone;
	for (var i = n - 1; i >= 0; i--){
		clone = $(this.template).clone();
		$(this.container).append(clone);
	};	
}

/*--Voicemails------------*/

var Voicemails = {
	"container" : "#voicemail-list",
	"template" : "#templates .voicemail"
};

Voicemails.load = function(n){
	var contact, unread, urgent, confidential, clone;
	for (var i = n - 1; i >= 0; i--){
		contact = (Math.random() > 0.5) ? true : false;
		unread = (Math.random() > 0.5) ? true : false;
		urgent = (Math.random() > 0.5) ? true : false;
		confidential = (Math.random() > 0.5) ? true : false;
		clone = $(this.template).clone();
		if(contact){
			clone.find('.name').html("First Last");	
		}
		if(unread){
			clone.addClass("unread");
		}
		if(urgent){
			clone.addClass("unread");
		}
		if(confidential){
			clone.addClass("confidential");
		}
		$(this.container).append(clone);
	};	
}

/*--Conversations------------*/

var Conversations = {
	"container" : "#conversation-list",
	"template" : "#templates .conversation"
};

Conversations.load = function(n){
	var contact, clone;
	for (var i = n - 1; i >= 0; i--){
		contact = (Math.random() > 0.5) ? true : false;
		clone = $(this.template).clone();
		if(contact){
			clone.find('.name').html("First Last");	
		}
		$(this.container).append(clone);
	};	
}


/*--Messages------------*/

var Messages = {
	"container" : "#message-list",
	"template" : "#templates .message"
};

Messages.load = function(n){
	var state, length, clone;
	var content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed placerat lacus, at tincidunt ante. Vivamus neque velit, lobortis vel sapien viverra fusce."
	var contact = (Math.random() > 0.5) ? true : false;
	for (var i = n - 1; i >= 0; i--){
		state = (Math.random() > 0.5) ? "incoming" : "outgoing";
		length = Math.floor((Math.random()*162)+1);
		clone = $(this.template).clone();
		clone.addClass(state);
		clone.find('.copy').html(content.substring(0, length));
		if(contact && state == "incoming"){
			clone.find('.name').html("First Last");	
		}else if(state == "outgoing"){
			clone.find('.name').html("123-456-7890");	
		}
		$(this.container).append(clone);
	};	
}

/*--Recipients------------*/

var Recipients = {
	"container" : "#recipient-list",
	"template" : "#templates .recipient"
};

Recipients.load = function(n){
	var clone;
	for (var i = n - 1; i >= 0; i--){
		clone = $(this.template).clone();
		$(this.container).append(clone);
	};	
}