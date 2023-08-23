import React from "react";
import LoggingForm from "../../Components/LoggingForm/LoggingForm";

function Registering() {
  return (
    <div className="container-logging">
      <div className="left-div">
        <LoggingForm isHandleRegister={true} />
      </div>
    </div>
  );
}

export default Registering;
