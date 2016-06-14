$(document).ready(function(){
    $("#search-button").click(function(){
        $("#search-form").slideToggle(200);
    });
    
    $("#sort-button").click(function(){
        //Modal of some sort, idk
        alert("Sort options here")
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
