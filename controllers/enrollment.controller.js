'use strict'

var Enrollment = require('../models/enrollment.model');
var CurriculumCycle = require('../models/curriculum_cycle.model');
var SubjectPeriod = require('../models/subject_period.model');
var Subject = require('../models/subject.model');
var Student = require('../models/student.model');
var Person = require('../models/person.model');
var EnrollmentController = {};

EnrollmentController.load_enrollement_view = (req, res) => {

    Person.findById(req.params.id, (err, person) => {
        if (err) console.log(err);
        else {
            Student.findOne({ person: person._id }).populate({ path: 'curriculum', select: '_id' }).exec((err, student) => {
                if (err) console.log(err);
                else {
                    CurriculumCycle.find({ curriculum: student.curriculum._id }).populate({path:'curriculum', select:'_id',populate:{path:'career',select:'name'}}).populate({ path: 'cycle',select:'name'}).populate({path:'subjects',select:'name'}).exec((err, curriculum_cycles) => {
                        if (err) console.log(err);
                        else 
                        res.render('studentProfile/enrollment', { title: 'Matrícula', cycles:curriculum_cycles });
                    });
                }
            });
            // var subjects = [];
            // Person.findById(req.params.id, (err, person) => {
            //     if (err) console.log(err);
            //     else {
            //         Student.findOne({ person: person._id }).populate({ path: 'curriculum', select: '_id',populate:{path:'career',select:'name'} }).exec((err, student) => {
            //             if (err) console.log(err);
            //             else {
            //                 SubjectPeriod.find().populate({ path: 'subject', populate: { path: 'curriculum_cycle', populate: { path: 'curriculum', select: '_id',populate:{path:'career',select:'name'} } } }).populate('period').exec((err, subject_period) => {
            //                     if (err) console.log(err);
            //                     else {

            //                         subject_period.forEach(element => {
            //                             if (student.curriculum.career.name == element.subject.curriculum_cycle.curriculum.career.name) {
            //                                 var obj = {};
            //                                 obj.subject = element.subject;
            //                                 obj.period = element.period;
            //                                 subjects.push(obj);
            //                                 console.log();

            //                                 if (subject_period[subject_period.length - 1].subject.name == element.subject.name) {  
            //                                     res.render('studentProfile/enrollment', { title: 'Matrícula', subjects: subjects,numPeriod:subject_period[0].subject.curriculum.numPeriod });
            //                                 }
            //                             }
            //                         });
            //                     }
            //                 });
            //             }
            //         });
        }
    });
};


EnrollmentController.save_class = (req, res) => {
    new Enrollment({
        name: req.body.name,
        description: req.body.description
    }).save((err, newEnrollment) => {
        if (err) res.status(500).send("error");
        else {
            if (!newEnrollment) res.status(404).send("no se ha guardado");
            else res.status(200).send(newEnrollment);
        }
    });
}

EnrollmentController.get_Class = (req, res) => {
    var EnrollmentId = req.params.id;
    Enrollment.findById(EnrollmentId, (err, Class) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!Enrollment) res.status(404).send('la unidad no existe');
            else res.status(200).send(Enrollment);
        }
    });
}

EnrollmentController.update_Enrollment = (req, res) => {
    var EnrollmentId = req.params.id;
    var update = {
        name: req.body.name,
        description: req.body.description
    };

    Enrollment.findByIdAndUpdate(EnrollmentId, update, (err, EnrollmentUpdated) => {
        if (err) res.status(500).send('error al guardar clase');
        else {
            if (!EnrollmentUpdated) res.status(404).send('no se ha actualizado');
            else res.status(200).send(EnrollmentUpdated);
        }
    });
}

EnrollmentController.delete_Class = (req, res) => {
    var EnrollmentId = req.params.id;

    Enrollment.findByIdAndUpdate(EnrollmentId, { status: false }, (err, EnrollmentRemoved) => {
        if (err) res.status(500).send('error en la petición');
        else {
            if (!EnrollmentRemoved) res.status(404).send('error al eliminar');
            else res.status(200).send('Se ha eliminado');
        }
    });
}

EnrollmentController.all_Enrollment = (req, res) => {
    var Enrollment = Enrollment.find({ status: true });
    Enrollment.sort('name').exec((err, Enrollment) => {
        if (err) res.status(500).send("Error");
        else {
            if (!Enrollment) res.status(404).send("error al listar");
            else res.status(200).send(Enrollment);
        }
    });
}


module.exports = EnrollmentController;
