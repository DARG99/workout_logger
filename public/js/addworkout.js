document.addEventListener("DOMContentLoaded", function () {
  const exerciseList = document.getElementById("exerciseList"); // Exercise list in the modal
  const selectedExercisesList = document.getElementById("selectedExercises");
  const selectedExercisesContainer = document.querySelector(".form-group");

  exerciseList.addEventListener("click", function (event) {
      const clickedItem = event.target;

      if (clickedItem.classList.contains("exercise-item")) {
          clickedItem.classList.toggle("selected");

          const exerciseName = clickedItem.textContent;
          const exerciseID = clickedItem.getAttribute("exercise-id");
          const exerciseCategory = clickedItem.getAttribute("data-category");

          if (clickedItem.classList.contains("selected")) {
              const selectedExercise = document.createElement("li");
              selectedExercise.classList.add("list-group-item", "text-center");
              selectedExercise.textContent = exerciseName;
              selectedExercise.setAttribute("exercise-id", exerciseID);
              selectedExercise.setAttribute("data-category", exerciseCategory);

              const counterContainer = document.createElement("div");
              counterContainer.style.display = "inline-block";
              counterContainer.style.float = "right";
              counterContainer.className = "ml-3";

              const minusButton = document.createElement("button");
              minusButton.textContent = "-";
              minusButton.type = "button";
              minusButton.classList.add("btn", "btn-primary");

              const numberSpan = document.createElement("span");
              numberSpan.textContent = "1";
              numberSpan.classList.add("counter-number", "mx-2");

              const plusButton = document.createElement("button");
              plusButton.textContent = "+";
              plusButton.type = "button";
              plusButton.classList.add("btn", "btn-primary");

              counterContainer.appendChild(minusButton);
              counterContainer.appendChild(numberSpan);
              counterContainer.appendChild(plusButton);

              selectedExercise.appendChild(counterContainer);

              const hiddenInput = document.createElement("input");
              hiddenInput.type = "hidden";
              hiddenInput.name = "exercises[]";
              hiddenInput.value = JSON.stringify({
                  id: exerciseID,
                  name: exerciseName,
                  category: exerciseCategory,
                  sets: parseInt(numberSpan.textContent)
              });
              hiddenInput.id = `exercise-${exerciseID}`;
              
              // Append to the form-group container or selectedExercisesList
              selectedExercisesList.appendChild(selectedExercise);
              selectedExercisesContainer.appendChild(hiddenInput);

              minusButton.addEventListener("click", (e) => {
                  e.preventDefault(); // Prevents default behavior
                  let currentValue = parseInt(numberSpan.textContent);
                  if (currentValue > 1) {
                      numberSpan.textContent = currentValue - 1;
                      updateHiddenInput(exerciseID, numberSpan.textContent);
                  }
              });

              plusButton.addEventListener("click", (e) => {
                  e.preventDefault(); // Prevents default behavior
                  let currentValue = parseInt(numberSpan.textContent);
                  numberSpan.textContent = currentValue + 1;
                  updateHiddenInput(exerciseID, numberSpan.textContent);
              });
          } else {
              const selectedExercise = document.querySelector(
                  `li[exercise-id="${exerciseID}"][data-category="${exerciseCategory}"]`
              );
              selectedExercisesList.removeChild(selectedExercise);

              // Remove the corresponding hidden input
              const inputToRemove = document.getElementById(`exercise-${exerciseID}`);
              if (inputToRemove) {
                  inputToRemove.remove();
              }
          }
      }
  });

  function updateHiddenInput(exerciseID, quantity) {
      const inputToUpdate = document.getElementById(`exercise-${exerciseID}`);
      const exerciseData = JSON.parse(inputToUpdate.value);
      exerciseData.sets = parseInt(quantity);
      inputToUpdate.value = JSON.stringify(exerciseData);
  }
});
