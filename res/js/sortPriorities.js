$(document).ready(function(){

    Sortable.create($(".sort-params")[0]);

    var slideSpeed = 50;

    var index = 0;
    
    var fieldNames = {
        'Name': 'name',
        'Quantity': 'quantity',
        'Card Type': 'cardType',
        'Actual Type': 'actualType',
        'Level': 'level',
        'Design': 'design',
        'Series': 'series',
        'Expansion': 'expansion'
    };

    function addSort(e){
        if(e){
            e.preventDefault();
        }

        var sortParams = $(".sort-params");

        var sorter = $("<div class='sorter'></div>");
        sorter.append($(".sorter-template").children().clone());

        index++;
        sorter.find("input").attr("name", "sort-dir-" + index);

        sorter.hide();
        sortParams.append(sorter);
        sorter.slideDown(slideSpeed);
    }

    $(".add-sort").click(addSort);
    addSort();
    
    $(document).on("click", ".delete-sorter", function(e){
        $(this).closest(".card").slideUp(slideSpeed, function(){
            $(this).remove();
        });
    });

    $(".query-form").on('submit', function(e){
        //Remove names from any empty elems so the search isn't clogged
        $("input").filter(function(){return $(this).val().trim() == ""; }).removeAttr('name');

        var sortInput = $(`<input hidden name="sort" type="text"></input>`);
        var sorts = [];
        $(".sort-params").children().each(function(){
            $(this).find("input").removeAttr("name");
            var dir = $(this).children().find(".sort-direction-radio:checked").val();
            var name = fieldNames[$(this).find("select").val()];
            sorts = sorts.concat([[dir, name]])
        });

        console.log(JSON.stringify(sorts));
        if(sorts.length >= 1) {
            $(this).append($(`<input hidden name="sortsJson" value=${JSON.stringify(sorts)}>`));
        }
    })
});
