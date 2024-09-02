import { createElement, render } from "preact";

export default function Activity({ activity, index }) {
  return (
    <div key={index} className="col-span-12 grid">
      <div className="col-span-1">#</div>
      <div className="col-span-2">Start Time</div>
      <div className="col-span-2">End Time</div>
    </div>
  );
}
