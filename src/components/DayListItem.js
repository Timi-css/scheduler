import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { setDay, name, spots, selected } = props;
  const dayListItemClass = classNames("DayListItem", {
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  function formatSpots(spots) {
    if (spots > 1) {
      return `${props.spots} spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    if (spots === 0) {
      return `no spots remaining`;
    }
  }

  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
