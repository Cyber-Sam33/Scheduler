import React, { useState, useEffect } from "react"; ///removed Fragment ??? w7d3
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { Logger } from "sass";

export default function Application(props) {
  const setDay = day => setState(prev => ({ ...prev, day }));


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    // you may put the line below, but will have to remove/comment hardcoded appointments variable // ?????????
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    const URLDays = '/api/days';
    const URLApps = '/api/appointments';
    const URLInterviewers = '/api/interviewers';

    Promise.all([
      axios.get(URLDays),
      axios.get(URLApps),
      axios.get(URLInterviewers)
    ]).then((all) => {

      // set your states here with the correct values...
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));

    });
  }, []);

  // console.log('ALL:', all);
  console.log('STATE INTERVIEWERS', state.interviewers);
  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      {...appointment} interview={interview} interviewers={interviewers} />;
  });

  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}

