var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function make() {
	// Define User model
	var TutorSchema = new Schema({
		name: String,
    	email: String,
   		course: { type: String, ref: 'Course' },
		created_at: Date,
		updated_at: Date
	});
	TutorSchema.pre('save', function(next){
		this.updated_at = new Date;
		if ( !this.created_at ) {
			this.created_at = new Date;
		}
		next();
	});
	return mongoose.model('Tutor', TutorSchema);
}

module.exports.make = make;