function HomeView() {
	var self = Ti.UI.createView({backgroundColor:'#daebf5'});
	
	var lbl = Ti.UI.createLabel({
		font: {fontSize:'24pt', fontFamily:'Helvetica'},	
		text:'Welcome to\nEvernote Family Book',
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	
	self.addEventListener('NotebookSelected', function(e) {
		//alert('function open win + NotebookId' + e.NotebookId);
		//lbl.text = e.name+': $'+e.price;
		
		/*
		var win = Titanium.UI.createWindow({
			url: 'EvernoteTimeline.js', 
			titleid: 'Timeline',
			animated: true,
			exitOnClose: false
		});
		win.open();
		*/
		var EvernoteTimeline = require('ui/tablet/EvernoteTimeline')
		var evernoteTimeline = new EvernoteTimeline(e.PersonName, e.NotebookId);
		
		self.add(evernoteTimeline);
		
		//var EvernoteAddNote = require('ui/tablet/EvernoteAddNote')
		//	var evernoteAddNote = new EvernoteAddNote(e.NotebookName, e.NotebookId);
		//	self.add(evernoteAddNote);
		
	});
	
	self.addEventListener('AddFamily', function(e) {
		//alert('function open win');
		//lbl.text = e.name+': $'+e.price;
		
		/*
		var win = Titanium.UI.createWindow({
			url: 'EvernoteTimeline.js', 
			titleid: 'Timeline',
			animated: true,
			exitOnClose: false
		});
		win.open();
		*/
		var AddFamily = require('ui/tablet/AddFamily')
		var addFamily = new AddFamily();
		self.add(addFamily);
		
	});
	
	self.addEventListener('AddMoment', function(e) {
		alert('Home Add a Moment listener');
		var EvernoteAddNote = require('ui/tablet/EvernoteAddNote')
		var evernoteAddNote = new EvernoteAddNote();
		self.add(evernoteAddNote);
		
	});
	
	self.addEventListener('ReloadFamily', function(e) {
		//alert('Reloading family...');
		self.parent.fireEvent('ReloadFamily', null);	
	});
	
	return self;
};

module.exports = HomeView;