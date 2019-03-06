//@flow
import React from "react";
import * as dateFormat from "dateformat";

type Props = {
  date: string | number,
  className?: string
};


export default function PostDate(props: Props) {
  const date = new Date(props.date);
  return (
    <div className={`post-date ${props.className ? props.className : ""}`}>
      {dateFormat(date, "dd/mm/yyyy HH:MM")}
    </div>
  )
}