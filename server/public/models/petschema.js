var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetSchema = new Schema ({
  id: { type: String},
  animal: {type: String},
  name: {type: String},
  description: {type: String},
  photo: {type: String}
});

PetSchema.pre('save', function (next) {
 var truncated = this.description.substring(0,200);
 truncated+= ' ...';
 this.description = truncated;
 next();
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
