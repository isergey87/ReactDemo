//@flow
import React from "react";

type Props = {
  message: string,
  className?: string
};


export default function Message(props: Props) {
  return (
    <div className={`post-message ${props.className ? props.className : ""}`}>
      {props.message}
    </div>
  )
}