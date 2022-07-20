import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";
import "components/Application.scss";

const appointments = {
  ...state,
  appointments,
  1: {
    id: 1,
    time: "12pm",
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  3: {
    id: 3,
    time: "2pm",
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
  5: {
    id: 5,
    time: "4pm",
  },
};
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    bookInterview,
  });

  const daysURL = `http://localhost:8001/api/days`;
  const interviewersURL = `http://localhost:8001/api/interviewers`;
  const appointmentsURL = `http://localhost:8001/api/appointments`;
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    console.log(id, interview);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }

  // Fetching data from the API using axios get requests
  useEffect(() => {
    const daysPromise = axios.get(daysURL).then((response) => {
      console.log(response.data);
      // setDays(response.data);
      return response.data;
    });
    const interviewersPromise = axios.get(interviewersURL).then((response) => {
      console.log(response.data);
      // setDays(response.data);
      return response.data;
    });

    const appointmentsPromise = axios.get(appointmentsURL).then((response) => {
      console.log(response.data);
      return response.data;
    });

    // Running all requests .then runs after the promise. Updating all states at once
    Promise.all([daysPromise, interviewersPromise, appointmentsPromise]).then(
      (values) => {
        console.log("Values: ", values);
        setState({
          ...state,
          days: values[0],
          interviewers: values[1],
          appointments: values[2],
        });
      }
    );
  }, []);
  console.log("State: ", state);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("Interview: ", interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        bookInterview={bookInterview}
        interview={interview}
      />
    );
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
          {" "}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
      </section>
    </main>
  );
}
