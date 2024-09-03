import { createElement, render } from "preact";

export default function Activity({ activity, index }) {
  return (
    <div key={index} className="col-span-12 grid grid-cols-12">
      <div className="col-span-1">{index + 1}</div>
      <div className="col-span-2">{activity.start_time}</div>
      <div className="col-span-2">{activity.end_time}</div>
    </div>
  );
}
