import data from "../assets/results.json";
import { behaviorChart } from "./charts/behavior-average";
import { agentAverageChart } from "./charts/agent-average";
import { updateScores } from "./utils/scores";
import { getReadableDescriptor } from "./utils/humanreadable";

(async function () {
  const behaviorScores = {}; // Object to store behavior scores
  const behaviorCounts = {}; // Object to store count of each behavior
  const agentScores = {};
  const agentCounts = {};

  // Process each entry in the data
  data.forEach((entry) => {
    // Extract behavior name without UUID
    const behaviorA = entry.BehaviorA.split("#")[0];
    const behaviorB = entry.BehaviorB.split("#")[0];
    const agentA = entry.BehaviorA;
    const agentB = entry.BehaviorB;

    const scoreA = parseInt(entry.ScoreA);
    const scoreB = parseInt(entry.ScoreB);

    updateScores(behaviorScores, behaviorCounts, behaviorA, scoreA);
    updateScores(behaviorScores, behaviorCounts, behaviorB, scoreA);
    updateScores(agentScores, agentCounts, agentA, scoreA);
    updateScores(agentScores, agentCounts, agentB, scoreB);
  });

  // Calculate average scores
  const compiledBehaviorScores = Object.keys(behaviorScores)
    .map((behavior) => {
      return {
        name: behavior,
        averageScore:
          behaviorScores[behavior].cumulatedScore / behaviorCounts[behavior],
        maxScore: behaviorScores[behavior].maxScore,
        minScore: behaviorScores[behavior].minScore,
      };
    })
    .sort((a, b) => (a.averageScore < b.averageScore ? 1 : -1));

  const compiledAgentScores = Object.keys(agentScores)
    .map((agent) => {
      return {
        name:
          agent.split("#")[0].replace(/[^A-Z]+/g, "") +
          " " +
          getReadableDescriptor(agent.split("#")[1]),
        averageScore: agentScores[agent].cumulatedScore / agentCounts[agent],
        maxScore: agentScores[agent].maxScore,
        minScore: agentScores[agent].minScore,
      };
    })
    .sort((a, b) => (a.averageScore < b.averageScore ? 1 : -1));

  // Call the function to create a chart
  behaviorChart("behavior-average", compiledBehaviorScores);
  agentAverageChart("agent-average", compiledAgentScores);
})();
