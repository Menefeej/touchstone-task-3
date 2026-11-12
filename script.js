// Twin Cities Animal Rescue Contact Page JavaScript

const interestDetails = {
    volunteer: {
        title: "Volunteer Opportunities",
        message: "Volunteers can help at adoption events, assist with pet care, transport supplies, and support community outreach."
    },
    foster: {
        title: "Foster a Pet",
        message: "Foster families provide temporary homes and help pets feel safe while they wait for permanent adoption."
    },
    adoption: {
        title: "Adoption Information",
        message: "Adoption inquiries help the rescue learn about your household and identify pets that may be a good match."
    }
};

function showInterestMessage() {
    const interestSelect = document.getElementById("interest-type");
    const interestMessage = document.getElementById("interest-message");
    const selectedInterest = interestSelect.value;

    if (interestDetails[selectedInterest]) {
        interestMessage.innerHTML =
            "<h3>" + interestDetails[selectedInterest].title + "</h3>" +
            "<p>" + interestDetails[selectedInterest].message + "</p>";
    } else {
        interestMessage.innerHTML = "";
    }
}

function showError(fieldId, message) {
    document.getElementById(fieldId + "-error").textContent = message;
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");

    errorMessages.forEach(function (errorMessage) {
        errorMessage.textContent = "";
    });
}

function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const interestType = document.getElementById("interest-type");
    const availability = document.getElementById("availability");
    const experience = document.getElementById("experience");
    const message = document.getElementById("message");
    let isValid = true;

    clearErrors();

    if (name.value.trim() === "") {
        showError("name", "Please enter your full name.");
        isValid = false;
    }

    if (email.value.trim() === "" || !email.validity.valid) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    if (interestType.value === "") {
        showError("interest-type", "Please select an interest type.");
        isValid = false;
    }

    if (availability.value === "") {
        showError("availability", "Please select your availability.");
        isValid = false;
    }

    if (experience.value.trim().length < 20) {
        showError("experience", "Please describe your pet experience using at least 20 characters.");
        isValid = false;
    }

    if (message.value.trim() === "") {
        showError("message", "Please enter a short message.");
        isValid = false;
    }

    return isValid;
}

function saveVisitorData() {
    const visitorData = {
        name: document.getElementById("name").value.trim(),
        interest: document.getElementById("interest-type").value
    };

    localStorage.setItem("tcarVisitor", JSON.stringify(visitorData));
}

function loadVisitorData() {
    const savedVisitor = localStorage.getItem("tcarVisitor");
    const welcomeMessage = document.getElementById("welcome-message");

    if (savedVisitor) {
        const visitorData = JSON.parse(savedVisitor);

        welcomeMessage.textContent =
            "Welcome back, " + visitorData.name +
            ". We remembered that you are interested in " +
            visitorData.interest + ".";
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formMessage = document.getElementById("form-message");

    if (validateForm()) {
        saveVisitorData();

        formMessage.textContent =
            "Thank you for your interest. Twin Cities Animal Rescue will review your information.";
        formMessage.className = "success-message";

        document.getElementById("interest-form").reset();
        document.getElementById("interest-message").innerHTML = "";

        loadVisitorData();
    } else {
        formMessage.textContent =
            "Please correct the highlighted form fields and try again.";
        formMessage.className = "error-message";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const interestSelect = document.getElementById("interest-type");
    const interestForm = document.getElementById("interest-form");

    if (interestSelect && interestForm) {
        interestSelect.addEventListener("change", showInterestMessage);
        interestForm.addEventListener("submit", handleFormSubmit);
        loadVisitorData();
    }
});