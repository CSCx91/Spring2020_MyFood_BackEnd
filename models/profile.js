import { Mongoose } from "mongoose";

var profileSchema = new Mongoose.schema({familyID: [String]});
var profile = Mongoose.model('profile', profileSchema);
