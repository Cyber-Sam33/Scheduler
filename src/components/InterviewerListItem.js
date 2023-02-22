import classNames from "classnames";
import React from "react";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerListItemClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name} />
      {props.selected && props.name}
    </li>
  );
};



// export default function DayListItem(props) {
//   console.log("props at line 5", props);
  // const dayListItemClass = classNames("day-list__item", {
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": props.spots === 0
  // });

//   const formatSpots = function(props) {
//     if (props.spots === 0) {
//       return "no spots remaining";
//     } else if (props.spots === 1) {
//       return "1 spot remaining";
//     } else {
//       return `${props.spots} spots remaining`;
//     }
//   };

//   return (
//     <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{formatSpots(props)}</h3>
//     </li>
//   );
// };