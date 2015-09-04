var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function make() {
	// Define User model
	var CourseSchema = new Schema({
		_id: String,
		name: String,
		created_at: Date,
		updated_at: Date
	});
	CourseSchema.pre('save', function(next){
		this.updated_at = new Date;
		if ( !this.created_at ) {
			this.created_at = new Date;
		}
		next();
	});
	return mongoose.model('Course', CourseSchema);
}

module.exports.make = make;