import { Chart } from "chart.js/auto";

export function behaviorChart(canvasId, behaviorScores) {
  console.log(behaviorScores);
  const ctx = document.getElementById(canvasId).getContext("2d");
  const behaviorsLabels = [];
  const averageScores = [];
  const maxScores = [];
  const minScores = [];
  behaviorScores.forEach((element) => {
    behaviorsLabels.push(element.name);
    averageScores.push(element.averageScore);
    maxScores.push(element.maxScore);
    minScores.push(element.minScore);
  });
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: behaviorsLabels, // Unique behavior names
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
        colors: {
          enabled: true,
        },
        title: {
          display: true,
          text: "Average Score per Behavior",
        },
      },
    },
  });
}
