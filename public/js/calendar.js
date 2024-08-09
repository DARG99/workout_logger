const dropDownBarAnos = document.getElementById("yearSelect");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Sample workout dates for demonstration
const workoutDates = ["2024-07-28", "2024-06-02"];

// Convert workout dates to a Set for efficient lookup
const workoutDatesSet = new Set(workoutDates);

function populateDropDownAnos() {
  let option;
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    option = document.createElement("option");
    option.text = i;
    if (option.text == currentYear) {
      option.selected = true;
    }

    dropDownBarAnos.appendChild(option);
  }
}

function populateCalendar(year) {
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    let firstDayOfMonth = new Date(year, monthIndex, 1); //OBTER O PRIMEIRO DIA DO MES PARA OBTER A SEGUIR QUANDO E QUE ELE CALHA NA SEMANA
    let daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); //OBTER QUANTOS OS DIAS DE CADA MES TEM PARA ADICIONAR AO PRIMEIRO DIA
    let dayOfTheWeek = firstDayOfMonth.getDay(); //OBTER O DIA EM QUE CALHA O PRIMEIRO DIA DO MES

    let monthContainer = document.getElementById(monthIndex); //OBTER O CONTAINER DO RESPETIVO MES A USAR O INDEX
    let gridContainer = monthContainer.querySelector(".dates-container"); //OBTER O CONTAINER COM AS DATAS
    gridContainer.innerHTML = ""; //APAGAR TUDO PARA POPULAR CASO TENHA ALGUMA COISA

    for (let i = 0; i < dayOfTheWeek; i++) {
      let blankGridItem = document.createElement("div");
      blankGridItem.classList.add("grid-item", "blank");
      gridContainer.appendChild(blankGridItem);
    } //ADICIONAR ESPAÇOS SEM NADA PARA COMEÇAR A POPULAR NO DIA DE SEMANA CORRETO

    for (let i = 1; i <= daysInMonth; i++) {
      let gridItem = document.createElement("div");
      gridItem.textContent = i;

      // Check if the current date is in the workoutDatesSet
      let dateString = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      if (workoutDatesSet.has(dateString)) {
        gridItem.classList.add("workout-day");
      }

      gridContainer.appendChild(gridItem);
    } //POPULAR O MÊS
  }
}

yearSelect.addEventListener("change", function () {
  // Get the selected year from the dropdown menu
  let selectedYear = parseInt(yearSelect.value);

  // Call the function to populate the calendar with the selected year
  populateCalendar(selectedYear);
});

populateDropDownAnos();
populateCalendar(currentYear);

