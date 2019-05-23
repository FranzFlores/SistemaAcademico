$(document).ready(function () {
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

    $(".delete").click(function (e) {
        var idFaculty = $(this).attr('data-id');
        var url =  "http://localhost:3000/faculty/delete/"+idFaculty;
        $.ajax({
            type: 'POST',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });


    
});
