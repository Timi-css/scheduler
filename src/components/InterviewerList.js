import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const interviewerItem = interviewers.map((theInterviewer) => {
    return (
      <InterviewerListItem
        key={theInterviewer.id}
        name={theInterviewer.name}
        avatar={theInterviewer.avatar}
        selected={theInterviewer.id === props.value}
        setInterviewer={() => onChange(theInterviewer.id)}
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

// InterviewerList.propTypes = {
//   interviewes: PropTypes.array.isRequired,
// };
