var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function make() {
	// Define User model
	var ErstieSchema = new Schema({
    firstname: String,
		name: String,
    phone: String,
    email: String,
    mtrnr: Number,
		birthday: Date,
    gender: String,
		course: { type: String, ref: 'Course' },
		created_at: Date,
		updated_at: Date
	});
	ErstieSchema.pre('save', function(next){
		this.updated_at = new Date;
		if ( !this.created_at ) {
			this.created_at = new Date;
		}
		next();
	});
	return mongoose.model('Erstie', ErstieSchema);
}

module.exports.make = make;