document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emissionForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        // Convert transport data from string to number if needed
        const transport = Number(formData.get('transport'));

        // Validate transport to ensure it's a number
        if (isNaN(transport)) {
            alert('Please enter a valid number for transportation distance.');
            return; // Stop the function if validation fails
        }

        // Prepare data object for the API request
        const climatiqData = {
            emission_factor: {
                activity_id: "passenger_vehicle-vehicle_type_average_car-fuel_source_gasoline-engine_size_segment_b", // Replace with the actual ID
                data_version: "^6" // Specify the data version
            },
            parameters: {
                distance: transport,
                distance_unit: "km" // Make sure unit matches Climatiq requirements
            }
        };

        // Example: Send data to your server-side endpoint
        console.log('Sending request to server with data:', climatiqData);
        fetch('/api/transport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transport: document.getElementById('transportAmount').value }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Submission failed:', error);
        });
        
    });   
});
