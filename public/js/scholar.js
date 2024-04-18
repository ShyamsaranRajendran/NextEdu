// Add event listeners to all elements with class "return-to-top"
document.querySelectorAll('.return-to-top').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default anchor behavior
      scrollToTop(); // Call the function to scroll to the top
    });
  });
  
  // Function to scroll the page back to the top
  function scrollToTop() {
    // Scroll smoothly to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }