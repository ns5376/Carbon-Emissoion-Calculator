// models/EmissionEntry.mjs
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define detailed schema for emission categories
const EmissionDetailSchema = new Schema({
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: true }
});

// Define main schema for each emission entry
const EmissionEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  date: { type: Date, default: Date.now },
  emissions: {
    transportation: EmissionDetailSchema,
    electricity: EmissionDetailSchema,
    waste: EmissionDetailSchema,
    water: EmissionDetailSchema
    // Additional categories can be added as needed
  },
  createdAt: { type: Date, default: Date.now }
});

const EmissionEntry = mongoose.model('EmissionEntry', EmissionEntrySchema);
export default EmissionEntry;