//detecta se é Android ou iPhone
var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}

var isIphone = false;
if (Titanium.Platform.name == 'iPhone OS'){
	isIphone = true;
}

//detecta conexão com Internet
function NetworkAvailabe(aviso){
	if (!Titanium.Network.online) {
		if(aviso == true){
			var a = Titanium.UI.createAlertDialog({ 
				title:'Conexão com Internet',
				message: 'O aplicativo necessita de uma conexão com a Internet 3G ou Wifi.\n\nVerifique se o seu aparelho está com conexão e tente novamente.',
				buttonNames: ['OK']
			});
			a.show();
		}
		return false;
	} else {
		return true;
	}
}

function AbreErroDeConexao(){
	var alert = Titanium.UI.createAlertDialog({
		title: 'Erro de Conexão',
		message: 'Houve um erro de conexão com o servidor.\n\nVerifique a sua conexão com a Internet e tente novamente.',
		//message: 'Error ' + xhr.connected  + ' ' + xhr.statusText,
		buttonNames: ['OK']
	});
	alert.show();
}

function ExibirAlert(titulo, msg, botao){
	var alert = Titanium.UI.createAlertDialog({
		title: titulo,
		message: msg,
		buttonNames: [botao]
	});
	alert.show();
}

function UsuarioCadastrado(){
	var userProfile = JSON.parse(Ti.App.Properties.getString("userProfile"));
	//Ti.API.info('>>> userProfile: ' + userProfile);
	if(userProfile == null){
		var avCad = Titanium.UI.createAlertDialog({
			title: 'Cadastro Necessário',
			message: 'Para utilizar os cupons, é preciso efetuar o seu cadastro no Poulpe.\n\nPara prosseguir, clique no botão Cadastre-se logo abaixo.',
			buttonNames: ['Cadastre-se', 'Cancelar']
		});
		avCad.addEventListener('click', function(ev) {
			avCad.hide();
			if (ev.index == 0) { // clicked "Agora"
				actInd.message = 'Abrindo o cadastro...';
				actInd.show();
				Ti.App.fireEvent('efetuar_cadastro', { message: ''});
			} else if (ev.index == 1) { // clicked "Depois"
				// do nothing
			}
		});
		avCad.show();
	}
}

function trace(msg)
{
   Ti.API.info(msg);
   Ti.API.info("Available memory: " + Ti.Platform.availableMemory);
}

function strip_tags (str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    
    // fixed Titanium warning by: Kosso
    
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'

    var key = '', allowed = false;
    var matches = [];
    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = '';

    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };

    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }

    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);

    // Go through all HTML tags
    for (key in matches) {

		if(key){

			// Save HTML tag
			html = matches[key].toString();

			// Is tag not in allowed list? Remove from str!
			allowed = false;

			// Go through all allowed tags
			for (k in allowed_array) {

				if(k){

					// Init
					allowed_tag = allowed_array[k];
					i = -1;

					if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
					if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
					if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

					// Determine
					if (i == 0) {
						allowed = true;
						break;
					}

				}
			}

			if (!allowed) {
				str = replacer(html, "", str); // Custom replace. No regexing
			}
        
        }
    }

    return str;
}

function CriarLoading(){
	// Loading...
	var actInd = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:10,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	return actInd;
}

// recursive function which converts an XML DOM to a JavaScript Object
function xml2Obj (oXMLDom) {
	var oRObj = true;
	if (oXMLDom.nodeType === 3) { // text
		oRObj = oXMLDom.nodeValue.replace(/^\s+|\s+$/g, "");
  	} else {
    	if (oXMLDom.nodeType === 1) { // element
  			// do attributes
  			if (oXMLDom.attributes.length > 0) {
    			var iAttrib;
    			oRObj = {};
    			oRObj["@attributes"] = {};
				for (var iAttrId = 0; iAttrId < oXMLDom.attributes.length; iAttrId++) {
					iAttrib = oXMLDom.attributes.item(iAttrId);
					oRObj["@attributes"][iAttrib.nodeName] = iAttrib.nodeValue;
				}
			}
		}
		
		// do children
		if (oXMLDom.hasChildNodes()) {
			var iKey, iValue, iXMLNode;
			if (oRObj === true) { oRObj = {}; }
  			for (var iChildId = 0; iChildId < oXMLDom.childNodes.length; iChildId++) {
    			iXMLNode = oXMLDom.childNodes.item(iChildId);
    			iKey = iXMLNode.nodeType === 3 ? "@content" : iXMLNode.nodeName;
				iValue = xml2Obj(iXMLNode);
				if (oRObj.hasOwnProperty(iKey)) {
  					if (iXMLNode.nodeType === 3) { oRObj[iKey] += iValue; }
  					else {
    					if (oRObj[iKey].constructor !== Array) { oRObj[iKey] = [oRObj[iKey]]; }
    					oRObj[iKey].push(iValue);
  					}
				} else if (iXMLNode.nodeType !== 3 || iValue !== "") { oRObj[iKey] = iValue; }
      		}
		}
	}
	return(oRObj);
};
