function EvernoteTimeline(PersonName, NotebookId){
	//var win = Titanium.UI.currentWindow;
	//win.backgroundColor = 'green';
	
	var self = Ti.UI.createView({
		backgroundColor: '#daebf5',
		top:0,
		bottom:0,
		right:0,
		left:0
	});
	
	var lbl = Ti.UI.createLabel({
		text:'Timeline for ' + PersonName,
		font: {fontSize:'18pt', fontFamily:'Helvetica'},	
		height:'auto',
		width:'auto',
		color:'#000066',
		top:0
	});
	self.add(lbl);
	
	var save = Titanium.UI.createButton({
		title: 'Add',
		//left:10,
		height:45,
		width:60,
		top:5, right:5
	});
	save.addEventListener('click', function(){
		//alert('Add a Moment started...');
		
		var EvernoteAddNote = require('ui/tablet/EvernoteAddNote')
		var evernoteAddNote = new EvernoteAddNote(PersonName, NotebookId);
		self.add(evernoteAddNote);
		
		//self.fireEvent('AddMoment', {
		//	NotebookId: 0
		//});
	});
	self.add(save);
	
	////SCROLABLE VIEW
	function getOrientation(o)
	{  //Came from orientation.js, but we didn't need the buttons and such
		switch (o)
		{
			case Titanium.UI.PORTRAIT:
				return 'portrait';
			case Titanium.UI.UPSIDE_PORTRAIT:
				return 'upside portrait';
			case Titanium.UI.LANDSCAPE_LEFT:
				return 'landscape left';
			case Titanium.UI.LANDSCAPE_RIGHT:
				return 'landscape right';
			case Titanium.UI.FACE_UP:
				return 'face up';
			case Titanium.UI.FACE_DOWN:
				return 'face down';
			case Titanium.UI.UNKNOWN:
				return 'unknown';
		}
	}
	
	//
	// orientation change listener
	//
	Ti.Gesture.addEventListener('orientationchange',function(e){
	
		// get orienation from event object
		var orientation = getOrientation(e.orientation);
	});
	
	function StartLoading(NotebookId){
		//alert('EvernoteTimeline ' + NotebookId);
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(){
			var JsonObj = JSON.parse(this.responseText);
			LoadTimeline(JsonObj);
		};
		xhr.onerror = function(e){
			Ti.API.info(">>> Erro: " + e.error);
			alert(e.error);
			alert(this.responseText);
			actInd.hide();
	      	//AbreErroDeConexao();
		}
		xhr.setTimeout(10000);
		xhr.open('POST', 'http://familybook-hack.appspot.com/list_notes/' + NotebookId);
		xhr.send();
	}
	
	function LoadTimeline(ObjJson){
		var ViewsArr = [];
		if(ObjJson.length > 0){
			
			//
			for (var i=0; i <= (ObjJson.length - 1); i++){
				
				var view1 = Ti.UI.createView({
					top:50,
					backgroundImage: ObjJson[i].image,
					backgroundColor:'#fff'
				});
				
				/*
				var img1 = Ti.UI.createImageView({
					image: ObjJson[i].image,
					width: 840,
					heigth: 480,
					top:30
				})
				view1.add(img1);
				*/
				
				var l1 = Ti.UI.createLabel({
					text: ObjJson[i].title,
					font: {fontSize:'24pt', fontFamily:'Helvetica'},	
					color:'#000',
					backgroundColor:'#fff',
					width:'auto',
					height:'auto',
					top:20
				});
				view1.add(l1);
				
				var ldt = Ti.UI.createLabel({
					text: ObjJson[i].created,
					font: {fontSize:'8pt', fontFamily:'Helvetica'},	
					color:'#000',
					backgroundColor:'#fff',
					width:'auto',
					height:'auto',
					top:90
				});
				view1.add(ldt);
				
				//alert('Description: ' + ObjJson[i].description);
				var l2 = Ti.UI.createLabel({
					text: ObjJson[i].description,
					font: {fontSize:'12pt', fontFamily:'Helvetica'},	
					color:'#000',
					backgroundColor:'#fff',
					width:'auto',
					height:'auto',
					top: 570,
					width:600
				});
				view1.add(l2);
				
				ViewsArr.push(view1);
			}
			
			var scrollView = Titanium.UI.createScrollableView({
				views: ViewsArr,
				showPagingControl:true,
				pagingControlHeight:30,
				maxZoomScale:2.0,
				currentPage:0,
				top:50
			});
			
			self.add(scrollView);
			
			var i=1;
			var activeView = view1;
			
			scrollView.addEventListener('scroll', function(e)
			{
				activeView = e.view;  // the object handle to the view that is about to become visible
				i = e.currentPage;
				Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
			});
			scrollView.addEventListener('click', function(e)
			{
				Ti.API.info('ScrollView received click event, source = ' + e.source);
			});
			scrollView.addEventListener('touchend', function(e)
			{
				Ti.API.info('ScrollView received touchend event, source = ' + e.source);
			});
			//END SCROLAVLE
		} else {
			var TxtNothing = Ti.UI.createLabel({
				text:'There is nothing in this timeline yet',
				font: {fontSize:'14pt', fontFamily:'Helvetica'},	
				color:'red',
				width:'auto',
				height:'auto'
			});
			self.add(TxtNothing);
		}
		
		actInd.hide();
	}
	
	//loading
	Titanium.include('../../scripts/utils.js');
	var actInd = CriarLoading();
	actInd.message = 'Loading timeline...';
	actInd.show();
	
	StartLoading(NotebookId);
	
	self.addEventListener('StartLoadingAgain', function(e) {
		//alert('StartLoadingAgain');
		actInd.show();
		StartLoading(NotebookId);
	});
	//win.add(self);
	return self;
};

module.exports = EvernoteTimeline;
