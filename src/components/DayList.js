import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const parsedDayListItems = props.days.map((day) =>
    <li>{day.name}</li>
  );

  return (
    <ul>{parsedDayListItems}</ul>
  );
};




// Our DayList component will take in three props.

// * days:Array a list of day objects (each object includes an id, name, and spots)
// * day:String the currently selected day
// * setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
// The DayList is responsible for rendering a list of DayListItem components. 
// It doesn't have any styles of its own so we don't need a DayList.scss file.