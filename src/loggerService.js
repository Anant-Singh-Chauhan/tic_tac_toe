import axios from "axios";
import UAParser from "ua-parser-js";

const loggerServiceURL = process.env.REACT_APP_LOGGER_SVC_URL; // URL of your logger service

const fetchIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address", error);
    return window.location.hostname;
  }
};

export const logClientInfo = async (logLevel, message, errorDetails) => {
  // Capture client info using UAParser
  const parser = new UAParser();
  const browserInfo = parser.getResult();

  const logData = {
    level: logLevel, // e.g., 'info', 'error'
    message: message,
    isDefault: false,
    label: process.env.REACT_APP_PROJECT_NAME,
    meta: {
      browser: browserInfo.browser.name,
      os: browserInfo.os.name,
      ip: await fetchIP(),
      errorDetails,
    },
  };

  // Send log data to logger service
  axios
    .post(loggerServiceURL, logData)
    .then((response) => console.log("Log sent successfully:", response))
    .catch((error) => console.error("Error sending log:", error));
};
