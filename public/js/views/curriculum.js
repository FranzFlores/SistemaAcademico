$(document).ready(function () {
    loadCarrers();
    editCurriculum();
    deleteCurriculum();
});

function loadCarrers() {
    var url = "http://localhost:3000/career/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.name + "</option>";
            });
            $("#careers").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function editCurriculum() {
    $('.edit').click(function (e) {
        var idCurriculum = $(this).attr('data-id');
        var url = "http://localhost:3000/curriculum/" + idCurriculum;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#year").val(data.year);
                $("#careers").prop('disabled',"disabled");
                $('#numCycles').prop('disabled',"disabled");
                $('select').formSelect();
                $("#button").text("Editar");
                $("#button").attr('data-id', idCurriculum);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    })

    $("#button").click(function (e) {
        var idCurriculum = $(this).attr('data-id');
        if ($(this).text() == "Editar") {
            $("#curriculumForm").attr('action', '/curriculum/update/' + idCurriculum);
        }
    });
}

function deleteCurriculum() {
    $(".delete").click(function (e) {
        var idCurriculum = $(this).attr('data-id');
        var url = "http://localhost:3000/curriculum/delete/" + idCurriculum;
        $.ajax({
            type: 'POST',
            url: url,
            success: function (data, textStatus, jqXHR) {
                if (data == "Yes") {
                    M.toast({ html: 'No se puede eliminar la Malla Curricular porque tiene elementos Asociadas' });
                } else if (data == "OK") {
                    M.toast({ html: 'Facultad Eliminada con éxito ' });
                    window.location.href = "http://localhost:3000/curriculum";
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });
}


