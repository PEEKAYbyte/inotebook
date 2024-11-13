import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Rerum ut cum est voluptas, dignissimos pariatur
            velit reiciendis cupiditate possimus architecto, deleniti impedit
            voluptatibus vitae dolores sequi odit expedita itaque! Explicabo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
