import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVE);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  }

  const handleDelete = (id) => {
    // user has clicked confirm at this point
    transition(DELETE);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => transition(ERROR_DELETE, true));
  };

  const confirmDelete = () => transition(CONFIRM);
  const handleEdit = () => transition(EDIT);

  console.log('PROPS INTERVIEW------', props.interview);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={handleEdit}
        />
      )}
      {mode === SAVE && <Status />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={() => handleDelete(props.id)}
          message={"Are you sure, you would like to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Error on save"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error on delete"} onClose={back} />
      )}
    </article>
  );
}
