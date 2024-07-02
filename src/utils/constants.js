export const candleStickOptions = {
  chart: {
    type: "candlestick",
    height: 250,
    toolbar: {
      show: false, // Hide the toolbar
    },
  },

  xaxis: {
    type: "datetime",
    labels: {
      formatter: function (value, timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        return `${day} ${month}`;
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      // console.log(series, seriesIndex, dataPointIndex); // Check the structure of the series object
      if (series[seriesIndex]) {
        const data = series[seriesIndex];
        // console.log(data); // Check if data is available
        if (data) {
          const o = data[0].toFixed(2);
          const h = data[1].toFixed(2);
          const l = data[2].toFixed(2);
          const c = data[3].toFixed(2);
          return `<div class="apexcharts-tooltip-candlestick">
                <div>O: <span>${o}</span></div>
                <div>H: <span>${h}</span></div>
                <div>L: <span>${l}</span></div>
                <div>C: <span>${c}</span></div>
              </div>`;
        }
      }
      return ""; // Return empty string if data is not available
    },
  },
};
