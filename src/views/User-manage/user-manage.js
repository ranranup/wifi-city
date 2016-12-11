$(document).ready(function() {    

		   App.init();

});
   function showMask(){  
        $("#mask").css("height",$(document).height());  
        $("#mask").css("width",$(document).width());  
        $("#mask").show();  
    }  
    //让指定的DIV始终显示在屏幕正中间  
    function letDivCenter(divName){   
        var top = ($(window).height() - $(divName).height())/2;   
        var left = ($(window).width() - $(divName).width())/2;   
        var scrollTop = $(document).scrollTop();   
        var scrollLeft = $(document).scrollLeft();   
        $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();  
    }  
    function showAll(divName){  
        showMask();  
        letDivCenter(divName);  
    }  
    function DeleteAp(divName){
    	 showMask();  
         letDivCenter(divName); 
    }
    function AddAp(divName){
   	      showMask();  
          letDivCenter(divName); 
    }
    function CancelDeleteAp(divName){
    	 $("#mask").hide();
    	 $(".del-ap").hide();
    	 
    }
    function CancelAddAp(divName){
   	     $("#mask").hide();
   	     $(".add-ap").hide();
   	 
   }