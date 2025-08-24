// Initialize EmailJS
(function () {
    emailjs.init("3HwbgHWn2kLSh9mml");
})();

// Cart variables
let cart = [];
let total = 0;

// Add service to cart
function addService(name, price) {
    cart.push({ name: name, price: price });
    total += price;
    updateCart();
}

// Remove service from cart
function removeService(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    const addedItemsDiv = document.getElementById("added-items");
    const totalSpan = document.getElementById("total");

    if (cart.length === 0) {
        addedItemsDiv.innerHTML = "<p>No items added yet</p>";
    } else {
        addedItemsDiv.innerHTML = "";
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            let itemDiv = document.createElement("div");
            itemDiv.innerHTML = `
          <p>${item.name} - ₹${item.price}</p>
          <button onclick="removeService(${i})">Remove</button>
        `;
            addedItemsDiv.appendChild(itemDiv);
        }
    }

    totalSpan.textContent = total;
}

// Booking form submission
document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    let servicesList = "";
    for (let i = 0; i < cart.length; i++) {
        servicesList += cart[i].name + " - ₹" + cart[i].price + "\n";
    }

    let templateParams = {
        full_name: fullName,
        email: email,
        phone: phone,
        services: servicesList,
        total_amount: total,
        date: new Date().toLocaleDateString()
    };

    // Send Email
    emailjs.send("service_il33iw3", "template_6lhe1cl", templateParams)
        .then(function (response) {
            alert("Booking confirmed! We have received your request.");
            document.getElementById("booking-form").reset();
            cart = [];
            total = 0;
            updateCart();
        })
        .catch(function (error) {
            alert("Error sending email: " + error.text);
        });
});

// Newsletter form submission
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
});

// Scroll to services
function scrollToServices() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}