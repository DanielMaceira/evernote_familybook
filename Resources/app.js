/*
* A master detail view, utilizing a native table view component and platform-specific UI and navigation. 
* A starting point for a navigation-based application with hierarchical data, or a stack of windows. 
* Requires Titanium Mobile SDK 1.8.0+.
* 
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*  
*/

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		//Here is how it is used
		/*
		var ApplicationWindow = Ti.UI.createWindow({
				navBarHidden : true,
				exitOnClose  : true,
				backgroundColor : '#fff'
			}),
			ActionBarView = require('ui/tablet/ActionBarView'),
			actionBar = new ActionBarView({
				tabs : [
					{
						text : 'Home',
						id : 'home',
						selected : true,
						
					},
					{
						text : 'Add Family',
						id : 'products'
					}
				]
			});
		
		ApplicationWindow.add(actionBar);
		
		actionBar.addEventListener(
			'ActionBar.NavigationTab:Click',
			function(e){
				//Add code to manage windows or views
				alert(e.tabId); //fire alert to make sure this works
			}
		);
		ApplicationWindow.open();
		*/
		
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (osname === 'iphone') {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		else if (osname == 'mobileweb') {
			Window = require('ui/handheld/mobileweb/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	}
	new Window().open();
})();
