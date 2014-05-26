
var pstyle = 'background-color: #F5F6F7; border: 1px solid #dfdfdf; padding: 5px;';
$('#layout').w2layout({
  name: 'layout',
  panels: [
    {
			type: 'top',  size: 50, resizable: true, style: pstyle
		},
    { 
			type: 'left', size: 200, resizable: true, style: pstyle, 
			content: "<div id='left_content'></div>"
		},
    { 
			type: 'main', style: pstyle, 
			content: "<div id='main_content'></div>", 
			tabs: {
				tabs: [{
					id:"tab1",
					caption:"Get Started",
					closable: true
				}],
				onClick: function(event){
					console.log(event);
//					$('#main_content').hide();
					$('#main_content').children().each(function(){$(this).hide()});
					$('#' + event.target + "_content").show();

					//				this.owner.content('main', event);
				},
				onClose: function(event){
//					console.log(main_tab_contents);
					$('#' + event.target + "_content").remove();
					main_tab_contents[event.target].editor.destroy();
//					$('#main_content').remove('#' + event.target + "_content");
//					$('#' + event.target + "_content").editor.dispose();
				}
				
			}},
    { type: 'preview', size: '50%', resizable: true, style: pstyle},
    { type: 'right', size: 200, resizable: true, style: pstyle},
    { type: 'bottom', size: 50, resizable: true, style: pstyle}
  ]
});


// then define the sidebar
var layout = w2ui.layout;
layout.content('left', '<div id="tree1"></div>');
var main_tab_contents = {};
var count = 0;
main_tab_contents["tab0"] = {};
loadEditor("tab0", "README");

function openFile(node){
	var mainTabs = layout.get('main').tabs;
	count ++;
	var tabID = "tab"+count.toString();
	mainTabs.add([{
		id:tabID, 
		caption: node.title, 
		closable: true
	}]);
//	main_tab_contents[tabID].jqobj = $('#'+tabID+ '_content');
	mainTabs.click(tabID);
	loadEditor(tabID, node.data.fullPath);
}

function loadEditor(tabID, path){

	$("#main_content").append('<div id="'+tabID+ '_content" style="width:100%;height:500px"></div>');
  var editor = ace.edit(tabID+ '_content');
  editor.setTheme("ace/theme/twilight");
  $.ajax({
    url: "/file/" + encodeURIComponent(path)
  }).done(function(data) {
    editor.setValue(data);
  });
  main_tab_contents[tabID] = {editor: editor};
}
$("#tree1").fancytree({
	source: {
		url: "/dir/",
		cache: false
	},
	lazyLoad: function(event, data){
		var node = data.node;
		data.result = $.getJSON("/dir/"+encodeURIComponent(node.data.fullPath));
  },
	activate: function(event, data){
    // A node was activated: display its title:
		openFile(data.node);
	}
});


