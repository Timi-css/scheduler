import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const interviewerItem = props.interviewers.map((Interviewer) => {
    return (
      <InterviewerListItem
        key={Interviewer.id}
        name={Interviewer.name}
        avatar={Interviewer.avatar}
        selected={Interviewer.id === props.value}
        setInterviewer={() => props.onChange(Interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewerItem}</ul>
    </section>
  );
}
