var HelpWindow = {
	"el" : null
};

HelpWindow.create = function(){
	var screenBounds = air.Screen.mainScreen.visibleBounds;
	var windowOptions = new air.NativeWindowInitOptions();
	windowOptions.type = air.NativeWindowType.LIGHTWEIGHT;
	windowOptions.systemChrome = air.NativeWindowSystemChrome.NONE;
	windowOptions.transparent = true;	

    this.el = air.HTMLLoader.createRootWindow(false, windowOptions, false);	

    this.el.window.nativeWindow.width = 696;
    this.el.window.nativeWindow.height = 564;
    this.el.window.nativeWindow.y = (screenBounds.bottom / 2) - 282;
    this.el.window.nativeWindow.x = (screenBounds.right / 2)  - 348; 
    this.el.window.nativeWindow.alwaysInFront = false;    

    //bridge
    this.el.window.Controller = this;

    this.el.load(new air.URLRequest('help.html'));
}

HelpWindow.open = function(topic){
   // this.el.window.nativeWindow.visible = true;
    //this.el.window.nativeWindow.orderToFront();  
	 
    this.el.window.nativeWindow.activate();   
    this.el.window.showTopic(topic); 	 
}

HelpWindow.close = function(){
    this.el.window.nativeWindow.visible = false;
}