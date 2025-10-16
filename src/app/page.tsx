"use client";

import {Dropdown} from "@/components/Dropdown";
import LineChart from "@/components/LineChart";
import {fetcher} from "@/fetcher/fetch";
import {IData, IPageInfo} from "@/interfaces";
import {useEffect, useState} from "react";

export default function Home() {
  const [years, setYears] = useState<{
    from: number;
    to: number;
  }>({from: 2010, to: 2016});
  const [population, setPopulation] = useState<(IPageInfo | IData[])[]>([]);

  const getPopulation = async () => {
    const response: (IPageInfo | IData[])[] = await fetcher(
      `https://api.worldbank.org/v2/country/US/indicator/SP.POP.TOTL?date=${years.from}:${years.to}&format=json`,
    );
    response[1] = (response[1] as IData[]).reverse();
    setPopulation(response);
  };

  useEffect(() => {
    getPopulation();
  }, [years]);

  const data = (population[1] as IData[])?.map((item) => item.value) || [];
  const labels = (population[1] as IData[])?.map((item) => item.date) || [];

  return (
    <main className="flex flex-col items-center justify-center p-5">
      <p>Population Data</p>
      <div className="flex justify-center gap-5 my-5">
        <Dropdown
          label="Tahun Awal"
          value={years.from.toString()}
          handleChange={(value: string) =>
            setYears({
              ...years,
              from: parseInt(value),
            })
          }
        />
        <Dropdown
          label="Tahun Akhir"
          value={years.to.toString()}
          handleChange={(value: string) =>
            setYears({
              ...years,
              to: parseInt(value),
            })
          }
        />
      </div>
      <LineChart data={data} labels={labels} />
    </main>
  );
}
