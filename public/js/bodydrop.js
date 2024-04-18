console.log("Script file loaded!");

function changePlaceholder(inputId, placeholderText) {
    document.getElementById(inputId).placeholder = placeholderText;
}

document.addEventListener("DOMContentLoaded", function() {
    const studyInput = document.getElementById("studyInput");
    const placeInput = document.getElementById("placeInput");
    const studyDropdownContent = document.getElementById("studyDropdownContent");
    const placeDropdownContent = document.getElementById("placeDropdownContent");

    // Function to filter dropdown options based on user input
    function filterOptions(input, dropdownContent) {
        const filterValue = input.value.toUpperCase();
        const options = dropdownContent.querySelectorAll("a");
        options.forEach(function(option) {
            const optionText = option.textContent.toUpperCase();
            if (optionText.indexOf(filterValue) > -1) {
                option.style.display = "";
            } else {
                option.style.display = "none";
            }
        });
    }

    // Event listener for study input
    studyInput.addEventListener("input", function() {
        studyDropdownContent.style.display = "block";
        filterOptions(studyInput, studyDropdownContent);
    });

    // Event listener for place input
    placeInput.addEventListener("input", function() {
        placeDropdownContent.style.display = "block";
        filterOptions(placeInput, placeDropdownContent);
    });

    // Event listener for search button
    document.getElementById("searchButton").addEventListener("click", function() {
        // Your search functionality here
        console.log("Searching...");
    });

    // Event listener to hide dropdowns when clicking outside
    document.addEventListener("click", function(event) {
        if (!event.target.closest('.custom-dropdown')) {
            studyDropdownContent.style.display = "none";
            placeDropdownContent.style.display = "none";
        }
    });

    // Prevent hiding dropdown when clicking inside the inputs
    studyInput.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    placeInput.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});