import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "danger":
        return <FaExclamationCircle className="text-red-500" />;
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: "60px" }}>
      {props.alert && (
        <div
          className={`flex items-center p-3 mb-4 text-sm ${props.alert.alertType === 'success' ? 'bg-green-100 text-green-800' : props.alert.alertType === 'danger' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'} rounded-lg`}
          role="alert"
        >
          {getIcon(props.alert.alertType)}
          <div className="ml-2">
            <strong className="font-medium text-xs">{capitalize(props.alert.alertType)}</strong>: <span className="text-xs">{props.alert.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
