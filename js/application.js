
/*--App------------------------------------------------*/

var App = {
 "info" : {
 	"name" : {
		"residential" : "VoiceZone Connect",
		"commercial" : "Voice Manager Connect"
	},
	"version" : {
		"partial" : "2.0.0",
		"full" : "2.0.0.0"
	}
 },
 "frames" : {
 	"current" : null,
	"previous" : null
 },
 "states" : {
 	"loggedIn" : false,
	"collapsed" : false,
	"muted" : false,
	"commercial" : false,
	"development" : false
 },
 "elements" : {
  "app" : "#app",
  "top" : "#app-top",
  "header" : "#app-header",
  "menu" : "#app-menu",
  "content" : "#app-content",
  "footer" : "#app-footer",
  "frame" : ".frame",
  "frames" : {
  	"login" : "#login",
	"calls" : "#calls",
	"call" : "#call",
	"contacts" : "#contacts",
	"contact" : "#contact",
	"contact-edit" : "#contact-edit",
	"voicemails" : "#voicemails",
	"voicemail" : "#voicemail",
	"sms-conversations" : "#sms-conversations",
	"sms-conversation" : "#sms-conversation",
	"sms-conversation-new" : "#sms-conversation-new",
	"settings" : "#settings",
	"directory" : "#directory"
  },
  "menuLink" :".nav-link",  
  "menuLinks" : {
  	"calls" : "#calls-link",
	"contacts" : "#contacts-link",
	"voicemails" : "#voicemails-link",
	"sms" : "#sms-link",
	"directory" : "#directory-link"
  },
  "utilityLinks" : {
  	"settings" : "#settings-link",
	"sound" : "#sound-control"
  },
  "footerLinks" : {
  	"collapse" : "#collapse-link"
  },
  "backLinks" : {
  	"call" : "#call-back",
	"contact" : "#contact-back",
	"contactEdit" : "#contact-edit-back",
	"voicemail" : "#voicemail-back"
  },
  "otherLinks" : {
  	"forgotUsername" : "#forgot-username",
	"forgotPassword" : "#forgot-password"
  },
  "listItems" : {
  	"call" : ".call",
	"contact" : ".contact",
	"voicemail" : ".voicemail",
	"conversation" : ".conversation"
  },
  "buttons" : {
  	"login" : "#login-button",
  	"edit" : ".edit-button",
  	"save" : ".save-button",
	"cancel" : ".cancel-button",
	"close" : "#close-button",
	"minimize": "#minimize-button"
  },
  "selectMenus" : {
  	"activeNumber" : "#active-number"
  },
  "expandableContainer" : {
  	"title" : ".expand-title"
  }
 }
}

/*--Init------------*/

App.initialize = function() {		
	//load data
	this.loadData();
	
	//init plugins
	this.initPlugins();
	
	//init GUI
	this.initGUI();
	
	//enable modes
	//this.enableDevelopment();
	//this.enableCommercial();	
	
	//navigate to start frame
	this.navigate("login");	
}

App.log = function(message){
	//console.log(message);
}

App.move = function(){
	window.nativeWindow.startMove();
}

App.close = function(){
	air.NativeApplication.nativeApplication.exit();   
}

App.minimize = function(){
	window.nativeWindow.minimize();
}

App.collapse = function(){
	this.states.collapsed = true;	
	$(this.elements.app).addClass("collapsed");	
	this.resetMenu();	
}

App.expand = function(){
	this.states.loggedIn = false;	
	$(this.elements.app).removeClass("collapsed");				
}

App.showModal = function(id){
	Modal.init(id);
	$(this.elements.app).addClass("modal");	
}

App.hideModal = function(){
	$(this.elements.app).removeClass("modal");	
}

/*--GUI------------*/

App.initGUI = function(){
	$('.app-name').html(this.info.name.residential);
	$('#login-version').html("Version "+this.info.version.partial);	
	$('#settings-version').html("Version "+this.info.version.full);
}

/*--Plugins------------*/

App.initPlugins = function(){
	audiojs.events.ready(function() {
    	var as = audiojs.createAll();
  	});
}

/*--Development Mode------------*/

App.enableDevelopment = function(){
	this.states.development = true;
	$(this.elements.app).addClass("development");	
}

App.disableDevelopment = function(){
	this.states.commercial = false;
	$(this.elements.app).removeClass("development");					
}

/*--Commercial Mode------------*/

App.enableCommercial = function(){
	this.states.commercial = true;
	$(this.elements.app).addClass("commercial");
	$('.app-name').html(this.info.name.commercial);		
}

App.disableCommercial = function(){
	this.states.commercial = false;
	$(this.elements.app).removeClass("commercial");	
	$('.app-name').html(this.info.name.residential);				
}

/*--Acive Number------------*/

App.changeActiveNumber = function(){
	this.login();
}

/*--Login/Logout------------*/

App.login = function(){
	this.states.loggedIn = true;
	$(this.elements.app).addClass("logged-in");		
	this.collapse();
}

App.logout = function(){
	this.states.loggedIn = false;	
	$(this.elements.app).removeClass("logged-in");		
	this.navigate("login");
}

/*--Sound------------*/

App.toggleSound = function(){
	if(this.states.muted){
		this.states.muted = false;
		$(this.elements.app).removeClass('muted');
	}else{
		this.states.muted = true;
		$(this.elements.app).addClass('muted');		
	}
}

/*--Navigation------------*/

App.resetMenu = function(){
	$(this.elements.menuLink).removeClass('active');
}

App.navigate = function(frame){
	this.log("navigate to: "+frame);
	
	//update menu
	var linkReference;
	this.resetMenu();
	switch(frame) {	
		case "calls":
		case "call":
		    linkReference = this.elements.menuLinks.calls;
			break;
		case "contacts":
		case "contact":
		case "contact-edit":
		    linkReference = this.elements.menuLinks.contacts;
			break;
		case "voicemails":
		case "voicemail":	
		    linkReference = this.elements.menuLinks.voicemails;
			break;			
		case "sms-conversations":
		case "sms-conversation":
		case "sms-conversation-new":
		    linkReference = this.elements.menuLinks.sms;
			break;			
		case "directory":	
		    linkReference = this.elements.menuLinks.directory;
			break;								
		default: 
			linkReference = "";	
	}	
	if(linkReference){
		$(linkReference).addClass('active');
	}else{
		this.resetMenu();		
	}
	
	//show frame
	if(frame){
		this.showFrame(frame);
	}
}

App.navigatePrevious = function(){
	this.navigate(this.frames.previous);
}

/*--Frames------------*/

App.hideFrames = function(){
	$(this.elements.frame).hide();
}

App.showFrame = function(frame){
	this.log("show frame: "+frame);
	this.frames.previous = App.frames.current;
	this.frames.current = frame;
	this.expand();
	this.hideFrames();
	$(this.elements.frames[frame]).show();	
}

/*--Data------------*/

App.loadRingtones = function(n){
	for (var i = ((n) ? n : 10) - 1; i >= 0; i--){
		$("select.ringtones").prepend('<option class="ringtone">Ringtone '+i+'</option>');
	};	
}

App.loadData = function(){
	Calls.load(50);
	Contacts.load(10);		
	Voicemails.load(5);
	Conversations.load(10);
	Messages.load(10);
	this.loadRingtones(20);					
}



/*--App Event Registration------------*/
$(document).ready(function(){
	App.initialize();
	
	//app functionality
	$(App.elements.top).onmousedown = function(event) {App.move();}
	
	//select dropdowns
	$(App.elements.selectMenus.activeNumber).on("change", function(){App.changeActiveNumber();});	
	
	//buttons
	$(App.elements.buttons.close).click(function(){App.close();});	
	$(App.elements.buttons.minimize).click(function(){App.minimize();});
	$(App.elements.buttons.login).click(function(){App.login();});	
	$(App.elements.buttons.edit).click(function(){App.navigate("contact-edit");});	
	$(App.elements.buttons.save).click(function(){App.navigatePrevious();});
	$(App.elements.buttons.cancel).click(function(){App.navigatePrevious();});	
		
	//misc links
	$(App.elements.otherLinks.forgotUsername).click(function(){App.showModal(0);});
		
	//utility links	
	$(App.elements.utilityLinks.sound).click(function(){App.toggleSound();});
	
	//collapse link
	$(App.elements.footerLinks.collapse).click(function(){App.collapse();});
	
	//back links
	$(App.elements.backLinks.call).click(function(){App.navigate("calls");});
	$(App.elements.backLinks.contact).click(function(){App.navigate("contacts");});	
	$(App.elements.backLinks.contactEdit).click(function(){App.navigate("contact");});	
	$(App.elements.backLinks.voicemail).click(function(){App.navigate("voicemails");});	
		
	//menu links
	$(App.elements.menuLinks.calls).click(function(){App.navigate("calls");});
	$(App.elements.menuLinks.contacts).click(function(){App.navigate("contacts");});	
	$(App.elements.menuLinks.voicemails).click(function(){App.navigate("voicemails");});		
	$(App.elements.menuLinks.sms).click(function(){App.navigate("sms-conversations");});
	$(App.elements.utilityLinks.settings).click(function(){App.navigate("settings");});	
	
	//list items
	$(App.elements.listItems.call).click(function(){App.navigate("call");});
	$(App.elements.listItems.contact).click(function(){App.navigate("contact");});	
	$(App.elements.listItems.voicemail).click(function(){App.navigate("voicemail");});	
	$(App.elements.listItems.conversation).click(function(){App.navigate("sms-conversation");});
	
	//expandable containers
	$(App.elements.expandableContainer.title).click(function(){$(this).parent().toggleClass("open");});	
});



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
		"count" : "#character-count"
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
	$(this.buttons.deleteSelected).html("Delete Selected ("+n+")");
}

App.conversation.edit = function(){
	this.enableDeleteMode();
}

App.conversation.cancel = function(){
	this.disableDeleteMode();
}

App.conversation.deleteSelected = function(){
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

App.conversation.updateCharacterCount = function(){
	var n = $(this.inputs.messageContent).val().length;
	$(this.outputs.count).html(n+"/160");
}

App.conversation.resetSendMessage = function(){
	$(this.inputs.messageContent).val("");	
	this.updateCharacterCount();
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
	$(App.conversation.buttons.deleteSelected).click(function(){App.conversation.deleteSelected();});
	$(App.conversation.buttons.deleteAll).click(function(){App.conversation.deleteAll();});		
	$(App.conversation.inputs.deleteCheckbox).on("change", function(){App.conversation.updateDeleteButton();});
	$(App.conversation.inputs.messageContent).on("input propertychange", function(){App.conversation.updateCharacterCount();});	
});

/*--New SMS Conversation Frame------------*/

App.newConversation = {
	"frame" : App.elements.frames["sms-conversation-new"],
	"backLink" : "#sms-new-back",
	"listItem" : ".recipient",
	"buttons" : {
		"cancel" : "#cancel-new-message-button",
		"send" : "#send-new-message-button",
		"add" : "#add-recipient-button",
		"cancelRecipient" :  "#cancel-recipient-button"
	},
	"inputs" : {
		"messageContent" : "#new-message-content",
		"recipientFilter" : "#recipient-filter"
	},
	"outputs" : {
		"count" : "#new-character-count",
		"list" : "#recipient-list",
		"recipient" : "#recipient-label"
	},
	"recipient" : false
}

App.newConversation.cancel = function(){
	App.navigate("sms-conversations");
	this.resetSendMessage();
}

App.newConversation.back = function(){
	App.navigate("sms-conversations");
	this.resetSendMessage();
}

App.newConversation.updateCharacterCount = function(){
	var n = $(this.inputs.messageContent).val().length;
	$(this.outputs.count).html(n+"/160");
}

App.newConversation.resetSendMessage = function(){
	$(this.inputs.messageContent).val("");	
	this.updateCharacterCount();
	this.resetAddRecipient();
	this.clearRecipient();
}

App.newConversation.sendMessage = function(){
	var n = $(this.inputs.messageContent).val().length;	
	if(n > 0 && this.recipient){
		App.navigate("sms-conversation");
		this.resetSendMessage();
	}
}

App.newConversation.enableAddRecipient = function(n){
	$(this.frame).addClass("add-recipient");
	this.loadRecipients(5);
}

App.newConversation.loadRecipients = function(n){
	this.removeRecipients();
	Recipients.load(n);
}

App.newConversation.filterRecipients = function(){
	this.removeRecipients();
	var filter = $(this.inputs.recipientFilter).val();
	var length = filter.length;
	var n = (length <= 5) ? 5 - length : 0;
	Recipients.load(n);
}

App.newConversation.addRecipient = function(){
	this.recipient = "1234567890";
	$(this.outputs.recipient).html("123-456-7890");
	this.resetAddRecipient();
}

App.newConversation.resetAddRecipient = function(){
	$(this.frame).removeClass("add-recipient");	
	this.removeRecipients();
	$(this.inputs.recipientFilter).val("");
}

App.newConversation.clearRecipient = function(){
	this.recipient = false;
	$(this.outputs.recipient).html("");
}

App.newConversation.removeRecipients = function(){
	$(this.outputs.list).empty();	
}

$(document).ready(function(){
	$(App.newConversation.backLink).click(function(){App.newConversation.back();});	
	$(App.newConversation.buttons.add).click(function(){App.newConversation.enableAddRecipient();});
	$(App.newConversation.buttons.cancelRecipient).click(function(){App.newConversation.resetAddRecipient();});	
	$(App.newConversation.buttons.send).click(function(){App.newConversation.sendMessage();});
	$(App.newConversation.buttons.cancel).click(function(){App.newConversation.cancel();});
	$(document).on("click", App.newConversation.listItem, function(){App.newConversation.addRecipient();});
	$(App.newConversation.inputs.messageContent).on("input propertychange", function(){App.newConversation.updateCharacterCount();});	
	$(App.newConversation.inputs.recipientFilter).on("input propertychange", function(){App.newConversation.filterRecipients();});
});

/*--Modal------------*/

var Modal = {
	"title" : "#modal-title",
	"message" : "#modal-message",
	"buttons" : {
		"close" : "#modal-close"
	}
}

Modal.init = function(id){
	var title, message;
	switch(id) {	
		case 0:
		    title = "Forgot Username";
			message = "Click below to retrieve username";
			break;							
		default: 
			title = "Notice";	
			message = "";
	}	
	$(this.title).html(title);
	$(this.message).html(message);
}

Modal.close = function(){
	App.hideModal();
}

$(document).ready(function(){
	$(Modal.buttons.close).click(function(){Modal.close();});	
});
