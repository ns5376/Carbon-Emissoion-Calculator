function submitEmissionData() {
    const activity = document.getElementById('activity').value;
    const amount = document.getElementById('amount').value;
    
    console.log(activity, amount);  // Check the values being sent

    fetch('/calculate-emissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activity: activity,
            amount: amount
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('results').innerHTML = 'Total Emissions: ' + data.carbon_kg + ' kg of CO2';
    })
    .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton'); // Ensure your button has this ID
    if (calculateButton) {
        calculateButton.addEventListener('click', submitEmissionData);
    }
});
