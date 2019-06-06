$(document).ready(function () {
    loadFaculties();
    editCareer();
    deleteCarrer();
});

function loadFaculties() {
    var url = "http://localhost:3000/faculty/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.name + "</option>";
            });
            $("#faculties").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function editCareer(){
    $(".edit").click(function (e) {
        var idCareer = $(this).attr('data-id');
        var url = "http://localhost:3000/career/" + idCareer;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#name").val(data.name);
                $("#description").val(data.description);
                $("#diploma").val(data.diploma);
                $("#button").text("Editar");
                $("#button").attr('data-id', idCareer);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });

    $("#button").click(function (e) {
        var idCareer = $(this).attr('data-id');
        if ($(this).text() == "Editar") {
            $("#careerForm").attr('action', '/career/update/' + idCareer);
        }
    });
}

function deleteCarrer(){
    $(".delete").click(function (e) {
        var idCareer = $(this).attr('data-id');
        var url =  "http://localhost:3000/career/delete/"+idCareer;
        $.ajax({
            type: 'POST',
            url: url, 
            success: function (data, textStatus, jqXHR) {
                if(data=="Yes"){
                    M.toast({html: 'No se puede eliminar la Carrera porque tiene Mallas Curriculares Asociadas'});
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
