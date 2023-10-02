import { useState, useEffect } from 'react';
import "./App.scss";
import Benchmark from "./Benchmark/Benchmark";
import Header from "./Header/Header";
import { IBenchmark } from './interfaces';

function App() {
  const [benchmark, setBenchmark] = useState<IBenchmark>({start: performance.now()});
  const [finishedBenchmarks, setFinishedBenchmarks] = useState<IBenchmark[]>([]);

  useEffect(() => {
    if (benchmark.stop) {
      setFinishedBenchmarks([...finishedBenchmarks, benchmark]);
    }
    // eslint-disable-next-line
  }, [benchmark])
  
  return (
    <div className="App">
      <Header></Header>
      <Benchmark start={benchmark?.start} stop={benchmark?.stop} benchmarks={finishedBenchmarks}></Benchmark>
      <main className={"flex items-center justify-center h-screen"}>
        <button className={"bg-yellow-300 hover:bg-yellow-200 text-black font-bold py-4 px-6 border-b-4 border-yellow-600 hover:border-yellow-600 rounded text-2xl font-bold transition-all w-72"} onClick={() => {
          if (benchmark.stop) 
            setBenchmark({start: performance.now()})
          else
           setBenchmark({...benchmark, stop: performance.now()})
        }}>{benchmark.stop ? "Жмякни!" : "Считаем..."}</button>
      </main>
    </div>
  );
}

export default App;
