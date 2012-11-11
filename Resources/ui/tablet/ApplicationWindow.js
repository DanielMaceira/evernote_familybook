function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		HomeView = require('ui/tablet/HomeView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#daebf5'
	});
		
	//construct UI
	var masterView = new MasterView(),
		homeView = new HomeView();
		
	//masterView.borderColor = '#000';
	//masterView.borderWidth = 1;
		
	//create master view container
	var masterContainer = Ti.UI.createView({
		top:0,
		bottom:0,
		left:0,
		width:240,
		backgroundColor:'#daebf5'
	});
	masterContainer.add(masterView);
	self.add(masterContainer);
	
	//create detail view container
	var detailContainer = Ti.UI.createView({
		top:0,
		bottom:0,
		right:0,
		left:240,
		backgroundColor:'#daebf5'
	});
	detailContainer.add(homeView);
	self.add(detailContainer);
	
	//add behavior for master view
	masterView.addEventListener('NotebookSelected', function(e) {
		//alert('AppWindow NotebookId ' + e.NotebookId);
		homeView.fireEvent('NotebookSelected', {
					PersonName:e.PersonName,
					NotebookId:e.NotebookId
				});
	});
	masterView.addEventListener('AddFamily', function(e) {
		homeView.fireEvent('AddFamily',e);
	});
	masterView.addEventListener('AddMoment', function(e) {
		alert('App Window Add a Moment listener');
		homeView.fireEvent('AddMoment',e);
	});
	
	homeView.addEventListener('ReloadFamily', function(e) {
		//alert('Reloading family...');
		masterView.fireEvent('ReloadFamily', null);	
	});
	//masterView.addEventListener('ReloadFamily', function(e) {
	//	alert('Reloading family...');		
	//});
	return self;
};

module.exports = ApplicationWindow;
