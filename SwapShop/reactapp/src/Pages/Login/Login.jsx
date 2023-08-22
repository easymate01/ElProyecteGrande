import LoggingForm from "../../Components/LoggingForm/LoggingForm";

const Login = () => {
  return (
    <div className="container-logging">
      <div className="left-div">
        <LoggingForm isHandleRegister={false} />
      </div>
      <div className="right-div">
        <img src="https://assets.codepen.io/285131/illustration-2.svg" />
      </div>
    </div>
  );
};

export default Login;
