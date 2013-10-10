var testContent = {
	"contact" : {
		"name" : "Contact Name",
		"number" : "000-000-0000",
		"type" : "Number Type"
	},
	"identifier" : {
		"call" : "Call Identifier",
		"voicemail" : "Voicemail Identifier"
	}
}

/*--Calls Frame------------*/




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
			clone.find('.name').html(testContent.contact.name);	
			clone.find('.number').html(testContent.contact.type);	
		}else{
			clone.find('.name').html(testContent.identifier.call);	
			clone.find('.number').html(testContent.contact.number);			
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
		clone.find('.name').html(testContent.contact.name);	
		$(this.container).append(clone);
	};	
}

/*--Change Contact------------*/

var ChangeContactFrame = {
	"el" : "#contact-change",
	"title" : "#contact-change-title",
	"buttons" : {
		"addImage" : "#add-image-button",
		"removeImage" : "#remove-image-button",
		"changeImage" : "#change-image-button"
	},
	"inputs" : {
		"number" : "input.number",
		"firstName" : "#first-name",
		"lastName" : "#last-name",
		"nickName" : "#nick-name"
	}
};

ChangeContactFrame.modify = function(mode){
	if(mode == "add"){
		$(this.title).html("Add Contact");
		$(this.buttons.addImage).show();
		$(this.buttons.removeImage).hide();
		$(this.buttons.changeImage).hide();
		$(this.inputs.number).val("");
		$(this.inputs.firstName).val("");
		$(this.inputs.lastName).val("");
	}else{ //default is edit
		$(this.title).html("Edit Contact");
		$(this.buttons.addImage).hide();
		$(this.buttons.removeImage).show();
		$(this.buttons.changeImage).show();
		$(this.inputs.number).val("000-000-0000");
		$(this.inputs.firstName).val("First");
		$(this.inputs.lastName).val("Last");
	}
}

/*--Voicemails------------*/

var Voicemails = {
	"container" : "#voicemail-list",
	"template" : "#templates .voicemail"
};

Voicemails.load = function(n){
	var contact, unread, urgent, confidential, transcript, clone;
	var content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed placerat lacus, at tincidunt ante. Vivamus neque velit, lobortis vel sapien viverra fusce."	
	for (var i = n - 1; i >= 0; i--){
		contact = (Math.random() > 0.5) ? true : false;
		unread = (Math.random() > 0.7) ? true : false;
		urgent = (Math.random() > 0.7) ? true : false;
		confidential = (Math.random() > 0.7) ? true : false;
		transcript = true;
		clone = $(this.template).clone();
		if(contact){
			clone.find('.name').html(testContent.contact.name);	
			clone.find('.number').html(testContent.contact.type);	
		}else{
			clone.find('.name').html(testContent.identifier.voicemail);	
			clone.find('.number').html(testContent.contact.number);			
		}
		if(unread){
			clone.addClass("unread");
		}
		if(urgent){
			clone.addClass("urgent");
		}
		if(confidential){
			clone.addClass("confidential");
		}
		if(transcript){
			clone.addClass("has-copy");
			clone.find('.copy').html(content);			
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
			clone.find('.name').html(testContent.contact.name);	
			clone.find('.number').html(testContent.contact.type);	
		}else{
			clone.find('.name').html(testContent.contact.number);	
			clone.find('.number').html("");			
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
		length = Math.floor((Math.random()*160)+1);
		clone = $(this.template).clone();
		clone.addClass(state);
		clone.find('.copy').html(content.substring(0, length));
		if(contact && state == "incoming"){
			clone.find('.name').html(testContent.contact.name);	
		}else if(state == "outgoing"){
			clone.find('.name').html("123-456-7890");	
		}
		$(this.container).append(clone);
	};	
}

/*--SMS Conversations Frame------------*/

App.conversations = {
	"buttons" : {
		"new" : "#new-sms-button"
	}
}

$(document).ready(function(){
	$(App.conversations.buttons["new"]).click(function(){App.navigate("sms-conversation-new");});
});

/*--SMS Conversation Frame------------*/

App.conversation = {
	"frame" : App.elements.frames["sms-conversation"],
	"backLink" : "#sms-back",
	"buttons" : {
		"edit" : "#edit-conversation-button",
		"cancel" : "#cancel-delete-button",
		"deleteSelected" : "#delete-selected-button",
		"deleteAll" : "#delete-all-button",
		"send" : "#send-message-button"
	},
	"inputs" : {
		"deleteCheckbox" : ".delete-message",
		"messageContent" : "#message-content"
	},
	"outputs" : {
		"deleteSelectedCount" : "#delete-selected-count"
	}
}

App.conversation.enableDeleteMode = function(){
	$(this.frame).addClass("delete-mode");	
	this.updateDeleteButton();
}

App.conversation.disableDeleteMode = function(){
	$(this.frame).removeClass("delete-mode");	
	$(this.inputs.deleteCheckbox).prop('checked', false);
	this.updateDeleteButton();
}

App.conversation.updateDeleteButton = function(){
	var n = $(this.inputs.deleteCheckbox+':checked').length;
	$(this.outputs.deleteSelectedCount).html(n);
}

App.conversation.edit = function(){
	this.enableDeleteMode();
}

App.conversation.cancel = function(){
	this.disableDeleteMode();
}

App.conversation.deleteMarked = function(){
	this.disableDeleteMode();
}

App.conversation.deleteAll = function(){
	App.navigate("sms-conversations");
	this.disableDeleteMode();
}

App.conversation.back = function(){
	App.navigate("sms-conversations");
	this.disableDeleteMode();
}

App.conversation.resetSendMessage = function(){
	$(this.inputs.messageContent).val("");	
}

App.conversation.sendMessage = function(){
	var n = $(this.inputs.messageContent).val().length;	
	if(n > 0){
		Messages.load(1);
		this.resetSendMessage();
	}
}

$(document).ready(function(){
	$(App.conversation.backLink).click(function(){App.conversation.back();});
	$(App.conversation.buttons.send).click(function(){App.conversation.sendMessage();});
	$(App.conversation.buttons.edit).click(function(){App.conversation.edit();});
	$(App.conversation.buttons.cancel).click(function(){App.conversation.cancel();});
	$(App.conversation.buttons.deleteSelected).click(function(){App.showModal(3);});
	$(App.conversation.buttons.deleteAll).click(function(){App.showModal(4);});		
	$(App.conversation.inputs.deleteCheckbox).on("change", function(){App.conversation.updateDeleteButton();});
});

/*--New SMS Frame------------*/

var NewSMSFrame = {
	"frame" : "#sms-conversation-new",
	"backLink" : "#sms-new-back",
	"listItem" : ".recipient",
	"buttons" : {
		"cancel" : "#cancel-new-message-button",
		"send" : "#send-new-message-button",
		"add" : "#add-recipient-button",
		"change" : "#change-recipient-button",
		"cancelRecipient" :  "#cancel-recipient-button"
	},
	"inputs" : {
		"messageContent" : "#new-message-content",
		"recipientFilter" : "#recipient-filter"
	},
	"outputs" : {
		"list" : "#recipient-list",
		"recipient" : "#recipient-label"
	},
	"recipient" : false
}

NewSMSFrame.cancel = function(){
	App.navigate("sms-conversations");
	this.resetSendMessage();
}

NewSMSFrame.back = function(){
	App.navigate("sms-conversations");
	this.resetSendMessage();
}

NewSMSFrame.resetSendMessage = function(){
	$(this.inputs.messageContent).val("");	
	this.resetAddRecipient();
	this.clearRecipient();
}

NewSMSFrame.sendMessage = function(){
	var n = $(this.inputs.messageContent).val().length;	
	if(n > 0 && this.recipient){
		App.navigate("sms-conversation");
		this.resetSendMessage();
	}
}

NewSMSFrame.enableAddRecipient = function(n){
	$(this.frame).addClass("add-recipient");
	this.loadRecipients(5);
}

NewSMSFrame.loadRecipients = function(n){
	this.removeRecipients();
	Recipients.load(n);
}

NewSMSFrame.filterRecipients = function(){
	this.removeRecipients();
	var filter = $(this.inputs.recipientFilter).val();
	var length = filter.length;
	var n = (length <= 5) ? 5 - length : 0;
	Recipients.load(n);

	if($.isNumeric(filter)){
		Recipients.appendSearch(filter);		
	}
}

NewSMSFrame.addRecipient = function(){
	$(this.frame).addClass("has-recipient");	
	this.recipient = "0000000000";
	$(this.outputs.recipient).html(testContent.contact.number);
	this.resetAddRecipient();
}

NewSMSFrame.resetAddRecipient = function(){
	$(this.frame).removeClass("add-recipient");	
	this.removeRecipients();
	$(this.inputs.recipientFilter).val("");
}

NewSMSFrame.clearRecipient = function(){
	$(this.frame).removeClass("has-recipient");	
	this.recipient = false;
	$(this.outputs.recipient).html("");
}

NewSMSFrame.removeRecipients = function(){
	$(this.outputs.list).empty();	
}

$(document).ready(function(){
	$(NewSMSFrame.backLink).click(function(){NewSMSFrame.back();});	
	$(NewSMSFrame.buttons.add).click(function(){NewSMSFrame.enableAddRecipient();});
	$(NewSMSFrame.buttons.change).click(function(){NewSMSFrame.enableAddRecipient();});
	$(NewSMSFrame.buttons.cancelRecipient).click(function(){NewSMSFrame.resetAddRecipient();});	
	$(NewSMSFrame.buttons.send).click(function(){NewSMSFrame.sendMessage();});
	$(NewSMSFrame.buttons.cancel).click(function(){NewSMSFrame.cancel();});
	$(document).on("click", NewSMSFrame.listItem, function(){NewSMSFrame.addRecipient();});
	$(NewSMSFrame.inputs.recipientFilter).on("input propertychange", function(){NewSMSFrame.filterRecipients();});
});

/*--Recipients------------*/

var Recipients = {
	"container" : "#recipient-list",
	"template" : "#templates .recipient"
};

Recipients.load = function(n){
	var clone;
	for (var i = n - 1; i >= 0; i--){
		clone = $(this.template).clone();
		clone.find('.name').html(testContent.contact.name);	
		clone.find('.number').html(testContent.contact.number);
		clone.find('.type').html(testContent.contact.type);
		$(this.container).append(clone);
	};	
}

Recipients.appendSearch = function(searchTerm){
	var clone = $(this.template).clone();
	clone.find('.name').html(searchTerm);	
	$(this.container).append(clone);
}
