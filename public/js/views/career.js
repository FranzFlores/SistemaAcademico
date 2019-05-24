$(document).ready(function () {

    loadFaculties();

    $(".edit").click(function (e) {
        var idCareer = $(this).attr('data-id');
        var url = "http://localhost:3000/career/" + idCareer;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#name").val(data.name);
               // $(".select-dropdown").val("select-options-"+data.faculty);
                $("#description").val(data.description);
                $("#diploma").val(data.diploma);
                $("#numPeriod").val(data.numPeriod);
                $("#timePeriod").val(data.timePeriod);
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

    $(".delete").click(function (e) {
        var idCareer = $(this).attr('data-id');
        var url =  "http://localhost:3000/career/delete/"+idCareer;
        $.ajax({
            type: 'POST',
            url: url, 
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                window.location.href = "http://localhost:3000/career";
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });



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