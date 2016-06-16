$(document).ready(function(){

    Sortable.create($(".sort-params")[0]);

    var slideSpeed = 50;

    $(".add-sort").click(function(e){
        e.preventDefault();
        var sortParams = $(".sort-params");

        var sorter = $("<div class='sorter'></div>");
        sorter.append($(".sorter-template").children().clone());

        sorter.hide();
        sortParams.append(sorter);
        sorter.slideDown(slideSpeed);
    });
    
    $(document).on("click", ".delete-sorter", function(e){
        $(this).closest(".card").slideUp(slideSpeed, function(){
            $(this).remove();
        });
    });

    $(".query-form").on('submit', function(e){
        e.preventDefault();
        var sortInput = $(`<input hidden name="sort" type="text"></input>`);
        var sorts = [];
        $(".sort-params").children().each(function(){
            console.log($(this).find(".sort-direction-radio:checked").val());
            console.log($(this).find("select").val());
        });

        console.dir(sorts);
    })
});