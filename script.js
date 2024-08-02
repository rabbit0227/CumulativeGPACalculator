document.addEventListener("DOMContentLoaded", () => {
  const courseTable = document.getElementById("courseTable");
  const addRowButton = document.getElementById("addRow");
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const gpaInput = document.getElementById("gpa");

  const grades = {
    A: 4.0,
    "B+": 3.5,
    B: 3.0,
    "C+": 2.5,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  const creditOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  function addRow(course = "", grade = "", credits = "") {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="border px-4 py-2"><input type="checkbox" class="form-checkbox" checked></td>
        <td class="border px-4 py-2"><input type="text" class="form-input w-full" value="${course}"></td>
        <td class="border px-4 py-2">
          <select class="form-select w-full grade-input">
            <option value="A" ${grade === "A" ? "selected" : ""}>A</option>
            <option value="B+" ${grade === "B+" ? "selected" : ""}>B+</option>
            <option value="B" ${grade === "B" ? "selected" : ""}>B</option>
            <option value="C+" ${grade === "C+" ? "selected" : ""}>C+</option>
            <option value="C" ${grade === "C" ? "selected" : ""}>C</option>
            <option value="D" ${grade === "D" ? "selected" : ""}>D</option>
            <option value="F" ${grade === "F" ? "selected" : ""}>F</option>
          </select>
        </td>
        <td class="border px-4 py-2">
          <select class="form-select w-full credits-input">
            ${creditOptions
              .map(
                (option) =>
                  `<option value="${option.value}" ${
                    parseFloat(credits) === option.value ? "selected" : ""
                  }>${option.label}</option>`
              )
              .join("")}
          </select>
        </td>
        <td class="border px-4 py-2"><button class="delete-row bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>
      `;
    courseTable.appendChild(row);

    // Add event listener to the delete button
    row.querySelector(".delete-row").addEventListener("click", () => {
      row.remove();
    });
  }

  function resetTable() {
    courseTable.innerHTML = "";
    gpaInput.value = "";
    for (let i = 0; i < 5; i++) {
      addRow();
    }
  }

  function calculateGPA() {
    const rows = courseTable.rows;
    let totalPoints = 0;
    let totalCredits = 0;
    let validInput = true;

    for (let row of rows) {
      const include = row.cells[0].children[0].checked;
      const grade = row.cells[2].children[0].value;
      const credits = parseFloat(
        row.cells[3].querySelector(".credits-input").value
      );

      if (!include) {
        continue;
      }

      if (!grades.hasOwnProperty(grade)) {
        validInput = false;
        break;
      }

      if (isNaN(credits) || ![0, 1, 2, 3, 4].includes(credits)) {
        validInput = false;
        break;
      }

      totalPoints += grades[grade] * credits;
      totalCredits += credits;
    }

    if (validInput && totalCredits !== 0) {
      const gpa = (totalPoints / totalCredits).toFixed(2);
      gpaInput.value = gpa;
    } else {
      gpaInput.value = ""; // Clear GPA if there are invalid inputs or no credits entered
    }
  }

  addRowButton.addEventListener("click", () => addRow());
  resetButton.addEventListener("click", resetTable);
  calculateButton.addEventListener("click", calculateGPA);

  resetTable();
});
