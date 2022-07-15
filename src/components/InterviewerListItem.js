import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { setInterviewer, name, avatar, selected } = props;
  const interviewerListItemClass = classNames("InterviewerListItem", {
    "interviewers__item--selected": selected,
  });
  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
