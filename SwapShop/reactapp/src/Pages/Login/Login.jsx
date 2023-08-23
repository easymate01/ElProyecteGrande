import LoggingForm from "../../Components/LoggingForm/LoggingForm";

const Login = () => {
  return (
    <div className="container-logging">
      <div className="left-div">
        <LoggingForm isHandleRegister={false} />
      </div>
    </div>
  );
};

export default Login;
