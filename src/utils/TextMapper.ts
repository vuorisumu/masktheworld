import { useEffect, useState } from "react";

export function useGetMap(): string[][] {
  const [arr, setArr] = useState([[""]]);

  useEffect(() => {
    fetch("mapTest.txt")
      .then((r) => r.text())
      .then((txt) => {
        const processed = txt.split("\n").map((r) => r.split(""));
        setArr(processed);
      });
  }, []);

  return arr;
}
