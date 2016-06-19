$(document).ready(function(){
    var pane = 0;
    var slideSpeed = 'fast';

    var pillAuto = $('.pill-automatic');
    var pillManual = $('.pill-manual');
    var paneAuto = $('.pane-automatic');
    var paneManual = $('.pane-manual');

    var updatePane = function() {
        if (pane == 0){
            paneAuto.slideDown(slideSpeed);
            paneManual.slideUp(slideSpeed);
            pillAuto.toggleClass('active', true);
            pillManual.toggleClass('active', false);
        } else {
            paneManual.slideDown(slideSpeed);
            paneAuto.slideUp(slideSpeed);
            pillManual.toggleClass('active', true);
            pillAuto.toggleClass('active', false);
        }
    };

    pillAuto.on('click', function(){
        pane = 0;
        updatePane();
    });

    pillManual.on('click', function(){
        pane = 1;
        updatePane();
    });

    $('.search-form').on('submit', function(e){
        e.preventDefault();
        $(".search-btn").toggleClass("fa-cog", true);
        $(".search-btn").toggleClass("fa-spin", true);
        $.get("//pokeapi.co/api/v2/pokemon/" + $(".search-name").val())
            .done(function(data){
                if(data.results){
                    $('.search-msg').text("Try being more specific.")
                }else{
                    pane = 1;
                    $("[name='name']").val(data.name);
                    $("[name='cardType']").val(data.types.map(function(x){return x.type.name}).join(", "));
                    pane = 1;
                    updatePane();
                }
            })
            .fail(function(){
                $(".search-msg").text("No results found. Try again?")
            })
            .always(function(){
                $(".search-btn").toggleClass("fa-cog", false);
                $(".search-btn").toggleClass("fa-spin", false);
            })
    })

});
