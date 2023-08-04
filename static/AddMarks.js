// document.addEventListener("DOMContentLoaded", function () {
//   const marksForm = document.getElementById("marks-form");
//   const marksTable = document.getElementById("marks-table");


//   marksForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const studentName = document.getElementById("name").value;
//     const usn = document.getElementById("usn").value;
//     const dataStructures = parseInt(document.getElementById("data-structures").value);
//     const operatingSystem = parseInt(document.getElementById("operating-system").value);
//     const unix = parseInt(document.getElementById("unix").value);
//     const maths = parseInt(document.getElementById("maths").value);
//     const microcontroller = parseInt(document.getElementById("microcontroller").value);

//     const totalMarks = dataStructures + operatingSystem + unix + maths + microcontroller;
//     const average = totalMarks / 5;

//     const newRow = marksTable.insertRow();
//     newRow.innerHTML = `
//       <td>${studentName}</td>
//       <td>${usn}</td>
//       <td>${dataStructures}</td>
//       <td>${operatingSystem}</td>
//       <td>${unix}</td>
//       <td>${maths}</td>
//       <td>${microcontroller}</td>
//       <td>${average.toFixed(2)}</td>
//     `;

//     updateAverageRow();

//     marksForm.reset();
//   });

//   function getRowAverage(row) {
//     const totalMarks = Array.from(row.children).slice(2, -1).reduce((acc, cell) => {
//       const marks = parseInt(cell.textContent);
//       return acc + marks;
//     }, 0);
//     const numberOfSubjects = row.children.length - 4;
//     return (totalMarks / numberOfSubjects).toFixed(2);
//   }


// });


// ------NEW---------

// AddMarks.js
document.addEventListener("DOMContentLoaded", function () {
  const marksForm = document.getElementById("marks-form");
  const marksTable = document.getElementById("marks-table");

  function calculateGrade(marks) {
    if (marks >= 90) {
      return "<strong>A+</strong>";
    } else if (marks >= 80) {
      return "<strong>A</strong>";
    } else if (marks >= 70) {
      return "<strong>B+</strong>";
    } else if (marks >= 60) {
      return "<strong>B</strong>";
    } else if (marks >= 50) {
      return "<strong>C+</strong>";
    } else if (marks >= 40) {
      return "<strong>C</strong>";
    } else {
      return "<strong>F</strong>";
    }
  }

  function extractNumericValue(html) {
    const numericValue = html.match(/[-+]?\d*\.?\d+/)[0];
    return parseFloat(numericValue);
  }

  marksForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("name").value;
    const usn = document.getElementById("usn").value;
    const dataStructures = parseInt(document.getElementById("data-structures").value);
    const operatingSystem = parseInt(document.getElementById("operating-system").value);
    const unix = parseInt(document.getElementById("unix").value);
    const maths = parseInt(document.getElementById("maths").value);
    const microcontroller = parseInt(document.getElementById("microcontroller").value);

    const totalMarks = dataStructures + operatingSystem + unix + maths + microcontroller;
    const average = totalMarks / 5;

    const newRow = marksTable.insertRow();
    newRow.innerHTML = `
      <td>${studentName}</td>
      <td>${usn}</td>
      <td>${dataStructures} (${calculateGrade(dataStructures)})</td>
      <td>${operatingSystem} (${calculateGrade(operatingSystem)})</td>
      <td>${unix} (${calculateGrade(unix)})</td>
      <td>${maths} (${calculateGrade(maths)})</td>
      <td>${microcontroller} (${calculateGrade(microcontroller)})</td>
      <td class="average-cell">${average.toFixed(2)}</td>
    `;

    updateAverageRow();

    marksForm.reset();
  });

  function getRowAverage(row) {
    const totalMarks = Array.from(row.children)
      .slice(2, -1) // Exclude the name, USN, and average cells
      .reduce((acc, cell) => {
        const marks = extractNumericValue(cell.textContent); // Extract numeric marks
        return acc + marks;
      }, 0);
    const numberOfSubjects = row.children.length - 4;
    return (totalMarks / numberOfSubjects).toFixed(2);
  }

  function updateAverageRow() {
    const rows = marksTable.getElementsByTagName("tr");
    const totalRows = rows.length - 2; // Excluding header and average row

    let totalMarks = 0;
    for (let i = 1; i <= totalRows; i++) {
      const row = rows[i];
      const average = parseFloat(getRowAverage(row));
      totalMarks += average;
    }

    const classAverage = totalMarks / totalRows;
    const averageRow = rows[rows.length - 1]; // Last row is the average row
    averageRow.lastElementChild.textContent = classAverage.toFixed(2);
  }
});

