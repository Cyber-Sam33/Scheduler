import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) { //not sure we need to pass newMode argument 
    if (!replace) {
      setHistory(prev => ([...prev, newMode] // newMode added to end of array
      ));
    } else {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode])); // newMode added to end of array
    }
    setMode(newMode);
  }

  function back() {
    if (history.length < 2) return;
    setHistory(prev => ([...prev.slice(0, prev.length - 1)] // previous state minus last element 
    ));

    setMode(history[history.length - 2]);
  }



  return { mode, transition, back };
}