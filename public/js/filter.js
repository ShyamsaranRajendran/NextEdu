

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.lang = 'en-US'; // Set the language to English (United States)
        utterance.pitch = 1; // Set the pitch (0 to 2, default is 1)
        
        // Speak the provided text
        window.speechSynthesis.speak(utterance);
    } else {
        // Speech synthesis not supported, provide fallback or error handling
        console.error('Speech synthesis not supported by this browser.');
    }
}


document.addEventListener('DOMContentLoaded', function() {

    // Get all list items
    var listItems = document.querySelectorAll('.field-list li');

    // Add click event listener to each list item
    listItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Get the text content of the clicked item
            var fieldOfStudy = item.textContent.trim();
            // Send a POST request with the field of study
            sendPostRequest(fieldOfStudy);
        });
    });

    // Get the "Show more fields" button
    var showMoreButton = document.querySelector('.show-more');

    // Add click event listener to the "Show more fields" button
    showMoreButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        toggleExtraFields(); // Toggle visibility of extra fields
    });

    // Function to toggle visibility of the last five list items
    function toggleExtraFields() {
        var fieldList = document.querySelector('.field-list');
        var items = Array.from(fieldList.querySelectorAll('li')); // Convert NodeList to array
        var startIndex = Math.max(0, items.length - 5); // Start index of the last five items
        for (var i = startIndex; i < items.length; i++) {
            items[i].classList.toggle('hidden');
        }
    }

    // Get the list of items and buttons for pagination
    var list = document.querySelector('.list');
    var buttons = list.querySelectorAll('button');
    var items = list.querySelectorAll('a');

    var currentIndex = 0;
    var numItemsPerPage = 4; // Change this value to set the number of items per page

    // Show initial items
    showItems(currentIndex, numItemsPerPage);

    // Add click event listener to the right arrow button
    buttons[buttons.length - 1].addEventListener('click', function() {
        // Show next items
        moveItems(1);
    });

    // Add click event listener to the left arrow button
    buttons[buttons.length - 2].addEventListener('click', function() {
        // Show previous items
        moveItems(-1);
    });

    // Function to move items by given offset
    function moveItems(offset) {
        currentIndex += offset;
        currentIndex = Math.min(Math.max(currentIndex, 0), items.length - numItemsPerPage);
        showItems(currentIndex, numItemsPerPage);
    }

    // Function to show items from startIndex to endIndex
    function showItems(startIndex, numItems) {
        items.forEach(function(item, index) {
            if (index >= startIndex && index < startIndex + numItems) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Add click event listener to each item
    items.forEach(function(item) {
        item.addEventListener('click', function() {
            // Handle item click event
            console.log('Item clicked:', item.textContent);
            // You can add your logic here to handle item click events
        });
    });

});





