import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

// InterviewerList receives three props:
// interviewers:array - an array of objects 
// setInterviewer:function - a function that accepts an interviewer id and used by InterviewerListItem
// interviewer:number - a number representing the id of the currently selected interviewer

export default function InterviewerList(props) {
  console.log("this is PROPS: ", props);

  const parsedDayInterviewerListItems = props.interviewers.map(
    (interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      ></InterviewerListItem>
    )
  );

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedDayInterviewerListItems}</ul>
    </section>
  );
}
