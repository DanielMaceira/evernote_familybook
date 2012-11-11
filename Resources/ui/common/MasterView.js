//Master View Component Constructor
function MasterView() {
	
	function LoadFamily(){
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(){
			Ti.API.info('>>> got the XML!');
			
			var JsonObj = JSON.parse(this.responseText);
			ListarNotebooks(JsonObj);
	
		};
		xhr.onerror = function(e){
			Ti.API.info(">>> Erro: " + e.error);
			alert(e.error);
			//actInd.hide();
	      	//AbreErroDeConexao();
		}
		xhr.setTimeout(10000);
		xhr.open('POST', 'http://familybook-hack.appspot.com/list_notebooks/');
		xhr.send();
	}
	
	//var JsonNotebooks = '[ { "NotebookId":"1", "NotebookName":"Titulo da Nota 1" }, { "NotebookId":"2", "NotebookName":"Titulo da Nota 2"} ]';
	//var JsonNotebooks = '[ ]';
	
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#daebf5'
	});
	
	function ListarNotebooks(JsonNotebooks){
		
		if(JsonNotebooks != null){ 
			//alert('Tamanho do NotebookList: ' + JsonObj.length);
			//CarregarTableView(JsonObj);
		}
		
		/*
		if(JsonNotebooks.length <= 0){
			var TxtSemNada = Titanium.UI.createLabel({
				color:'#f42a29',
				text: 'You need to add a member',
				shadowColor:'#fff',
				shadowOffset:{x:1,y:1},
				font:{fontSize:22},
				height:'auto',
				width: 'auto',
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				top:50
			});
			self.add(TxtSemNada);
		}
		*/
			//Ti.API.info('>>> JsonObj.length: ' + JsonObj.length);
			
			var data = [];
			
			//LINHA 1 LOGOTIPO
			var rowHeader = Ti.UI.createTableViewRow({
				height: 50,
				color: 'blue', touchEnabled: false
			});
			var ViewRow = Ti.UI.createView({
				layout: 'vertical',
				top:0, left: 0, right:0,
				height: 'auto'
			});
			
			var lbl1 = Ti.UI.createLabel({
				text: 'Evernote Family Book',
				font: {fontSize:'10pt', fontFamily:'Helvetica'},	
				height:'auto',
				width:'auto',
				color:'blue',
				top:0
			});
			ViewRow.add(lbl1);
			rowHeader.add(ViewRow);				
			data.push(rowHeader);
			
			for (var i=0; i <= (JsonNotebooks.length - 1); i++){
				var row = Ti.UI.createTableViewRow();
				//row.backgroundColor = '#fff';
				//row.backgroundSelectedColor = '#fff';
				//row.selectedBackgroundColor = '#fff';
				//row.className = 'NotebooksDataRow' + i;
				//row.clickName = 'row';
				row.height = 'auto';
				
				//DADOS DO NOTEBOOK
				//PersonName
				//BirthdayDate
				//row.title = JsonNotebooks[i].PersonName + '\n' + JsonNotebooks[i].BirthdayDate;
				row.font = {fontSize:'14pt', fontFamily:'Helvetica'};
				row.color = 'navy';
				row.className = JsonNotebooks[i].NotebookId;
				row.title = JsonNotebooks[i].PersonName;
				row.hasChild = true;
				
				var ViewRow = Ti.UI.createView({
					layout: 'vertical',
					top:0, left: 0, right:0,
					height: 'auto'
				});
				
				var lbl1 = Ti.UI.createLabel({
					text: JsonNotebooks[i].PersonName,
					font: {fontSize:'14pt', fontFamily:'Helvetica'},	
					height:'auto',
					width:'auto',
					color:'#000',
					top:0,
					left:0
				});
				ViewRow.add(lbl1);
				
				var lbl2 = Ti.UI.createLabel({
					text: JsonNotebooks[i].BirthdayDate,
					font: {fontSize:'10pt', fontFamily:'Helvetica'},	
					height:'auto',
					width:'auto',
					color:'#000',
					top:0,
					left:0
				});
				ViewRow.add(lbl2);
				
				row.add(ViewRow);
				
				data.push(row);
			}
			
			var table = Ti.UI.createTableView({
				data:data,
				separatorColor:'#daebf5'
			});
			self.add(table);
			
			var BtnAddNow = Titanium.UI.createButton({
				title:'Add a Member',
				bottom: 50
			});
			BtnAddNow.addEventListener('click', function() {
				self.fireEvent('AddFamily', null);
			});
			self.add(BtnAddNow);
			
			//add behavior
			table.addEventListener('click', function(e) {
				//alert(e.rowData.title);
				self.fireEvent('NotebookSelected', {
					PersonName:e.rowData.title,
					NotebookId:e.rowData.className
				});
			});
		/*
		} else {
			//Ti.API.info('>>> JsonObj.length else: ' + JsonObj.length);
			var TxtSemNada = Titanium.UI.createLabel({
				color:'#f42a29',
				text: 'There is nothing yet',
				shadowColor:'#fff',
				shadowOffset:{x:1,y:1},
				font:{fontSize:22},
				height:'auto',
				width: 'auto',
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				top:50
			});
			self.add(TxtSemNada);
			
			var BtnAddNow = Titanium.UI.createButton({
				title:'Add Now',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
				top: 100
			});
			BtnAddNow.addEventListener('click', function() {
				self.fireEvent('AddFamily', null);
			});
			self.add(BtnAddNow);
		}
		*/
		actInd.hide();
	}
	
	//loading
	Titanium.include('../../scripts/utils.js');
	var actInd = CriarLoading();
	actInd.message = 'Loading your family...';
	actInd.show();
	
	self.addEventListener('ReloadFamily', function(e) {
		//alert('Reloading family...');
		LoadFamily();
	});
	
	LoadFamily();
	return self;
};

module.exports = MasterView;