function EvernoteAddNote(PersonName, NotebookId){
	Titanium.include('../scripts/utils.js');
	Titanium.include('../scripts/validation.js');
	
	var self = Ti.UI.createView({
		backgroundColor: '#daebf5'
	});
	
	var back = Titanium.UI.createButton({
		title: 'Back',
		//left:10,
		height:45,
		width:60,
		top:5, right:5
	});
	back.addEventListener('click', function(){
		//alert('Add a Moment started...');
		self.parent.remove(self);
	});
	self.add(back);
	
	var lbl = Ti.UI.createLabel({
		text:'Add Events',
		font: {fontSize:'18pt', fontFamily:'Helvetica'},
		height:'auto',
		width:'auto',
		color:'#000066',
		top:0
	});
	self.add(lbl);
	
	var lblTxt1 = Titanium.UI.createLabel({
		top:60,
		text: 'Fill this form to add moments in the timeline of ' + PersonName,
		font: {fontSize:'14pt', fontFamily:'Helvetica'},
		width:'auto',
		height:'auto',
		color:'#000'
	});
	self.add(lblTxt1);
	
	//BLOCO FOTO E DESCRICAO
	var viewForm = Ti.UI.createView({
		layout:'vertical',
		left:30,
		right:30,
		top:100
	});
	
	var viewImg = Ti.UI.createView({
		width:400, height: 200
	});
	// BOTAO PICTURE
	var BtPictur = Titanium.UI.createButton({
		//title: 'Tirar Foto',
		//left:10,
		height:80,
		width:80,
		backgroundImage: '../../image/add-photo.png',
		top: 3,
		left: 3
	});
	BtPictur.addEventListener('click', function(){
		CameraToFile();
	});
	viewImg.add(BtPictur);
	viewForm.add(viewImg);
	
		// TITULO
	var tf1 = Titanium.UI.createTextField({
		hintText: 'Give a title',
		color:'#000',
		left:'auto',
		width:'90%',
		height:100,
		top:2,
		left:50,
		right:50,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	viewForm.add(tf1);

	// DESCREVA
	var tf2 = Titanium.UI.createTextArea({
		value: 'Describe this moment to remember in the future',
		color:'#777',
		left: 0,
		width: '90%',
		height:200,
		top:3,
		left:50,
		right:50,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_LINE
	});
	tf2._hintText = tf2.value;
	tf2.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	    }
	});
	tf2.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	    }
	});
	viewForm.add(tf2);
	//FIM BLOCO FOTO E DESCRICAO
		
	var save = Titanium.UI.createButton({
		title: 'Add this',
		//left:10,
		height:45,
		width:140
	});
	save.addEventListener('click', function(){
		
		//if(NetworkAvailabe(true)){
			if(FormValidado()){
				var xhr = Titanium.Network.createHTTPClient();
				xhr.onload = function(){
					//self.parent.fireEvent('ReloadFamily', null);
					//self.parent.StartLoading(NotebookId);
					self.parent.fireEvent('StartLoadingAgain', null);
					self.parent.remove(self);
				};
				xhr.onerror = function(e){
					Ti.API.info(">>> Erro: " + e.error);
					alert(e.error);
					alert(this.responseText);
					//actInd.hide();
			      	//AbreErroDeConexao();
				}
				xhr.onreadystatechange = function(){
					if (this.readyState == 4){
						//alert(this.responseText);
					}
				}
			   
				xhr.setTimeout(10000);
				//xhr.open('POST', 'http://familybook-hack.appspot.com/save_note/?notebookid=' + NotebookId + '&title=' + tf1.value + '&description=' + tf2.value);
				xhr.open('POST', 'http://familybook-hack.appspot.com/save_note/');
				
				//xhr.setRequestHeader('Content-Type', 'multipart/form-data');
				//xhr.setRequestHeader("enctype", "multipart/form-data");
				//xhr.setRequestHeader('Content-Type', 'application/octet-stream');
				
				//xhr.setRequestHeader('notebookid', NotebookId);
				//xhr.setRequestHeader('title', tf1.value);
				//xhr.setRequestHeader('description', tf2.value);
				
				var boundary = '----12345568790';
				var header =  "--" + boundary + "\n" + "Content-Disposition: form-data; name=\"notebookid\"\n\n" + NotebookId + "\n";
				header += "--" + boundary + "\n" + "Content-Disposition: form-data; name=\"title\"\n\n" + tf1.value + "\n";
				header += "--" + boundary + "\n" + "Content-Disposition: form-data; name=\"description\"\n\n" + tf2.value + "\n";
				header += "--" + boundary + "\n";
				header += "Content-Disposition: form-data; name=\"image\";";
				header += "filename=\"foto.jpg\"\n;";
				header += "Content-Type: application/octet-stream\n\n";
				header += "Content-Transfer-Encoding: binary";

				//alert('filename ' + Ti.App.myGlobalVar);
				
				if(Ti.App.myGlobalVar != null){
					var uploadFile = Titanium.Filesystem.getFile(Ti.App.myGlobalVar);//(Titanium.Filesystem.resourcesDirectory, file);
					//var uploadStream = Titanium.Filesystem.getFileStream(uploadFile);
					//uploadStream.open(Titanium.Filesystem.MODE_READ);
					var content = uploadFile.read();
					//uploadStream.close();
				
					var fullContent = header + content + "\n--" + boundary + "--";
					//var fileContents = uploadFile.read();
					//alert(fullContent);
				
					//xhr.setRequestHeader("Content-type", "multi-part/form-data; boundary=\"" + boundary + "\"");
					//xhr.setRequestHeader("Connection", "keep-alive");
					//xhr.send(fullContent);
					xhr.send({
						image: content,
						notebookid: NotebookId,
						title: tf1.value,
						description: tf2.value
					});
				} else {
					alert('Incluindo sem foto...');
					xhr.send({
						notebookid: NotebookId,
						title: tf1.value,
						description: tf2.value
					});
				}
			}
		//}
	});
	viewForm.add(save);
	
	self.add(viewForm);
	
	function FormValidado(){
		if(tf1.value == null || tf1.value == ''){
			ExibirAlert(L('cadastro_valid_tit'), L('cadastro_valid_msg1'), 'Ok');
			return false;
		}
		if(tf2.value == null || tf2.value == ''){
			ExibirAlert(L('cadastro_valid_tit'), L('cadastro_valid_msg2'), 'Ok');
			return false;
		}
		
		//if(tf3.value == null || tf3.value == ''){
		//	ExibirAlert(L('cadastro_valid_tit'), L('cadastro_valid_msg3'), 'Ok');
		//	return false;
		//}
		return true;
	}
	
	function RetornaDataBR(pickerdate){
			var day = pickerdate.getDate();
	    	day = day.toString();
	 
		    if (day.length < 2) {
		        day = '0' + day;
		    }
	 
		    var month = pickerdate.getMonth();
		    month = month + 1;
		    month = month.toString();
		 
		    if (month.length < 2) {
		        month = '0' + month;
		    }
	 
		    var year = pickerdate.getFullYear();
		    var dataPadrao = day + "/" + month + "/" + year;
		    
		    return dataPadrao;
	}
	
	function CameraToFile() {
		//var win = Titanium.UI.currentWindow;
		
		Titanium.Media.showCamera({
		
			success:function(event)
			{
				var cropRect = event.cropRect;
				var image = event.media;
				var filename = Titanium.Filesystem.applicationDataDirectory + "/"+ 'camera_photo' + new Date().getTime() + ".png";
				var f = Titanium.Filesystem.getFile(filename);
				if (f.exists()) {
					Ti.API.info('The file exist , trying to delete it before using it :' + f.deleteFile());
					f = Titanium.Filesystem.getFile(filename);
				}
				f.write(image);
				
				//var picture = Ti.UI.createImageView({ image: f.nativePath, width:100, height:210});
				//scrollView.add(picture);
				BtPictur.image = f.nativePath;
				
				if(viewImg.imgtest != null){
					viewImg.remove(imgtest);
				}
				Ti.App.myGlobalVar = f.nativePath;
				var imgtest = Ti.UI.createImageView({
					image: f.nativePath,
					right: 5,
					top: 5,
					width:320,
					height:280
				});
				viewImg.add(imgtest);
				
				Ti.API.info('picture.image :' + BtPictur.image);
				Ti.API.info('f.nativePath :' + f.nativePath);
				
				//alert('picture.image :' + BtPictur.image);
				//alert('f.nativePath :' + f.nativePath);
				//win.backgroundImage = f.nativePath;
			},
			cancel:function()
			{
		
			},
			error:function(error)
			{
				// create alert
				var a = Titanium.UI.createAlertDialog({title:'Camera'});
		
				// set message
				if (error.code == Titanium.Media.NO_CAMERA)
				{
					a.setMessage('Device does not have video recording capabilities');
				}
				else
				{
					a.setMessage('Unexpected error: ' + error.code);
				}
		
				// show alert
				a.show();
			},
			allowEditing:true
		});
		//return win;
	};
	
	return self;
}

module.exports = EvernoteAddNote;