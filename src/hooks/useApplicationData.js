import { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";

export default function ApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const URLDays = "/api/days";
    const URLApps = "/api/appointments";
    const URLInterviewers = "/api/interviewers";

    Promise.all([
      axios.get(URLDays),
      axios.get(URLApps),
      axios.get(URLInterviewers),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(state, appointments) {
    const daysObj = state.days.find((day) => day.name === state.day);
    let spots = 0;

    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = { ...daysObj, spots };
    return state.days.map((dayItem) =>
      dayItem.name === state.day ? day : dayItem
    );
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const appID = `/api/appointments/${id}`;
    return axios.put(appID, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return {
    state: state,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview,
  };
}
