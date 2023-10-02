import "./Benchmark.scss";
import { IBenchmark } from "../interfaces";
import { useEffect, useState, useRef } from "react";

const Benchmark = ({
  start,
  stop,
  benchmarks,
}: IBenchmark & { benchmarks?: IBenchmark[] }) => {
  const interval = useRef<ReturnType<typeof setInterval>>();
  const [tick, setTick] = useState<number>(start || 0);

  useEffect(() => {
    clearInterval(interval.current);
  }, [stop]);

  useEffect(() => {
    setTick(start!);
    interval.current = setInterval(() => setTick(performance.now()), 3);
    return () => clearInterval(interval.current);
  }, [start]);

  return (
    <div className="benchmark">
      {start && (
        <div className={`current ${stop ? "finished" : "running"}`}>
          {((stop ? stop - start : tick - start) / 1000).toLocaleString("en", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}{" "}
          sec
        </div>
      )}

      <div className="benchmark-list">
        {(stop ? benchmarks?.slice(0, benchmarks.length - 1) : benchmarks)?.map(
          (benchmark) =>
            benchmark.stop &&
            benchmark.start && (
              <div key={benchmark.stop}>
                {((benchmark.stop - benchmark.start) / 1000).toLocaleString(
                  "en",
                  {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  }
                )}{" "}
                sec
              </div>
            )
        ).reverse()}
      </div>
    </div>
  );
};

export default Benchmark;
