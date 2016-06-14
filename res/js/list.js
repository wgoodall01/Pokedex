$(document).ready(function(){
    $("#search-button").click(function(){
        $("#search-form").slideToggle(200);
    });
    
    $("#sort-button").click(function(){
        //Modal of some sort, idk
        alert("Sort options here")
    });

    //Maintain scroll position on page reloads
    $(document).on("beforeunload", function(){
        window.sessionStorage.setItem("scrollPosition", window.pageYOffset);
    });

    if(window.sessionStorage.getItem("scrollPosition")){
        window.scrollTo(window.sessionStorage.getItem("scrollPosition"));
    }
});
