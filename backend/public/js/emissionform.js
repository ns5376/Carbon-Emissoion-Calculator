document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('yourFormId');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Example: Send data to your server-side endpoint
        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success, update UI, etc.
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    });
});
