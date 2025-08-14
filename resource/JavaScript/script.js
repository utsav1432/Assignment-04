// Initialize EmailJS
(function () {
    emailjs.init("3HwbgHWn2kLSh9mml"); // PUBLIC KEY from EmailJS dashboard
})();

// Cart functionality
let cart = [];
let total = 0;

function addService(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function removeService(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const addedItemsDiv = document.getElementById('added-items');
    const totalSpan = document.getElementById('total');

    if (cart.length === 0) {
        addedItemsDiv.innerHTML = '<p>No items added yet</p>';
    } else {
        addedItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <p style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    ${item.name} - ₹${item.price}
                </p>
                <button onclick="removeService(${index})" class="btn" style="padding: 0.5rem; margin-top:0.5rem;">Remove</button>
            `;
            addedItemsDiv.appendChild(itemDiv);
        });
    }

    totalSpan.textContent = total;
}

// Booking form submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Format services list
    const servicesList = cart.map(item =>
        `${item.name} - ₹${item.price}`
    ).join('\n');

    const templateParams = {
        full_name: fullName,
        email: email,
        phone: phone,
        services: servicesList,
        total_amount: total,
        date: new Date().toLocaleDateString()
    };

    emailjs.send(
        'service_il33iw3',     // Your EmailJS Service ID
        'template_6lhe1cl',    // Your EmailJS Template ID
        templateParams
    ).then(function (response) {
        console.log('Email sent!', response);
        alert('Booking confirmed! We have received your request.');

        // Reset form
        document.getElementById('booking-form').reset();
        cart = [];
        total = 0;
        updateCart();
    }).catch(function (error) {
        console.error('Email failed:', error);
        alert(`Error: ${error.text || 'Failed to send booking'}`);
    });
});

// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Scroll to services function
function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}