var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function make() {
	// Define User model
	var MemberSchema = new Schema({
		erstie: { type: String, ref: 'Erstie' },
		group: { type: String, ref: 'Group' },
		created_at: Date,
		updated_at: Date
	});
	MemberSchema.pre('save', function(next){
		this.updated_at = new Date;
		if ( !this.created_at ) {
			this.created_at = new Date;
		}
		next();
	});
	return mongoose.model('Member', MemberSchema);
}

module.exports.make = make;