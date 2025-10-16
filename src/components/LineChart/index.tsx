import Chart from "chart.js";
import {useEffect} from "react";

import {IData} from "@/interfaces";
import {areEqual, getRandomColor} from "@/utils";

export default function LineChart({
  labels,
  data,
  previousData,
}: {
  labels: string[];
  data: number[];
  previousData: IData[] | undefined;
}) {
  useEffect(() => {
    if (
      !previousData ||
      !areEqual(
        data,
        previousData.map((item) => item.value),
      )
    ) {
      var config = {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Population",
              backgroundColor: getRandomColor(),
              borderColor: getRandomColor(),
              data,
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "black",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(0,0,0,.7)",
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Years",
                  fontColor: "black",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(0,0,0,.7)",
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Value",
                  fontColor: "black",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(0, 0, 0, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      const canvas = document.getElementById("line-chart") as HTMLCanvasElement | null;

      if (canvas) {
        const ctx = canvas.getContext("2d");

        if (ctx) {
          (window as any).myLine = new Chart(ctx, config as any);
        }
      }
    }
  }, [labels, data, previousData]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div className="p-4 flex-auto">
          <div className="relative h-[350px]">
            <canvas id="line-chart" />
          </div>
        </div>
      </div>
    </>
  );
}
