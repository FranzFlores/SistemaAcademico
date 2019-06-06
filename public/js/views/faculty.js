$(document).ready(function () {

    viewDetailsFaculty();
    editFaculty();
    deleteFaculty();
    
});

function viewDetailsFaculty(){
    $("#tableFaculty tbody tr .more").click(function(e){
        var row = $(this).parent().parent(); 
        var title = row.children("td:nth-child(1)").text();
        var description = row.children("td:nth-child(2)").text();
        $("#modal1 .title-faculty").text(title);
        $("#modal1 .description").text(description);
        $('.modal').modal();
        e.preventDefault();
    });
}

function editFaculty(){
    $(".edit").click(function (e) {
        var idFaculty = $(this).attr('data-id');
        var url =  "http://localhost:3000/faculty/"+idFaculty;
        console.log(url);
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $(".name").val(data.name);
                $(".description").val(data.description);
                $("#button").text("Editar");
                $("#button").attr('data-id',idFaculty);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });

    $("#button").click(function(e){
        var idFaculty = $(this).attr('data-id');
        if($(this).text()=="Editar"){
           $("#facultyForm").attr('action','/faculty/update/'+idFaculty);
        }
    });
}

function deleteFaculty(){
    $(".delete").click(function (e) {
        var idFaculty = $(this).attr('data-id');
        var url =  "http://localhost:3000/faculty/delete/"+idFaculty;
        $.ajax({
            type: 'POST',
            url: url, 
            success: function (data, textStatus, jqXHR) {
                if(data=="Yes"){
                    M.toast({html: 'No se puede eliminar la Facultad porque tiene carreras asociadas'});
                }else if(data=="OK"){
                    M.toast({html: 'Facultad Eliminada con éxito '});
                    window.location.href = "http://localhost:3000/faculty";
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });
}
