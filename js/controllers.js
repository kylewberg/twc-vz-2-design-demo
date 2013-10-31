var testContent = {
	"contact" : {
		"name" : "Contact Name",
		"number" : "0000000000",
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
			clone.find('.number').html(testContent.contact.number.formatTN());			
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

/*--Voicemail Frame ------------*/

var VoicemailFrame = {
	"transcriptContainer" : "#transcript-container",
	"transcriptTitle" : "#transcript-title"
}

VoicemailFrame.init = function(){
	this.disableVMtoText();
	//this.enableVMtoText();
}

VoicemailFrame.enableVMtoText = function(){
	var transcript = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel dapibus quam. Aenean orci turpis, varius at viverra sit amet, tempus eu eros. Morbi mi est, euismod eget placerat ac, luctus non ligula. Aliquam vehicula pellentesque consectetur. Aenean congue sodales quam. Mauris vitae interdum ipsum. Integer vitae lorem leo. Aenean vel leo bibendum, placerat eros ac, imperdiet metus. Mauris rhoncus metus eget feugiat pharetra. Suspendisse blandit augue at pretium adipiscing. Sed in tincidunt elit, vulputate porttitor augue. Vestibulum dictum cursus convallis. Nam tempor metus eu fermentum sagittis. In id lectus sit amet neque vulputate commodo. Mauris eget mi vel libero varius varius nec quis ligula."
	$(this.transcriptContainer).html(transcript).removeClass('disclaimer');
	$(this.transcriptTitle).html("Transcript");
}

VoicemailFrame.disableVMtoText = function(){
	var disclaimer = "The Voicemail to Text feature is currently not enabled on your account. To enable this feature, please log in to the portal. Further information can be found here.";
	$(this.transcriptContainer).html(disclaimer).addClass('disclaimer');
	$(this.transcriptTitle).html("Voicemail to Text");
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
		unread = (Math.random() > 0.6) ? true : false;
		urgent = (Math.random() > 0.6) ? true : false;
		confidential = (Math.random() > 0.6) ? true : false;
		transcript = true;
		clone = $(this.template).clone();
		if(contact){
			clone.find('.name').html(testContent.contact.name);	
			clone.find('.number').html(testContent.contact.type);	
		}else{
			clone.find('.name').html(testContent.identifier.voicemail);	
			clone.find('.number').html(testContent.contact.number.formatTN());			
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

var ConversationsFrame = {
	"loadInitialNumber" : 20,
	"loadMoreNumber" : 10,
	"buttons" : {
		"new" : "#new-sms-button",
		"loadMore" : "#load-more-conversations-button"
	},
	"outputs" : {
		"dataContainer" : "#conversation-list"
	}
}

ConversationsFrame.init = function(){
	this.loadData();
}

ConversationsFrame.loadData = function(){
	this.loadMessages(this.loadInitialNumber);
	this.showLoadButton();	
}

ConversationsFrame.loadMore = function(){
	this.loadMessages(this.loadMoreNumber);
	this.showLoadButton();
}

ConversationsFrame.loadMessages = function(n){
	var contact, clone;
	for (var i = n - 1; i >= 0; i--){
		contact = (Math.random() > 0.5) ? true : false;
		clone = $("#templates .conversation").clone();
		if(contact){
			clone.find('.name').html(testContent.contact.name);	
			clone.find('.number').html(testContent.contact.type);	
		}else{
			clone.find('.name').html(testContent.contact.number.formatTN());	
			clone.find('.number').html("");			
		}
		$(this.outputs.dataContainer).append(clone);
	};	
}

ConversationsFrame.showLoadButton = function(){
	$(this.buttons.loadMore).show();
	$(this.buttons.loadMore).appendTo(this.outputs.dataContainer);
}

ConversationsFrame.hideLoadButton = function(){
	$(this.buttons.loadMore).hide();
}

$(document).ready(function(){
	$(ConversationsFrame.buttons["new"]).click(function(){App.navigate("sms-conversation-new");});
	$(ConversationsFrame.buttons.loadMore).click(function(){ConversationsFrame.loadMore();});
});

/*--SMS Conversation Frame------------*/

var ConversationFrame = {
	"frame" : App.elements.frames["sms-conversation"],
	"backLink" : "#sms-back",
	"buttons" : {
		"edit" : "#edit-conversation-button",
		"cancel" : "#cancel-delete-button",
		"deleteSelected" : "#delete-selected-button",
		"deleteAll" : "#delete-all-button",
		"send" : "#send-message-button",
		"loadMore" : "#load-more-messages-button"
	},
	"inputs" : {
		"deleteCheckbox" : ".delete-message",
		"messageContent" : "#message-content"
	},
	"outputs" : {
		"deleteSelectedCount" : "#delete-selected-count"
	}
}

ConversationFrame.enableDeleteMode = function(){
	$(this.frame).addClass("delete-mode");	
	this.updateDeleteButton();
}

ConversationFrame.disableDeleteMode = function(){
	$(this.frame).removeClass("delete-mode");	
	$(this.inputs.deleteCheckbox).prop('checked', false);
	this.updateDeleteButton();
}

ConversationFrame.updateDeleteButton = function(){
	var n = $(this.inputs.deleteCheckbox+':checked').length;
	$(this.outputs.deleteSelectedCount).html(n);
}

ConversationFrame.edit = function(){
	this.enableDeleteMode();
}

ConversationFrame.cancel = function(){
	this.disableDeleteMode();
}

ConversationFrame.deleteMarked = function(){
	this.disableDeleteMode();
}

ConversationFrame.deleteAll = function(){
	App.navigate("sms-conversations");
	this.disableDeleteMode();
}

ConversationFrame.back = function(){
	App.navigate("sms-conversations");
	this.disableDeleteMode();
}

ConversationFrame.resetSendMessage = function(){
	$(this.inputs.messageContent).val("");	
	this.disableSendButton();
}

ConversationFrame.sendMessage = function(){
	var n = $(this.inputs.messageContent).val().length;	
	if(n > 0){
		Messages.load(1);
		this.resetSendMessage();
	}
}

ConversationFrame.enableSendButton = function(){
	$(this.buttons.send).removeClass('disabled');	
}

ConversationFrame.disableSendButton = function(){
	$(this.buttons.send).addClass('disabled');	
}

ConversationFrame.countCharacters = function(){
	var message = $(this.inputs.messageContent).val();	
	if(message.length > 0){
		this.enableSendButton();			
	}else{
		this.disableSendButton();
	}	
}

$(document).ready(function(){
	$(ConversationFrame.backLink).click(function(){ConversationFrame.back();});
	$(ConversationFrame.buttons.send).click(function(){ConversationFrame.sendMessage();});
	$(ConversationFrame.buttons.edit).click(function(){ConversationFrame.edit();});
	$(ConversationFrame.buttons.cancel).click(function(){ConversationFrame.cancel();});
	$(ConversationFrame.buttons.deleteSelected).click(function(){App.showModal(3);});
	$(ConversationFrame.buttons.deleteAll).click(function(){App.showModal(4);});		
	$(ConversationFrame.inputs.deleteCheckbox).on("change", function(){ConversationFrame.updateDeleteButton();});
	$(ConversationFrame.inputs.messageContent).on("input propertychange", function(){ConversationFrame.countCharacters();});
});

/*--New SMS Frame------------*/

var NewSMSFrame = {
	"frame" : "#sms-conversation-new",
	"backLink" : "#sms-new-back",
	"listItem" : ".recipient",
	"messageLength" : 0,
	"numberLength" : 10,
	"buttons" : {
		"cancel" : "#cancel-new-message-button",
		"send" : "#send-new-message-button",
		"add" : "#add-recipient-button",
		"remove" : "#remove-recipient-button",
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
	"recipient" : null
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
	this.messageLength = 0;	
	this.resetRecipient();
}

NewSMSFrame.sendMessage = function(){
	var message = $(this.inputs.messageContent).val();	
	if(message && this.recipient){
		App.navigate("sms-conversation");
		this.resetSendMessage();
	}
}

NewSMSFrame.loadRecipients = function(n){
	this.removeRecipients();
	Recipients.load(n);
}

NewSMSFrame.removeRecipients = function(){
	$(this.outputs.list).empty();	
}

NewSMSFrame.filterRecipients = function(){
	var filter = $(this.inputs.recipientFilter).val();
	var length = filter.length;
	var n = (length >= 1) ? 7 - length : 0;
	this.loadRecipients(n);
}

NewSMSFrame.addContactRecipient = function(){
	this.addRecipient({"number" : testContent.contact.number, "label" : '<span class="name">'+testContent.contact.name+'</span><span class="type">('+testContent.contact.type+')</span>'});
}

NewSMSFrame.addInputRecipient = function(){	
	App.log("add input recipient; current: "+this.recipient);
	var filter = $(this.inputs.recipientFilter).val();	
	if(filter && $.isNumeric(filter) && filter.length == this.numberLength){
		this.addRecipient({"number" : filter, "label" : '<span class="number">'+filter.formatTN()+'</span>'});			
	}else if(filter == "911"){
		App.showModal(12);
	}	
}

NewSMSFrame.addRecipient = function(recipient){
	$(this.frame).addClass("has-recipient");	
	this.recipient = recipient.number;
	$(this.outputs.recipient).html(recipient.label);
	this.enableSendButton();
	this.removeRecipients();	
}

NewSMSFrame.resetRecipient = function(){	
	$(this.frame).removeClass("has-recipient");		
	$(this.inputs.recipientFilter).val("").focus();
	this.recipient = null;
	$(this.outputs.recipient).html("");
	this.disableSendButton();	
	this.removeRecipients();		
}

NewSMSFrame.enableSendButton = function(){
	App.log("Enable Send; recipient: "+this.recipient+", message length: "+this.messageLength);
	if(this.recipient && this.messageLength){
		$(this.buttons.send).removeClass('disabled');
	}	
}

NewSMSFrame.disableSendButton = function(){
	App.log("Disable Send Button");
	$(this.buttons.send).addClass('disabled');	
}

NewSMSFrame.countCharacters = function(){
	var message = $(this.inputs.messageContent).val();	
	this.messageLength = message.length;
	if(this.messageLength > 0){
		this.enableSendButton();			
	}else{
		this.disableSendButton();
	}	
}

$(document).ready(function(){
	$(NewSMSFrame.backLink).click(function(){NewSMSFrame.back();});	
	$(NewSMSFrame.buttons.add).click(function(){NewSMSFrame.addInputRecipient();});		
	$(NewSMSFrame.buttons.remove).click(function(){NewSMSFrame.resetRecipient();});	
	$(NewSMSFrame.buttons.send).click(function(){NewSMSFrame.sendMessage();});
	$(NewSMSFrame.buttons.cancel).click(function(){NewSMSFrame.cancel();});
	$(document).on("click", NewSMSFrame.listItem, function(){NewSMSFrame.addContactRecipient();});
	$(NewSMSFrame.inputs.recipientFilter).on("input propertychange", function(){NewSMSFrame.filterRecipients();});
	$(NewSMSFrame.inputs.messageContent).on("input propertychange", function(){NewSMSFrame.countCharacters();});
	$(NewSMSFrame.inputs.recipientFilter).on("blur", function(){NewSMSFrame.addInputRecipient();});
});

/*--Recipients------------*/

var Recipients = {
	"container" : "#recipient-list",
	"template" : "#templates .recipient"
};

Recipients.load = function(n){
	var clone;	
	for (var i = 0; i < n; i++) {
		clone = $(this.template).clone();
		clone.find('.name').html(testContent.contact.name);	
		clone.find('.number').html(testContent.contact.number.formatTN());
		clone.find('.type').html(testContent.contact.type);
		$(this.container).append(clone);
	};	
}

Recipients.appendSearch = function(searchTerm){
	var clone = $(this.template).clone();
	clone.find('.name').html(searchTerm);	
	$(this.container).append(clone);
}
