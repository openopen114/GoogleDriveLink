

 


var LinkModule = angular.module("LinkModule", []);
LinkModule.controller("LinkCtrl", function($scope,$http) {
 	
	$scope.p1 = "Link";
	$scope.isCopy = false;
	$scope.statusOK = false; 


	// GD shareable Link Submit
	$scope.GDSLSubmit = function(){
		var url = $scope.GDSL;
		var fildID = "";
		// link type 1  https://drive.google.com/open?id=XXXXXXXXXXXX
		// link type 2  https://drive.google.com/file/d/XXXXXXXXXXXX


		var isType1 = /(id=)+/g.test(url); 

		var isType2 = /(file)/g.test(url);


		if(isType1){
			console.log("isType1");
			fildID = url.split(/\=+/)[1];
			console.log("fildID:"+fildID);
			assignDownloadLink(fildID);

		}

		if(isType2){
			console.log("isType2");
			fildID = url.split(/\/d\/+/)[1];  // xxxxx/view?usp=sharing
			fildID = fildID.split(/\/+/)[0];
			console.log("fildID:"+fildID);
			assignDownloadLink(fildID);
		}

		if(isType1 == false && isType2 == false){
			// fail
			$scope.GDDL = "";
			$scope.statusSty = {'display':'block','color':'#fff'};
			$scope.statusOK = false;
			$scope.isCopy = false;
		}


		function assignDownloadLink(fildID){
			var DLURLHead = "https://drive.google.com/uc?export=download&id=";
			var DLURL =  DLURLHead + fildID;
			console.log("DLURL:"+DLURL);
			$scope.GDDL = DLURL;
			$scope.statusSty = {'display':'block','color':'#76FF03'};
			$scope.statusOK = true;
			window.clipboardData.setData("Text","我是序號"); 

		}
	}

	// GD Download Link Submit / Copy
	$scope.GDDLSubmit = function(){

		if($scope.statusOK){
			$scope.isCopy = true;
			$scope.CopySty =  {'color':'#76FF03'};
		}

	}


	// input chang / clear
	$scope.change = function(){
		$scope.statusSty = {'display':'none'};
		$scope.isCopy = false;
		$scope.GDDL = ""; 
	}
	
 
});

 

 
 



App = angular.module("App", ["LinkModule","ngSanitize"]);

