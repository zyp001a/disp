rootApp.controller('^^=name$$Controller', ['$scope', '^^=db$$Service', function($scope, dbService){
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/twilight");
//	editor.getSession().setMode("ace/mode/json");
	dbService.get().then(function(result){
		
		editor.setValue(decodeURIComponent(result.data.file));
		$scope.save=function(){
			dbService.put({"file":encodeURIComponent(editor.getValue())}).then(function(result){
				console.log(result);
			});
		}
	});
}]);
