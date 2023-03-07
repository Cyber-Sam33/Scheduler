import React from "react";
import DayListItem from "components/DayListItem";

// Each day needs to display slightly differently depending on what state it is in AND should display 
// the name of the day, whether it is selected or unselected, and the interview spots remaining. 
// DayListItem props:
// * name:String the name of the day
// * spots:Number the number of spots remaining
// * selected:Boolean true or false declaring that this day is selected
// * setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

export default function DayList(props) {
  const parsedDayListItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}

      // We use the spots prop for two purposes:
      // To display the text "{props.spots} spots remaining" 2) and to determine if the day is full.
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    >
      {day.name}
    </DayListItem>
  ));

  return <ul>{parsedDayListItems}</ul>;


}
