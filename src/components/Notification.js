import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./Notification.style.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification[0]);
  const error = useSelector((state) => state.notification[1]);
  if (notification.length === 0) {
    return <></>;
  } else if (!error) {
    return (
      <Alert variant="success" className="myAlert-top">
        {" "}
        {notification}
      </Alert>
    );
  } else {
    return (
      <Alert variant="danger" className="myAlert-top">
        {" "}
        {notification}
      </Alert>
    );
  }
};

export default Notification;
