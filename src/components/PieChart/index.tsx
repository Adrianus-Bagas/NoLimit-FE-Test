import Chart from "chart.js";
import {useEffect} from "react";

import {IData} from "@/interfaces";
import {areEqual, getRandomColor} from "@/utils";

export default function PieChart({
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
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              label: "Population",
              data,
              backgroundColor: Array.from({length: data.length}, () => getRandomColor()),
            },
          ],
        },
      };
      const canvas = document.getElementById("pie-chart") as HTMLCanvasElement | null;

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
          <div className="relative">
            <canvas id="pie-chart" />
          </div>
        </div>
      </div>
    </>
  );
}
