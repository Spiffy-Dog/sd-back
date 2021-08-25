const mongoose = require("mongoose");

const Schema = mongoose;

const verificationSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
  Verification,
};
