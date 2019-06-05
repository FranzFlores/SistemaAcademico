$(document).ready(function () {

    //Editar Materia
    $(".edit").click(function (e) {
        var idSubject = $(this).attr('data-id');
        var url =  "http://localhost:3000/subject/"+idSubject;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#name").val(data.name);
                $("#numCredit").val(data.numCredit);
                $("#button").text("Editar");
                $("#button").attr('data-id',idSubject);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });

    $("#button").click(function(e){
        var idSubject = $(this).attr('data-id');
        if($(this).text()=="Editar"){
           $("#subjectForm").attr('action','/subject/update/'+idSubject);
        }
    });


    loadCurriculums();
    loadCycles();
    //Para la vista de Docente
    $('.collapsible').collapsible();
});


function loadCurriculums() {
    var url = "http://localhost:3000/curriculum/all";
    $.ajax({ 
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {    
            console.log(data);       
            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.year + "-"+ item.career.name+  "</option>";
            }); 
            $("#curriculums").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function loadPeriodSubject(){
    var url = "http://localhost:3000/subject-period/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            var html = "";
            $.each(data, function (i, item) {
                html += '<tr><td>' + item.teacher.person.name + '</td>';
                html += `<td>
                <ul>
                    <li>`+ item.subject.name + `<br>Carrera: ` + item.subject.curriculum.career.name + `<a class="delete" data-id=`+item.subject._id+`>
                    <i class="material-icons btn">delete</i>
                    </a>
                    </li>
                </ul>
                </td></tr>`;
            });
            $("#teacherSubject tbody").html(html);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function loadCycles(){
    var url = "http://localhost:3000/cycle/all";
    $.ajax({ 
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {     
            var html = "";
            $.each(data, function (i, item) {
                    html += "<option value='" + item._id + "'>" + item.name + "</option>";
            });
            $("#cycles").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}