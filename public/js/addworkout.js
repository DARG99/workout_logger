

document.addEventListener("DOMContentLoaded", function () {
    const exerciseList = document.getElementById("exerciseList"); //lista no modal de exercicios
    const selectedExercisesContainer = document.getElementById(
      "selectedExercises"
    );
  
    exerciseList.addEventListener("click", function (event) {
      console.log("clicked");
      const clickedItem = event.target;
  
      clickedItem.classList.toggle("selected");
  
    
    });
  });
  
  
  
  function search(){
      let input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById("exerciseList");
      li = ul.getElementsByTagName('li');
  
      for(i= 0; i < li.length; i++){
         txtValue = li[i].textContent || li[i].innerText;
         if(txtValue.toUpperCase().indexOf(filter) > -1){
             li[i].style.display = "";
         }else{
             li[i].style.display = "none";
         }
      }
         
  
  
  
  }
  