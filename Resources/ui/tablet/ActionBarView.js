/*
 * 	Android API Guide
 *		http://developer.android.com/guide/topics/ui/actionbar.html
 *  Android Design Guide
 *		http://developer.android.com/design/patterns/actionbar.html
 *  Titanium Mobile will support someday
 *		https://jira.appcelerator.org/browse/TIMOB-2371
 */
var osName = Ti.Platform.osname,
	isAndroid = osName==='android',
	isIOS = osName==='iphone' || osName==='ipad' || osName==='ipod',
	theme = {
		fontFamily : isIOS ? 'Helvetica Nue' : 'Droid Sans',
		backgroundColor : '#cdcdcd',
		borderColor : '#b5b5b5',
		textColor : '#5f5f5f',
		dividerColor : '#b5b5b5',
		selectedColor : '#00b7e3',
		height : '48dp',
		buttonHeight : '46dp',
		selectedButtonHeight : '42dp',
		dividerWidth : 1,
		dividerHeight : '32dp',
		fontSize : '12dp'
	},
	events = {
		'TAB_CLICK' : 'ActionBar.NavigationTab:Click'
	};

function createNavigationTabGroup(tabs){
	var _tabs = tabs || [],
		_tabCount = _tabs.length,
		_i = 0,
		_deviceWidth = Ti.Platform.displayCaps.platformWidth,
		_width = (_deviceWidth / _tabCount) - 1,
		_selectedTab,
		_view = Ti.UI.createView({
			layout : 'horizontal',
			width : Ti.UI.FILL,
			top : 1,
			bottom : 1
		});

	for(; _i < _tabCount; _i++){
		_tabs[_i].width = _width;
		_tabs[_i] = buildTab(_tabs[_i]);
		_view.add(_tabs[_i].tabView);
		_view.add(tabSeperator());
	}

	_view.addEventListener(events.TAB_CLICK, function(e) {
		var _n = 0,
			_len = _tabs.length,
			_aTab;
		for(; _n<_len; _n++){
			_aTab = _tabs[_n];
			if(_aTab.tabView.id==_selectedTab){
				_aTab.select(false);
			}
			if(_aTab.tabView.id==e.tabId){
				_aTab.select(true);
			}
		}
		_selectedTab = e.tabId;
	});

	function tabSeperator(){
		var seperatorView = Ti.UI.createView({
				backgroundColor : theme.backgroundColor,
				width : theme.dividerWidth
			}),
			seperator = Ti.UI.createView({
				height : theme.dividerHeight,
				backgroundColor : theme.dividerColor
			});

		seperatorView.add(seperator);
		return seperatorView;
	}

	function buildTab(params){
		var _params = params || {},
			_tabView,
			_tabLabel,
			_config = {
				id : _params.id || (new Date()).getTime()+'',
				text : _params.text || "Nav",
				selectedColor : _params.selectedColor || theme.selectedColor,
				backgroundColor : _params.backgroundColor || theme.backgroundColor,
				textColor : _params.textColor || theme.textColor,
				width : _params.width || 'auto',
				selected : _params.selected || false
			};

		if(_config.selected){
			_selectedTab = _config.id;
		}

		_tabView = Ti.UI.createView({
			id : _config.id,
			backgroundColor : _config.selectedColor,
			width : _config.width,
			layout : 'vertical'
		});

		_tabLabel = Ti.UI.createLabel({
			text : _config.text,
			color  : _config.textColor,
			backgroundColor : _config.backgroundColor,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			height : _config.selected ? theme.selectedButtonHeight : theme.buttonHeight,
			left : 0,
			right : 0,
			font   : {
				fontSize   : theme.fontSize,
				fontWeight : 'bold'
			}
		});

		_tabView.add(_tabLabel);

		_tabView.addEventListener('click', function() {
			_view.fireEvent(
				events.TAB_CLICK,
				{ tabId : _tabView.id }
			);
		});

		return {
			tabView : _tabView,
			select : function(bool){
				_tabLabel.height = bool ? theme.selectedButtonHeight : theme.buttonHeight
			}
		};
	}

	return _view;
}

function ActionBarView(args) {
	var ActionBar = Ti.UI.createView({
			height : theme.height,
			backgroundColor : theme.borderColor,
			layout : 'horizontal',
			top : 0
		}),
		navigationTabGroup = createNavigationTabGroup(args.tabs);

	ActionBar.add(navigationTabGroup);

	return ActionBar;
}

module.exports = ActionBarView;