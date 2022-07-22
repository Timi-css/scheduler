import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import React, { Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import PropTypes from "prop-types";
import Confirm from "./Confirm";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    // debugger;
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview() {
    transition(DELETE);
    console.log("hi");
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  console.log("interviewers", props.interviewers);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          //can use the react dev tool to look into the info that we want
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
    </article>
  );
}

// Appointment.propTypes = {
//   id: PropTypes.string.isRequired,
//   bookInterview: PropTypes.func.isRequired,
//   interview: PropTypes.string.isRequired,
//   interviewers: PropTypes.string.isRequired,
// };
