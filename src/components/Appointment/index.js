import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });

  }

  const handleDelete = (id) => { // user has clicked confirm at this point
    transition(DELETE);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => console.log('An error occurred', err));
  };

  const confirmDelete = () => transition(CONFIRM);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
        />
      )}
      {mode === SAVE && <Status />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onCancel={back}
        onConfirm={() => handleDelete(props.id)}
        message={'Are you sure, you would like to delete?'} />}

    </article>
  );
}