var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function make() {
	// Define User model
	var GroupSchema = new Schema({
		name: String,
    	tutors: [{ type: String, ref: 'Tutor' }],
		created_at: Date,
		updated_at: Date
	});
	GroupSchema.pre('save', function(next){
		this.updated_at = new Date;
		if ( !this.created_at ) {
			this.created_at = new Date;
		}
		next();
	});
	return mongoose.model('Group', GroupSchema);
}

module.exports.make = make;