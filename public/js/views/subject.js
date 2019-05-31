$(document).ready(function () {
    loadCurriculums();
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