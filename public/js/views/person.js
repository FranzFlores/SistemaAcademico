$(document).ready(function () {
    var subjects = [];
    var teacher = "";

    $(".plus").click(function (e) {
        teacher = $(this).attr('data-id');
    });
    var url = "http://localhost:3000/subject/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<li class='collection-item valign-wrapper'>"+item.name + "<button class='light-blue btn add right-align' data-external=" +item._id +" data-add='true'>Agregar</button></li>";
            });
            $("#subjects").html(html);
            $(".add").click(function (e) {
                var external = $(this).attr('data-external');
                if ($(this).attr('data-add') == 'true') {
                    $(this).removeClass('btn light-blue').addClass('btn red');
                    $(this).text('Cancelar');
                    $(this).attr('data-add', 'false');
                    subjects.push(external);
                    
                } else {
                    $(this).removeClass('btn red').addClass('btn light-blue');
                    $(this).text('Agregar');
                    $(this).attr('data-add', 'true');
                    subjects.pop();
                }
                console.log(subjects);
                e.preventDefault();
            });
           
            $("#save").click(function () {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/person/addSubjectTeacher",
                    data: {
                        subjects: subjects,
                        teacher:teacher
                    },
                    success: function (data, textStatus, jqXHR) {
                        console.log("Se ha enviado correctamete");
                        //location.reload();
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });
        
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    loadCarrers();
    loadSubjects();

    $("#teacherTable tbody tr .plus").click(function(e){
        $('.modal').modal();
        e.preventDefault();
    });


    
});






function loadSubjects(){
  
}

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