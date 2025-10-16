"use client";

import {fetcher} from "@/fetcher/fetch";
import {useEffect} from "react";

export default function Home() {
  const getPopulation = async () => {
    const response = await fetcher(
      "https://api.worldbank.org/v2/country/US/indicator/SP.POP.TOTL?date=2012:2016&format=json",
    );
    console.log(response);
  };

  useEffect(() => {
    getPopulation();
  }, []);

  return (
    <main>
      <h1>Welcome to Next.js!</h1>
    </main>
  );
}
