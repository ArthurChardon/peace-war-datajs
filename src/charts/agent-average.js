import Chart from "chart.js/auto";

export function agentAverageChart(canvasId, agentScores) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  const agents = [];
  const averageScores = [];
  const maxScores = [];
  const minScores = [];
  agentScores.forEach((element) => {
    agents.push(element.name);
    averageScores.push(element.averageScore);
    maxScores.push(element.maxScore);
    minScores.push(element.minScore);
  });
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: agents, // Unique behavior names including UUIDs
      datasets: [
        {
          label: "Average Score",
          data: averageScores, // Calculated average scores
          borderRadius: 4,
        },
        {
          label: "Max Score",
          data: maxScores,
          borderRadius: 4,
        },
        {
          label: "Min Score",
          data: minScores,
          borderRadius: 4,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Average Score per Agent",
        },
      },
    },
  });
}
