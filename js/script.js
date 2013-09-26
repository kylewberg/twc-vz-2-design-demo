
/*--App------------------------------------------------*/

var App = {
 "info" : {
 	"name" : {
		"residential" : "VoiceZone Connect",
		"commercial" : "Voice Manager"
	},
	"version" : "2.0.0"
 },
 "frames" : {
 	"current" : null,
	"previous" : null,
 	"start" : "calls"
 },
 "states" : {
 	"loggedIn" : false,
	"collapsed" : false,
	"muted" : false,
	"commercial" : false
 },
 "elements" : {
  "app" : "#app",
  "top" : "#app-top",
  "close" : "#close-button",
  "minimize": "#minimize-button",
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
  "cancelLink" : ".cancel-link",
  "backLinks" : {
  	"call" : "#call-back",
	"contact" : "#contact-back",
	"voicemail" : "#voicemail-back",
	"sms" : "#sms-back"
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
  }
 }
}

App.log = function(message){
	//console.log(message);
}

App.initialize = function() {		
	//load data
	this.loadData();
	//init plugins
	this.initPlugins();
	//init GUI
	this.initGUI();
	//show default
	this.navigate("login");	
}

App.close = function(){
	this.logout();
}

App.minimize = function(){

}

App.initGUI = function(){
	$('.app-name').html(this.info.name.residential);
	$('.app-version').html(this.info.version);	
}

App.initPlugins = function(){
	audiojs.events.ready(function() {
    	var as = audiojs.createAll();
  	});
}

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

App.login = function(){
	this.states.loggedIn = true;
	$(this.elements.app).addClass("logged-in");		
	//this.navigate(this.frames.start);
	this.collapse();
}

App.logout = function(){
	this.states.loggedIn = false;	
	$(this.elements.app).removeClass("logged-in");		
	this.navigate("login");
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

App.toggleSound = function(){
	if(this.states.muted){
		this.states.muted = false;
		$(this.elements.app).removeClass('muted');
	}else{
		this.states.muted = true;
		$(this.elements.app).addClass('muted');		
	}
}

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

App.populateContents = function(source,n,destination){
	this.log("populate contents for "+destination+", with "+source);
	for (var i = ((n) ? n : 10) - 1; i >= 0; i--){
		$(destination).append($('#templates '+source).clone());
	};
}

App.populateMessages = function(n){
	var state;
	for (var i = ((n) ? n : 10) - 1; i >= 0; i--){
		state = (Math.random() > 0.5) ? "incoming" : "outgoing";
		$("#message-list").append($('#templates .message').clone().addClass(state));
	};
}

App.loadData = function(){
	this.populateContents(".call",50,"#call-list");
	this.populateContents(".contact",10,"#contact-list");	
	this.populateContents(".contact-number",5,"#contact-numbers");	
	this.populateContents(".edit-contact-number",5,"#contact-edit-numbers");		
	this.populateContents(".voicemail",5,"#voicemail-list");		
	this.populateContents(".conversation",10,"#conversation-list");	
	this.populateMessages(10);					
}

//initialize App and register events
$(document).ready(function(){
	App.initialize();
	
	//buttons
	$(App.elements.close).click(function(){App.close();});	
	$(App.elements.minimize).click(function(){App.minimize();});
	$(App.elements.buttons.login).click(function(){App.login();});	
	$(App.elements.buttons.edit).click(function(){App.navigate("contact-edit");});	
	$(App.elements.buttons.save).click(function(){App.navigatePrevious();});
		
	//utility links	
	$(App.elements.utilityLinks.sound).click(function(){App.toggleSound();});
	
	//collapse link
	$(App.elements.footerLinks.collapse).click(function(){App.collapse();});
	
	//back links
	$(App.elements.backLinks.call).click(function(){App.navigate("calls");});
	$(App.elements.backLinks.contact).click(function(){App.navigate("contacts");});	
	$(App.elements.backLinks.voicemail).click(function(){App.navigate("voicemails");});	
	$(App.elements.backLinks.sms).click(function(){App.navigate("sms-conversations");});
	$(App.elements.cancelLink).click(function(){App.navigatePrevious();});
		
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
})

