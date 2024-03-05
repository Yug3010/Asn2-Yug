// Define the isEqualZero helper function
function isEqualZero(reviews) {
    return reviews === "0";
}

// Define the customReviews helper function
function customReviews(reviews) {
    return reviews === "0" ? "N/A" : reviews;
}

// Test the helpers
console.log(isEqualZero("0")); // Expected output: true
console.log(isEqualZero("5")); // Expected output: false
console.log(customReviews("0")); // Expected output: "N/A"
console.log(customReviews("5")); // Expected output: "5"

// Export the helpers
module.exports = {
    isEqualZero,
    customReviews
};
