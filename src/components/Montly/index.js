import React from "react";
import { Line, Pie } from "react-chartjs-2";

const data = {
  labels: ["Food", "Entertainment", "Snacks", "Travel"],
  datasets: [
    {
      data: [300, 50, 100, 90],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "skyblue"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "skyblue"],
    },
  ],
};

export default () => (
  <div>
    <h2 style={{ textAlign: "center" }}>Monthly Report</h2>
    <Pie data={data} width={400} height={400} />
  </div>
);
