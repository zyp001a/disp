
$('#jstree_demo').jstree({
  "core" : {
    "animation" : 0,
    "check_callback" : true,
    "themes" : { "stripes" : true },
    'data' : {
      'url' : function (node) {
				return 'dir';
      },
      'data' : function (node) {
        return { 'id' : node.id };
      }
    }
  },
  "types" : {
    "#" : {
      "max_children" : 1, 
      "max_depth" : 1, 
      "valid_children" : ["root"]
    },
    "root" : {
      "icon" : "bower_components/jstree/dist/themes/default/40px.png",
      "valid_children" : ["default"]
    },
    "default" : {
      "valid_children" : ["default","file"]
    },
    "file" : {
      "icon" : "glyphicon glyphicon-file",
      "valid_children" : []
    },
		"checkbox" : {
      "keep_selected_style" : false
    }
  },
  "plugins" : [
    "contextmenu", "dnd", "search",
    "state", "types", "wholerow", "checkbox"
  ]
});

 var editor = ace.edit("ace_demo");
editor.setTheme("ace/theme/twilight");
