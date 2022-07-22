import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationDat(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  function updateSpots(state, appointments) {
    const currentDay = state.days.find((day) => day.name === state.day);

    const appointmentIds = currentDay.appointments;

    const spots = appointmentIds.filter(
      (id) => !appointments[id].interview
    ).length;

    const currentDayIndex = state.days.findIndex(
      (day) => day.name === state.day
    );

    const updateDayObj = { ...currentDay, spots };

    const updateDayArr = [...state.days];

    updateDayArr[currentDayIndex] = updateDayObj;

    return updateDayArr;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });
    console.log("id-interveiwer:", id, interview);
    // debugger;
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState((state) => ({ ...state, days, appointments }));
    });
  }

  function cancelInterview(id, interveiw) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);

    console.log("\n\n Cancel Interview: ", interveiw);
    return axios
      .delete(`/api/appointments/${id}`)
      .then((state) => ({ ...state, appointments }))
      .catch((error) => {
        console.log("error", error);
      });
  }

  const daysURL = `http://localhost:8001/api/days`;
  const interviewersURL = `http://localhost:8001/api/interviewers`;
  const appointmentsURL = `http://localhost:8001/api/appointments`;

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
  return { state, setDay, bookInterview, cancelInterview };
}
