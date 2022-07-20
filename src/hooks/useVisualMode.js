import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), newMode];
      } else {
        return [...prev, newMode];
      }
    });
  }
  function back() {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  }

  return { mode: history[history.length - 1], transition, back };
}
