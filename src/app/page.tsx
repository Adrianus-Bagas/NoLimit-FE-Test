"use client";

import {useEffect, useState} from "react";

import {Button} from "@/components/Button";
import {Dropdown} from "@/components/Dropdown";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import {fetcher} from "@/fetcher/fetch";
import {usePrevious} from "@/hooks/usePrevious";
import {IData, IPageInfo} from "@/interfaces";

export default function Home() {
  const [years, setYears] = useState<{
    from: number;
    to: number;
  }>({from: 2010, to: 2016});
  const [population, setPopulation] = useState<(IPageInfo | IData[])[]>([]);
  const previousData = usePrevious((population[1] as IData[]) || []);

  const getPopulation = async () => {
    const response: (IPageInfo | IData[])[] = await fetcher(
      `https://api.worldbank.org/v2/country/US/indicator/SP.POP.TOTL?date=${years.from}:${years.to}&format=json`,
    );

    response[1] = (response[1] as IData[]).reverse();
    setPopulation(response);
  };

  useEffect(() => {
    getPopulation();
  }, []);

  const data = (population[1] as IData[])?.map((item) => item.value) || [];
  const labels = (population[1] as IData[])?.map((item) => item.date) || [];

  return (
    <main className="flex flex-col items-center justify-center p-5">
      <p>Population Data</p>
      <div className="flex justify-center gap-5 my-5">
        <Dropdown
          handleChange={(value: string) =>
            setYears({
              ...years,
              from: parseInt(value),
            })
          }
          label="Tahun Awal"
          value={years.from.toString()}
        />
        <Dropdown
          handleChange={(value: string) =>
            setYears({
              ...years,
              to: parseInt(value),
            })
          }
          label="Tahun Akhir"
          value={years.to.toString()}
        />
      </div>
      <Button handleClick={getPopulation} label="Submit" />
      <div className="my-3 w-full">
        <p className="text-center">Line Chart</p>
        <LineChart data={data} labels={labels} previousData={previousData} />
        <p className="text-center">Pie Chart</p>
        <PieChart data={data} labels={labels} previousData={previousData} />
      </div>
    </main>
  );
}
