document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emissionForm");
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      // Collect form data
      const formData = new FormData(form);
      const fields = ["transportation", "electricity", "waste", "water"];
      const payload = {};
  
      // Loop through fields and validate inputs
      for (const field of fields) {
        const amount = formData.get(`${field}Amount`);
        const unit = formData.get(`${field}Unit`);
  
        if (amount && unit) {
          payload[field] = {
            amount: parseFloat(amount),
            unit,
          };
        }
      }
  
      try {
        // Send data to the backend
        const response = await fetch("/api/emission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch emission data: ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Emission Data:", data);
  
        // Display the result
        if (data.redirect) {
            // Redirect to dashboard
            window.location.href = data.redirect;
          } else {
            alert("Emission data saved successfully!");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error.message);
        }
    });
  });
  