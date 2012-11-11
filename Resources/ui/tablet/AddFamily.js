function AddFamily(){
	var dataniver = null;
	
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
		text:'Add your family',
		font: {fontSize:'18pt', fontFamily:'Helvetica'},
		height:'auto',
		width:'auto',
		color:'#000066',
		top:0
	});
	self.add(lbl);
	
	var ViewCad = Ti.UI.createView({
		layout:'vertical',
		top:200,
		width:'90%',
		height:450
	});
	
	var TextBox1 = Ti.UI.createTextField({
		hintText: 'Name',
		width:'52%',
		
		height: 100,
		top:0
	});
	ViewCad.add(TextBox1);
	
	//BIRTHDAY DATE
	var ViewBday = Ti.UI.createView({
		layout:'vertical',
		right:0
	});
	var label = Ti.UI.createLabel({
		text:'Choose a birthday date',
		height:'auto',
		width:'auto',
		color:'#000',
		top:0
	});
	ViewBday.add(label);
	
	var today = new Date();
	var value = new Date();
	value.setFullYear(today.getFullYear());
	value.setMonth(today.getMonth()-1);
	value.setDate(today.getDay());
	
	var picker = Ti.UI.createPicker({
		top:0,
		useSpinner: false,
		type:Ti.UI.PICKER_TYPE_DATE,
		value:value
	});
	dataniver = RetornaData(value);
	
	// turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	ViewBday.add(picker);
	ViewCad.add(ViewBday);
	
	picker.addEventListener('change',function(e){
		//alert(e.value);
		dataniver = RetornaData(e.value);
	});
	
	function RetornaData(pickerdate){
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
	    var dataPadrao = month + "/" + day + "/" + year;
	    
	    return dataPadrao;
	}

	var BtnAddNow = Titanium.UI.createButton({
		title:'Add Member',
		top:460
	});
	BtnAddNow.addEventListener('click', function() {
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function(){
			self.parent.fireEvent('ReloadFamily', null);
			self.parent.remove(self);
		};
		xhr.onerror = function(e){
			Ti.API.info(">>> Erro: " + e.error);
			alert(e.error);
			//actInd.hide();
	      	//AbreErroDeConexao();
		}
		xhr.setTimeout(10000);
		xhr.open('POST', 'http://familybook-hack.appspot.com/save_notebook/?notebookname=' + TextBox1.value + '&birthdaydate=' + dataniver);
		xhr.send();
	});
	self.add(ViewCad);
	self.add(BtnAddNow);
	
	return self;
}

module.exports = AddFamily;