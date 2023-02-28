import { useState, useEffect } from "react"; ///removed Fragment ??? w7d3
import "components/Application.scss";
import axios from "axios";
// import { Logger } from "sass";

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
      // set your states here with the correct values...
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // add a spotsRemaining function each DAY OBJECT has one
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
    return state.days.map((dayItem) => (dayItem.name === state.day ? day : dayItem));
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
      // set states here with the correct values
      setState({
        ...state,
        appointments, days
      });
      //add a .then keep track of right amount of remaining spots
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
        appointments, days
      });
      //add a .then keep track of right amount of remaining spots
    });
  };

  console.log("STATE INTERVIEWERS", state.interviewers);
  // const appointments = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  //   return <Appointment
  //     key={appointment.id}
  //     {...appointment} interview={interview} interviewers={interviewers} bookInterview={bookInterview} />;
  // });

  return {
    state: state,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview,
  };
}

// 1.  const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {},
//   interviewers: {}
// });

// 2. const interviewers = getInterviewersForDay(state, state.day);

//3. const appointments = dailyAppointments.map(appointment => {
//   const { id, interview } = appointment;
//   const interviewObj = getInterview(state, interview);
//   return (
//     <Appointment
//       key={id}
//       {...appointment}
//       interview={interviewObj}
//       interviewers={interviewers}
//       bookInterview={bookInterview}
//       cancelInterview={cancelInterview}
//     />
//   );
// });

// return (

//   <main className="layout">
//     <section className="sidebar">
//       <img
//         className="sidebar--centered"
//         src="images/logo.png"
//         alt="Interview Scheduler"
//       />
//       <hr className="sidebar__separator sidebar--centered" />
//       <nav className="sidebar__menu">
//         <DayList days={state.days} value={state.day} onChange={setDay} />
//       </nav>
//       <img
//         className="sidebar__lhl sidebar--centered"
//         src="images/lhl.png"
//         alt="Lighthouse Labs"
//       />
//     </section>
//     <section className="schedule">
//       {appointments}
//     </section>
//   </main>
// );
