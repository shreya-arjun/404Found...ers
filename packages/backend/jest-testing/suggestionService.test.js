import { test, expect } from "@jest/globals";
import { getMainEmotion } from "../services/suggestionService.js";

const emotions = [
  { name: "Anger", score: 0.1 },
  { name: "Anxiety", score: 0.2 },
  { name: "Boredom", score: 0.6 },
  { name: "Calmness", score: 0.4 },
  { name: "Concentration", score: 0.1 },
  { name: "Joy", score: 0.3 },
  { name: "Romance", score: 0.1 },
  { name: "Excitement", score: 0.2 },
];

test("Correctly finds emotion with the highest score", () => {
  expect(getMainEmotion(emotions)).toBe("Boredom");
});
