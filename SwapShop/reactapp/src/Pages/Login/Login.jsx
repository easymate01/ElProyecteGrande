import LoggingForm from "../../Components/LoggingForm/LoggingForm";


const Login = ({ onLogin }) => {


  return (
    <div className="container-logging">
      <div className="left-div">
        <LoggingForm isHandleRegister={false} onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Login;
