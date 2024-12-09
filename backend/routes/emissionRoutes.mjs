import express from "express";
import axios from "axios";
import passport from 'passport';
import session from 'express-session';
import EmissionEntry from "../models/EmissionEntry.mjs";

const router = express.Router();
router.use(session({
    secret: '8f742231b10e8888abcd99yyyzzz85a5',
    resave: false,
    saveUninitialized: false,
  }));
  
router.post("/api/emission", passport.authenticate('session'), async (req, res) => {
  try {
    const { transportation, electricity, waste, water } = req.body; // Extract all categories from the request body

    // Prepare the payload for each category
    const emissions = {};

    // Helper function to call Climatiq API
    const calculateEmissions = async (activityId, parameters) => {
      const payload = {
        emission_factor: {
          activity_id: activityId,
          data_version: "^6",
        },
        parameters,
      };

      const response = await axios.post("https://api.climatiq.io/data/v1/estimate", payload, {
        headers: {
          Authorization: `Bearer J9Q88JK7G16P5DDA3GEJDZEYG4`, // Replace with your actual API key
          "Content-Type": "application/json",
        },
      });

      return response.data.co2e; // Return the calculated CO2 equivalent
    };

    // Process Transportation Emissions
    if (transportation?.amount && transportation?.unit) {
      emissions.transportation = {
        amount: await calculateEmissions(
          "passenger_vehicle-vehicle_type_car-fuel_source_E85-distance_short-engine_size_na",
          {
            distance: transportation.amount,
            distance_unit: transportation.unit,
          }
        ),
        unit: "kg of CO2",
        description: "Transportation emissions",
      };
    }

    // Process Electricity Emissions
    if (electricity?.amount && electricity?.unit) {
      emissions.electricity = {
        amount: await calculateEmissions(
          "electricity-supply_grid-source_residual_mix",
          {
            energy: electricity.amount,
            energy_unit: electricity.unit,
          }
        ),
        unit: "kg of CO2",
        description: "Electricity emissions",
      };
    }

    // Process Waste Emissions
    if (waste?.amount && waste?.unit) {
      emissions.waste = {
        amount: await calculateEmissions(
          "waste-type_aggregates-disposal_method_closed_loop",
          {
            weight: waste.amount,
            weight_unit: waste.unit,
          }
        ),
        unit: "kg of CO2",
        description: "Waste emissions",
      };
    }

    // Process Water Emissions
    if (water?.amount && water?.unit) {
      emissions.water = {
        amount: await calculateEmissions(
          "water_supply-type_na",
          {
            volume: water.amount,
            volume_unit: water.unit,
          }
        ),
        unit: "kg of CO2",
        description: "Water emissions",
      };
    }
    // Save the entry or update the existing one
    const today = new Date().toISOString().split("T")[0];
    await EmissionEntry.updateOne(
      { userId: req.user._id, date: today },
      { $set: { emissions } },
      { upsert: true }
    );
    // Send all calculated emissions back to the frontend
    res.status(200).json({ success: true, redirect: "/dashboard" });
} catch (error) {
  console.error("Error processing emissions:", error);
  res.status(500).json({ success: false, message: "Failed to process emissions." });
}
});

export default router;
