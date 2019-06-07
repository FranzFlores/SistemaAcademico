$(document).ready(function () {

    $('.datepicker').datepicker({ format: 'yyyy/mm/dd', maxDate: new Date() });
    
    loadCurriculums();
    loadSubjectTeacherModal();
    loadSubjectsToModal();
    loadTeacherSubjects();
    

});

function loadSubjectTeacherModal() {
    $("#teacherTable tbody tr .plus").click(function (e) {
        $('.modal').modal();
        $('.ok').hide();
        e.preventDefault();
    });
}

function loadSubjectsToModal() {
    var subjects = [];
    var teacher = "";

    $(".plus").click(function (e) {
        teacher = $(this).attr('data-id');
    });

    var url = "http://localhost:3000/subject-period/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {

            var html = "";
            $.each(data, function (i, item) {
                html += "<li class='collection-item valign-wrapper'>" + item.subject.name + "<br>Carrera: " + item.subject.curriculum_cycle.curriculum.career.name + "<br>Periodo: " + item.period.name;
                html += "<button class='light-blue btn add right-align' data-external=" + item.subject._id + " data-add='true'>Agregar</button></li>";
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
                    url: "http://localhost:3000/subject-teacher/create",
                    data: {
                        subjects: subjects,
                        teacher: teacher
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data == 'ok') {
                            M.toast({ html: 'Se subio con exito la información' });
                        } else if (data == 'ingresado') {
                            M.toast({ html: 'La materia que escogió ya esta asignadas al docente' });
                        } else {
                            M.toast({ html: 'La materias que escogió ya estan asignadas al docente' });
                        }
                        $('.ok').show();
                        $('.cancel').hide();
                        $('#save').hide();
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        M.toast({ html: 'Ocurrio un error' });
                    }
                });
            });

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}


function loadCurriculums() {
    var url = "http://localhost:3000/curriculum/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {

            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.career.name + " - Malla Curricular " + item.year + "</option>";
            });
            $("#curriculums").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function loadTeacherSubjects() {
    var url = "http://localhost:3000/subject-teacher/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var html = "";
            $.each(data, function (i, item) {
                html += '<tr><td>' + item.teacher.person.name + '</td>';
                html += `<td><ul>
                            <li>`+ item.subject.name + `<br>Carrera: ` + item.subject.curriculum_cycle.curriculum.career.name + `</li>
                        </ul></td>
                        <td>
                            <a class="delete" data-id=` + item.subject._id + `><i class="material-icons btn">delete</i></a>
                        </td></tr>`;
            });
            $("#teacherSubject tbody").html(html);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


