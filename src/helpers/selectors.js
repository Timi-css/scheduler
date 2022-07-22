import React from "react";

export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(
    (selectedDayItem) => selectedDayItem.name === day
  );
  if (!foundDay) {
    return [];
  }
  return foundDay.appointments.map(
    (appointmentID) => state.appointments[appointmentID]
  );
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  let interviewer = interview.interviewer;
  let appointments = state.appointments;
  // console.log({ interviewer, appointments });
  if (appointments[interviewer]) {
    // console.log("Interviewer found");
    // return appointments.interviewer;
    return {
      student: interview.student,
      interviewer: state.interviewers[interviewer],
    };
  }
}

export const getInterviewersForDay = (state, day) => {
  console.log("DayandState", state, day);
  const foundDay = state.days.find(
    (selectedDayItem) => selectedDayItem.name === day
  );
  if (!foundDay) {
    return [];
  }
  console.log("FoundDay:", foundDay);
  return foundDay.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
};
