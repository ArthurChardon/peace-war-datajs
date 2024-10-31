export function updateScores(scoresSave, countSave, identifier, newScore) {
  if (!scoresSave[identifier]) {
    scoresSave[identifier] = {
      cumulatedScore: 0,
      maxScore: newScore,
      minScore: newScore,
    };
    countSave[identifier] = 0;
  }
  scoresSave[identifier].cumulatedScore += newScore;
  countSave[identifier] += 1;

  if (newScore > scoresSave[identifier].maxScore)
    scoresSave[identifier].maxScore = newScore;
  else if (newScore < scoresSave[identifier].minScore)
    scoresSave[identifier].minScore = newScore;
}
