document.getElementById("addRow").addEventListener("click", () => {
  const table = document.getElementById("courseTable");
  const row = table.insertRow();
  row.innerHTML = `
        <td class="border px-4 py-2"><input type="checkbox" checked class="form-checkbox"></td>
        <td class="border px-4 py-2"><input type="text" class="form-input w-full"></td>
        <td class="border px-4 py-2"><input type="number" class="form-input w-full"></td>
    `;
});

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("courseTable").innerHTML = "";
  document.getElementById("gpa").value = "";
});

document.getElementById("calculate").addEventListener("click", () => {
  const rows = document.getElementById("courseTable").rows;
  let totalPoints = 0;
  let totalCredits = 0;

  for (let row of rows) {
    const cells = row.cells;
    if (cells[0].children[0].checked) {
      const grade = cells[1].children[0].value.toUpperCase();
      const credits = parseFloat(cells[2].children[0].value);
      if (isNaN(credits)) continue;

      let points;
      switch (grade) {
        case "A":
          points = 4.0;
          break;
        case "A-":
          points = 3.7;
          break;
        case "B+":
          points = 3.3;
          break;
        case "B":
          points = 3.0;
          break;
        case "B-":
          points = 2.7;
          break;
        case "C+":
          points = 2.3;
          break;
        case "C":
          points = 2.0;
          break;
        case "C-":
          points = 1.7;
          break;
        case "D+":
          points = 1.3;
          break;
        case "D":
          points = 1.0;
          break;
        case "D-":
          points = 0.7;
          break;
        case "F":
          points = 0.0;
          break;
        default:
          points = 0.0;
          break;
      }

      totalPoints += points * credits;
      totalCredits += credits;
    }
  }

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0.0;
  document.getElementById("gpa").value = gpa;
});
