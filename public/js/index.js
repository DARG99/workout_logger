document.addEventListener('DOMContentLoaded', function() {
    // Ensure the script runs after the DOM is fully loaded
  
    // Function to filter exercises
    function filterExercises() {
      var filter = document.getElementById('searchExercise').value.toLowerCase();
      var exercises = document.querySelectorAll('.exercise-item');
      
      exercises.forEach(function(exercise) {
        var text = exercise.textContent.toLowerCase();
        exercise.style.display = text.includes(filter) ? '' : 'none';
      });
    }
  
    // Add event listener to the search input
    document.getElementById('searchExercise').addEventListener('keyup', filterExercises);
  });
  