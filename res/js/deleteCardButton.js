$(document).ready(function(){
    $(".delete-card").click(function(e){
        if(e.preventDefault) {
            e.preventDefault();
        }
        
        var cardId = $(this).data('card-id');

        $(".modal-delete-button").off('click');
        $(".modal-delete-button").click(function(){
            $.post("/remove/" + cardId, function(data){
                console.dir(data);
                // $(document).emit('beforeunload');
                $(`[data-card-id=${cardId}]`).closest("tr").remove();
                $(".delete-modal").modal('hide');
            })
        });

        $(".delete-modal").modal();
    });
});
