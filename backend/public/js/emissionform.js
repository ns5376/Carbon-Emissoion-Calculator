document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emissionForm");
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      // Collect form data
      const formData = new FormData(form);
      const transportationAmount = formData.get("transportationAmount");
      const transportationUnit = formData.get("transportationUnit");
      const electricityAmount = formData.get("electricityAmount");
      const electricityUnit = formData.get("electricityUnit");
      const wasteAmount = formData.get("wasteAmount");
      const wasteUnit = formData.get("wasteUnit");
      const waterAmount = formData.get("waterAmount");
      const waterUnit = formData.get("waterUnit");
  
      try {
        // Prepare the payload for the backend
        const payload = {
          transportation: {
            amount: parseFloat(transportationAmount),
            unit: transportationUnit,
          },
          electricity: {
            amount: parseFloat(electricityAmount),
            unit: electricityUnit,
          },
          waste: {
            amount: parseFloat(wasteAmount),
            unit: wasteUnit,
          },
          water: {
            amount: parseFloat(waterAmount),
            unit: waterUnit,
          },
        };
  
        // Send data to the backend
        const response = await fetch("/api/emission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch emission data.");
        }
  
        const data = await response.json();
        console.log("Emission Data:", data);
  
        // Display the result
        const resultDiv = document.getElementById("result");
        resultDiv.textContent = `
          Transportation Emission: ${data.transportation?.amount || "N/A"} ${data.transportation?.unit || ""}
          Electricity Emission: ${data.electricity?.amount || "N/A"} ${data.electricity?.unit || ""}
          Waste Emission: ${data.waste?.amount || "N/A"} ${data.waste?.unit || ""}
          Water Emission: ${data.water?.amount || "N/A"} ${data.water?.unit || ""}
        `;
        resultDiv.classList.remove("hidden");
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    });
  });
  