document.addEventListener("DOMContentLoaded", () => {
    // Initialize with some default data
    let dayData = [
      { category: "Food", amount: 30 },
      { category: "Entertainment", amount: 20 },
      { category: "Transportation", amount: 15 },
    ];
  
    let monthData = [
      { category: "Food", amount: 300 },
      { category: "Entertainment", amount: 200 },
      { category: "Transportation", amount: 150 },
    ];
  
    // Create day and month report charts
    createChart("day-chart", dayData, "Day Report");
    createChart("month-chart", monthData, "Month Report");
  
    // Add event listeners to update data
    const dayInput = document.getElementById("day-input");
    const monthInput = document.getElementById("month-input");
  
    dayInput.addEventListener("click", () => {
      // Example: Update day data when the user clicks the "Update Day" button
      dayData = [
        { category: "Food", amount: parseInt(prompt("Enter Food Expense:")) || 0 },
        { category: "Entertainment", amount: parseInt(prompt("Enter Entertainment Expense:")) || 0 },
        { category: "Transportation", amount: parseInt(prompt("Enter Transportation Expense:")) || 0 },
      ];
      updateChart("day-chart", dayData, "Day Report");
    });
  
    monthInput.addEventListener("click", () => {
      // Example: Update month data when the user clicks the "Update Month" button
      monthData = [
        { category: "Food", amount: parseInt(prompt("Enter Monthly Food Expense:")) || 0 },
        { category: "Entertainment", amount: parseInt(prompt("Enter Monthly Entertainment Expense:")) || 0 },
        { category: "Transportation", amount: parseInt(prompt("Enter Monthly Transportation Expense:")) || 0 },
      ];
      updateChart("month-chart", monthData, "Month Report");
    });
  
    function createChart(containerId, data, title) {
      const ctx = document.getElementById(containerId).getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.map((item) => item.category),
          datasets: [
            {
              data: data.map((item) => item.amount),
              backgroundColor: ["#ff5733", "#33c1ff", "#33ff40"],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: title,
          },
        },
      });
    }
  
    function updateChart(containerId, data, title) {
      const chart = document.getElementById(containerId).getContext("2d");
      chart.destroy();
      createChart(containerId, data, title);
    }
  });
  