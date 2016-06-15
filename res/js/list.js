$(document).ready(function(){

    var speed = "fast";
    
    var searchForm = $(".search-form");
    var sortForm = $(".sort-form");
    var goButton = $(".go-button");
    var btnContainer = $(".btn-container");

    var searchVisibility = false;
    var sortVisibility = false;

    var updateVisibility = function(){
        if(searchVisibility){
            searchForm.slideDown(speed);
        }else{
            searchForm.slideUp(speed);
        }
        
        if(sortVisibility){
            sortForm.slideDown(speed);
        }else{
            sortForm.slideUp(speed);
        }
        
        if(searchVisibility || sortVisibility){
            btnContainer.slideDown(speed);
        }else{
            btnContainer.slideUp(speed);
        }
        
        var goIcons = "";
        if(searchVisibility){ goIcons += '<i class="fa fa-search"></i>'; }
        if (searchVisibility && sortVisibility){ goIcons += "   &   "; }
        if (sortVisibility){ goIcons += '<i class="fa fa-sort-alpha-asc"></i>'; }
        goButton.html(goIcons);
    };
    
    $("#search-button").click(function(){
        searchVisibility = !searchVisibility;
        updateVisibility();
    });
    
    $("#sort-button").click(function(){
        sortVisibility = !sortVisibility;
        updateVisibility();
    });

    //Maintain scroll position on page reloads
    $(window).unload(function(){
        window.sessionStorage.setItem("scrollPosition", window.pageYOffset);
        return 'no';
    });

    if(window.sessionStorage.getItem("scrollPosition")){
        window.scrollTo(0, window.sessionStorage.getItem("scrollPosition"));
    }
});
