"use client";

import Image from "next/image";
import { use, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { set } from "react-hook-form";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [current, setCurrent] = useState("");
  const [other, setOther] = useState("");

  const [overview, setOverview] = useState<{name:string, actions:string[]}[]>();
  const [timeline, setTimeline] = useState<{period:string, focus_point:string, activities:string[], milestones:string[]}[]>();
  const [timetable, setTimetable] = useState<{time:string, tasks:string, description:string}[]>();


  const outRef = useRef<null | HTMLDivElement>(null);

  const scrollToOutput = () => {
    if (outRef.current !== null) {
      outRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const runApp = async (e: any) => {
    if (!goal || !timeframe || !current) {
      alert("Please fill out all required fields");
      return;
    }

    e.preventDefault();
    
    setOverview(undefined);
    setTimeline(undefined);
    setTimetable(undefined);

    setLoading(true);

    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal,
        timeframe,
        current,
        other,
      }),
    })

    const data = await response.json()  as {
      overview : {key_areas: {name:string, actions:string[]}[]}, 
      timeline : {period:string, focus_point:string, activities:string[], milestones:string[]}[],
      timetable : {time:string, tasks:string, description:string}[]
    };
    console.log(data);

    setOverview(data.overview.key_areas);
    setTimeline(data.timeline);
    setTimetable(data.timetable);

    scrollToOutput();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12">
        
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Set Goals. Achieve Them.
        </h1>


        <div className="w-full pt-8 space-y-4 grid grid-cols-2 gap-12">

          <div className="border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-3xl bg-black text-white flex items-center justify-center">1</div>
                <p className="text-left font-medium">
                  Set your Goal
                </p>
              </div>
            </div>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={"Millionaire"}
              />
          </div>


          <div className="border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-3xl bg-black text-white flex items-center justify-center">2</div>
                <p className="text-left font-medium">
                  Timeframe
                </p>
              </div>
            </div>
            <input
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={"5 Years"}
              />
          </div>

          <div className="border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-3xl bg-black text-white flex items-center justify-center">3</div>
                <p className="text-left font-medium">
                  Current Standing <span className="text-gray-600">(Describe yourself)</span>
                </p>
              </div>
            </div>
            <input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={"Broke High Schooler "}
              />
          </div>

          <div className="border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-3xl bg-black text-white flex items-center justify-center">4</div>
                <p className="text-left font-medium">
                  Anything Else? <span className="text-gray-600">(Optional)</span>
                </p>
              </div>
            </div>
            <input
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={""}
              />
        </div>

        </div>


          {loading ? (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-48"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          ) : (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-48"
              onClick={(e) => runApp(e)}
            >
              Get Me There &rarr;
            </button>
          )}



        <div className="space-y-10 w-full my-10">
          {(overview || timeline || timetable )&& (
            <>
              <hr/>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-extralight text-slate-900 mx-auto"
                  ref={outRef}
                >
                  Here's how YOU get there
                </h2>
              </div>

              <div className="space-x-8 flex items-center justify-evenly w-full mx-auto ">
                {overview && 
                <div className="CARD border border-gray-200 w-64 h-96 rounded-xl cursor-pointer p-4">
                  <div className="font-bold text-center text-xl rounded-t-xl -m-4 bg-black text-white mb-5 p-4"> KEY POINTS </div>
                  {
                    overview?.map((point, index) => {
                      return (
                      <div key={index} className="text-left font-bold my-5">
                        <div>{point.name}</div>
                      </div>)
                    })
                  }
                </div>
                }

                {timeline && 
                <div className="CARD border border-gray-200 w-64 h-96 rounded-xl cursor-pointer p-4 overflow-y-auto">
                  <div className="font-bold text-center text-xl rounded-t-xl -m-4 bg-black text-white mb-5 p-4"> Timeline </div>
                  {
                    timeline.map((period, index) => {
                      return (
                      <div key={index} className="text-left justify-between my-5">
                        <div className="text-base">{period.period}</div>
                        <div className="text-sm font-light">{period.focus_point}</div>
                      </div>)
                    })
                  }
                </div>
                }

                
                {timetable && 
                <div className="CARD border border-gray-200 w-64 h-96 rounded-xl cursor-pointer p-4 overflow-y-auto">
                  <div className="font-bold text-center text-xl rounded-t-xl -m-4 bg-black text-white mb-5 p-4"> Time Table </div>
                  {
                    timetable.map((period, index) => {
                      return (
                      <div key={index} className="text-left justify-between my-5">
                        <div className="text-base">{period.time}</div>
                        <div className="text-sm font-light">{period.description}</div>
                      </div>)
                    })
                  }
                </div>
                }

              </div>
            </>
          )}

        </div>


      </main>

      <Footer />
    </div>
  );
}
