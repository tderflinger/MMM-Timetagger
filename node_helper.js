const NodeHelper = require("node_helper");
const axios = require("axios");

let endpoint = "";
let apiToken = "";

const getRecords = async (startTime, endTime) => {
  try {
    const response = await axios({
      method: "get",
      url: `${endpoint}/records?timerange=${startTime}-${endTime}`,
      headers: { authtoken: apiToken },
    });
    return response?.data;
  } catch (error) {
    console.error("Error querying records!");
    return null;
  }
};

const calculateHoursWorked = (records) => {
  const sumValues = records?.reduce(
    (prevValue, currentValue) =>
      prevValue + Math.abs(currentValue?.t1 - currentValue?.t2),
    0
  );
  const sumDiff = Math.floor(sumValues / 3600);
  const minDiff = Math.round((sumValues - sumDiff * 3600) / 60);

  return { sumDiff, minDiff };
};

function getMondayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const monday = new Date(today.setDate(first));

  return monday;
}

module.exports = NodeHelper.create({
  start: function () {
    console.info("MMM-Timetagger started!");
  },
  socketNotificationReceived: async function (notification, payload) {
    const self = this;
    switch (notification) {
      case "GET_TIMETAGGER_DATA":
        endpoint = payload?.endpoint;
        apiToken = payload?.apiToken;
        const monday = getMondayOfCurrentWeek();
        monday.setHours(0);
        monday.setMinutes(0);
        const now = new Date();
        const response = await getRecords(
          Math.trunc(monday.getTime() / 1000),
          Math.trunc(now.getTime() / 1000)
        );

        if (response) {
          const result = calculateHoursWorked(response?.records);
          self.sendSocketNotification("UPDATE_TIMETAGGER_DATA", {
            ...result
          });
        }
        break;
      default:
        console.error("Switch item {} is missing", notification);
    }
  },
});
