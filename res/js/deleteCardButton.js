$(document).ready(function(){
    $(".delete-card").click(function(e){
        if(e.preventDefault) {
            e.preventDefault();
        }
        
        var cardId = $(this).data('card-id');
        
        BootstrapDialog.show({
            title:"<h4><b>Confirm Delete Card</b></h4>",
            message:"Do you really want to delete this card? Deleted cards can't be recovered.",
            type:BootstrapDialog.TYPE_DANGER,
            size:BootstrapDialog.SIZE_LARGE,
            buttons:[
                {
                    label: "  Delete",
                    cssClass:"btn-danger",
                    icon:"glyphicon glyphicon-trash",
                    autoSpin:true,
                    action:function(dialog){
                        $.post("/remove/" + cardId, function(data){
                            console.dir(data);
                            dialog.close();
                            window.location.href = '/';
                        })
                    }
                },
                {
                    label:"Cancel",
                    action:function(dialog){
                        dialog.close();
                    }
                }
            ]
        })
    });
});
