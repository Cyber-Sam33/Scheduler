import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) { //setting replace with boolean
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);// newMode added to end of array
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]); // slice reuired before newMode added to end of array
    }
    setMode(newMode);
  }

  // transitions back to correct mode
  function back() {
    if (history.length < 2) return;
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);

    setMode(history[history.length - 2]);
  }

  return { mode, transition, back };
}
