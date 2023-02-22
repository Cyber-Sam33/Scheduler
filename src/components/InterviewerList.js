import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log('this is PROPS: ', props);

  const parsedDayInterviewerListItems = props.interviewers.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    ></InterviewerListItem>
  );



  return (
    // <ul>{parsedDayInterviewerListItems}</ul>
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedDayInterviewerListItems}</ul>
    </section>

  );
};




// Our <InterviewerList> receives three props:

// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
// interviewer:number - a number that represents the id of the currently selected interviewer