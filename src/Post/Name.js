//@flow
import React from "react";

type Props = {
  name: string,
  className?: string
};


export default function Name(props: Props) {
  return (
    <div className={`post-name ${props.className ? props.className : ""}`}>
      {props.name}
    </div>
  )
}