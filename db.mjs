// db.mjs
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define EmissionDetailSchema
const EmissionDetailSchema = new Schema({
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: true }
});

// Define EmissionEntrySchema
const EmissionEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  emissions: {
    transportation: EmissionDetailSchema,
    electricity: EmissionDetailSchema,
    waste: EmissionDetailSchema,
    water: EmissionDetailSchema
  },
  createdAt: { type: Date, default: Date.now }
});

// Define UserSchema
const UserSchema = new Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  email: { type: String, required: true },
  emissionEntries: [{ type: Schema.Types.ObjectId, ref: 'EmissionEntry' }]
});

// Export the models
export const User = mongoose.model('User', UserSchema);
export const EmissionEntry = mongoose.model('EmissionEntry', EmissionEntrySchema);
