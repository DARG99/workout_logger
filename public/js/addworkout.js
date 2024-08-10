document.addEventListener("DOMContentLoaded", function () {
  const exerciseList = document.getElementById("exerciseList"); //lista no modal de exercicios
  const selectedExercisesList = document.getElementById("selectedExercises");

  exerciseList.addEventListener("click", function (event) {
    const clickedItem = event.target;
    console.log(clickedItem.classList);

    if (clickedItem.classList.contains("exercise-item")) {
      //selecionar a azul e obter os dados
      clickedItem.classList.toggle("selected");

      if (clickedItem.classList.contains("selected")) {
        const exerciseName = clickedItem.textContent;
        const exerciseID = clickedItem.getAttribute("exercise-id");
        const exerciseCategory = clickedItem.getAttribute("data-category");

        //criar o element li para adicionar na pagina original

        const selectedExercise = document.createElement("li");
        selectedExercise.classList.add("list-group-item", "text-center")
        selectedExercise.textContent = exerciseName;
        selectedExercise.setAttribute("exercise-id", exerciseID);
        selectedExercise.setAttribute("data-category", exerciseCategory);

        //contador
        const counterContainer = document.createElement("div");
        counterContainer.style.display = "inline-block";
        counterContainer.style.float = "right";
        counterContainer.className = "ml-3";

        // Create the minus button
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.type = "button";
        minusButton.classList.add("btn", "btn-primary");

        // Create the number span
        const numberSpan = document.createElement("span");
        numberSpan.textContent = "1"; 
        numberSpan.classList.add("counter-number", "mx-2");

        // Create the plus button
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.type = "button";
        plusButton.classList.add("btn", "btn-primary");


        //adicionar ao div
        counterContainer.appendChild(minusButton);
        counterContainer.appendChild(numberSpan);
        counterContainer.appendChild(plusButton);


        
        selectedExercise.appendChild(counterContainer);
        
       
        minusButton.addEventListener("touchstart", (e) => {
          e.preventDefault(); // Prevents default behavior on touch devices
          let currentValue = parseInt(numberSpan.textContent);
          if (currentValue > 1) {
              numberSpan.textContent = currentValue - 1;
          }
      }, { passive: false });
      
      plusButton.addEventListener("touchstart", (e) => {
          e.preventDefault(); // Prevents default behavior on touch devices
          let currentValue = parseInt(numberSpan.textContent);
          numberSpan.textContent = currentValue + 1;
      }, { passive: false });

        selectedExercisesList.appendChild(selectedExercise);
      } else {
        const exerciseID = clickedItem.getAttribute("exercise-id");
        const exerciseCategory = clickedItem.getAttribute("data-category");
        const selectedExercise = document.querySelector(
          `li[exercise-id="${exerciseID}"][data-category="${exerciseCategory}"]`
        );
        selectedExercisesList.removeChild(selectedExercise);
      }
    }
  });
});

function search() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("exerciseList");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
