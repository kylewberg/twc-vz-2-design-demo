
/*--App------------------------------------------------*/

var App = {
 "account" : {
 	"numbers" : ["1234567890", "0987654321","1111111111", "2222222222", "3333333333", "4444444444", "5555555555","6666666666", "7777777777", "8888888888","9999999999"],
 	"mylocations" : ["1234567890", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555"]
 },
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
 "frame" : {
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
	"contact-add" : "#contact-change",
	"contact-edit" : "#contact-change",
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
  	"help" : "#help-link",
	"sound" : "#sound-control"
  },
  "footerLinks" : {
  	"collapse" : "#collapse-link"
  },
  "backLinks" : {
  	"call" : "#call-back",
	"contact" : "#contact-back",
	"contactChange" : "#contact-change-back",
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
  	"newContact" : "#new-contact-button",
  	"save" : ".save-button",
	"cancel" : ".cancel-button",
	"close" : "#close-button",
	"minimize": "#minimize-button"
  },
  "selectMenus" : {
  	"accountNumbers" : "#account-numbers",
  	"myLocationNumbers" : "#my-location-numbers"
  },
  "expandableContainer" : {
  	"title" : ".expand-title"
  }
 }
}

/*--Init------------*/

App.initialize = function() {			
	//init plugins
	//this.initPlugins();
	
	//init GUI
	this.initGUI();
	
	//enable modes
	this.enableCommercial();	

	//create support windows
	this.createHelpWindow();	
	
	//data
	this.loadData();
	
	//navigate to start frame
	this.navigate("login");	
}

App.log = function(message){
	if(air.trace){
		air.trace(message);
	}else{
		console.log(message);
	}
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
	this.states.collapsed = false;	
	$(this.elements.app).removeClass("collapsed");				
}

App.showModal = function(id){
	Modal.init(id);
	$(this.elements.app).addClass("modal");	
}

App.hideModal = function(){
	$(this.elements.app).removeClass("modal");	
}

App.createHelpWindow = function(){
	HelpWindow.create();
}

App.openHelpWindow = function(){
	HelpWindow.open('login');
}

/*--GUI------------*/

App.initGUI = function(){
	$('.app-name').html(this.info.name.residential);
	$('#login-version').html("Version "+this.info.version.partial);	
	$('#settings-version').html("Version "+this.info.version.full);

	//initialize frames
	VoicemailFrame.init();
	ConversationsFrame.init();
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
	var un = $("#username").val();
	var pw = $("#password").val();
	if(un && pw){
		this.states.loggedIn = true;
		$(this.elements.app).addClass("logged-in");			
		this.collapse();
	}else{
		this.showModal(11);
	}
}

App.logout = function(){
	if(this.states.loggedIn){
		this.showModal(10);
	}else{
		this.close();		
	}
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
		case "contact-add":
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
	this.navigate(this.frame.previous);
}

/*--Frames------------*/

App.hideFrames = function(){
	$(this.elements.frame).hide();
}

App.showFrame = function(frameReference){
	this.log("show frame: "+frameReference);
	this.frame.previous = this.frame.current;
	this.frame.current = frameReference;
	this.expand();
	this.hideFrames();

	if(frameReference == "contact-add"){
		ChangeContactFrame.modify('add');
	}

	if(frameReference == "contact-edit"){
		ChangeContactFrame.modify('edit');
	}

	$(this.elements.frames[frameReference]).show();	
}

/*--Data------------*/

App.loadRingtones = function(n){
	for (var i = 0; i < ((n) ? n : 10); i++) {
		$("select.ringtones").append('<option>Ringtone '+i+'</option>');
		$("ul.options.ringtones").append('<li data-value="'+i+'">Ringtone '+i+'</li>');
	};	
}

App.loadAccountNumbers = function(){
	for (var i = 0; i < this.account.numbers.length; i++) {
		$(this.elements.selectMenus.accountNumbers).append('<option value="'+this.account.numbers[i]+'">'+this.account.numbers[i].formatTN()+'</option>');
	};
}

App.loadMyLocations = function(){
	for (var i = 0; i < this.account.mylocations.length; i++) {
		$(this.elements.selectMenus.myLocationNumbers).append('<option value="'+this.account.mylocations[i]+'">'+this.account.mylocations[i].formatTN()+'</option>');
	};			
}

App.loadData = function(){
	Calls.load(50);
	Contacts.load(10);		
	Voicemails.load(50);
	//ConversationsFrame.loadData();
	Messages.load(10);
	this.loadRingtones(20);	
	this.loadAccountNumbers();
	this.loadMyLocations();				
}



/*--App Event Registration------------*/
$(document).ready(function(){
	App.initialize();
	
	//select dropdowns
	$(App.elements.selectMenus.accountNumbers).on("change", function(){App.changeActiveNumber();});	
	
	//buttons
	$(App.elements.buttons.close).click(function(){App.logout();});	
	$(App.elements.buttons.minimize).click(function(){App.minimize();});
	$(App.elements.buttons.login).click(function(){App.login();});	
	$(App.elements.buttons.newContact).click(function(){App.navigate("contact-add");});
	$(App.elements.buttons.edit).click(function(){App.navigate("contact-edit");});	
	$(App.elements.buttons.save).click(function(){App.navigatePrevious();});
	$(App.elements.buttons.cancel).click(function(){App.navigatePrevious();});	
		
	//login links
	$(App.elements.otherLinks.forgotUsername).click(function(){App.showModal(0);});
	$(App.elements.otherLinks.forgotPassword).click(function(){App.showModal(1);});
	$('#app-splash').click(function(){App.showModal(5);});
		
	//utility links	
	$(App.elements.utilityLinks.sound).click(function(){App.toggleSound();});
	$(App.elements.utilityLinks.help).click(function(){App.openHelpWindow();});
	
	//collapse link
	$(App.elements.footerLinks.collapse).click(function(){App.collapse();});
	
	//back links
	$(App.elements.backLinks.call).click(function(){App.navigate("calls");});
	$(App.elements.backLinks.contact).click(function(){App.navigate("contacts");});	
	$(App.elements.backLinks.contactChange).click(function(){App.navigatePrevious();});	
	$(App.elements.backLinks.voicemail).click(function(){App.navigate("voicemails");});	
		
	//menu links
	$(App.elements.menuLinks.calls).click(function(){App.navigate("calls");});
	$(App.elements.menuLinks.contacts).click(function(){App.navigate("contacts");});	
	$(App.elements.menuLinks.voicemails).click(function(){App.showModal(2);});		
	$(App.elements.menuLinks.sms).click(function(){App.navigate("sms-conversations");});
	$(App.elements.utilityLinks.settings).click(function(){App.navigate("settings");});	
	
	//list items
	//$(App.elements.listItems.call).click(function(){App.navigate("call");});
	$(App.elements.listItems.call).click(function(){$(this).toggleClass("expanded");});
	$(App.elements.listItems.contact).click(function(){App.navigate("contact");});	
	$(App.elements.listItems.voicemail).click(function(){App.navigate("voicemail");});	
	$(App.elements.listItems.conversation).click(function(){App.navigate("sms-conversation");});
	
	//expandable containers
	$(App.elements.expandableContainer.title).click(function(){$(this).parent().toggleClass("expanded");});	

	//select menus
	$('.select-menu').click(function(){$(this).toggleClass("open");});	
	
	//app functionality
	$(App.elements.top).on("mousedown", function(){App.move();});		
});

String.prototype.formatTN = function(){
/***************************************************************
Detail 	: 	Returns numbers in xxx-xxx-xxxx format
                for domestic numbers
***************************************************************/
    var value = this.replace(/[^0123456789\- ]/g, "");
 
    // define offset (defaults to 0)
    var os = 0;
    var length = value.length - os;

    if (length > 10) {
       return value; 
    }

    // 1st set [xxx-]xxx-xxxx

    if (length > 3 && value.charAt(3+os) != '-'){
        value = value.substr(0,3+os) + "-"+ value.substr(3+os);
        os += 4; 
    }else{
        os += 4; 
    }
    
    
    // 2nd set xxx-[xxx-]xxxx
    length = value.length - os;
    
    if(length > 3 && value.charAt(3+os) != '-'){
        value = value.substr(0,3+os) + "-"+ value.substr(3+os);
        os += 4; 
    }else{
        os += 4; 
    }
    
    
    // 3rd set xxx-xxx-[xxxx ]
    length = value.length - os;
        
    if(length > 4 && value.charAt(4+os) != ' '){
        value = value.substr(0,4+os) + " "+ value.substr(4+os);
    
    }

    return value;
}