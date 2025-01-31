"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("Professional");

  const [goal, setGoal] = useState("");
  const [timeline, setTimeline] = useState("");
  const [current, setCurrent] = useState("");
  const [other, setOther] = useState("");

  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [isLlama, setIsLlama] = useState(false);

  const outRef = useRef<null | HTMLDivElement>(null);

  const scrollToOutput = () => {
    if (outRef.current !== null) {
      outRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 3 ${
    vibe === "Casual" ? "relaxed" : vibe === "Funny" ? "silly" : "Professional"
  } twitter biographies with no hashtags and clearly labeled "1.", "2.", and "3.". Only return these 3 twitter bios, nothing else. ${
    vibe === "Funny" ? "Make the biographies humerous" : ""
  }Make sure each generated biography is less than 300 characters, has short sentences that are found in Twitter bios, and feel free to use this context as well: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const runApp = async (e: any) => {
    if (!goal || !timeline || !current) {
      alert("Please fill out all required fields");
      return;
    }


    e.preventDefault();
    
    setGeneratedBios("");

    setLoading(true);
    const response = await fetch("/api/together", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: isLlama
          ? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
          : "mistralai/Mixtral-8x7B-Instruct-v0.1",
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

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
                  Timeline
                </p>
              </div>
            </div>
            <input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
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



        <div className="space-y-10 my-10">
          {generatedBios || true && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={outRef}
                >
                  Here's How you get there
                </h2>
              </div>

              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}

              </div>
            </>
          )}

        </div>


      </main>

      <Footer />
    </div>
  );
}
