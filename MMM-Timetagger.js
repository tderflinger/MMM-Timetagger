let currentDataTT = {};

Module.register("MMM-Timetagger", {
  defaults: {
  },
  start: function () {
    this.getData();
  },
  getScripts: function () {
    return [
      this.file("node_modules/preact/dist/preact.min.js"),
      this.file("node_modules/htm/dist/htm.js")
    ];
  },
  getDom: () => {
    const { h, render } = preact;
    const html = htm.bind(h);

    const TimetaggerWidget = ({ sumDiff, minDiff }) => {
      const diffColor = sumDiff < 20 ? "red" : "white";

      // taken from: https://iconduck.com/icons/88028/clock-time-four-outline, Apache License
      const ClockIcon = ({ size, paddingTop }) => {
        return html`<svg
          style="padding-top: ${paddingTop}px; width: ${size}px; height: ${size}px"
          fill="white"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10m5 11.9-.7 1.3-5.3-2.9v-5.3h1.5v4.4z"
          />
        </svg>`;
      };

      return html`<div style="margin-left: 1rem; margin-top: 4rem">
        <div
          style="display: flex; padding-top: 1rem; margin: 0; padding-bottom: 0"
        >
          <${ClockIcon} size=${38} paddingTop=${10} />
          <p
            style="font-size: 2rem; color: white; padding: 0; margin: 0; margin-left: 0.5rem"
          >
            Working
          </p>
        </div>
        <div style="display: inline-flex; gap: 1.5rem">
          <p
            style="font-size: 6rem; color: ${diffColor}; padding: 0; margin: 0"
          >
            ${sumDiff} : ${minDiff}
          </p>
        </div>
      </div>`;
    };

    const divElement = document.createElement("div");

    render(
      html`<${TimetaggerWidget}
        sumDiff=${currentDataTT?.sumDiff}
        minDiff=${currentDataTT?.minDiff}
      />`,
      divElement
    );
    return divElement;
  },
  getData: function () {
    this.sendSocketNotification("GET_TIMETAGGER_DATA", this.config);
    setInterval(() => {
      this.sendSocketNotification("GET_TIMETAGGER_DATA", this.config);
    }, this.config.interval);
  },
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "UPDATE_TIMETAGGER_DATA":
        currentDataTT = payload;
        break;
      default:
    }
    this.updateDom();
  }
});
