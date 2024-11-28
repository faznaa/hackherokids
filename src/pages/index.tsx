import { useRouter } from "next/router";
import React from "react";

export default function Main() {
  const { query } = useRouter();
  return (
    <div className="w-screen min-h-screen p-20 flex items-center">
      <div className="w-full rounded-2xl min-h-[50vh] h-full p-10 flex flex-col gap-3 items-center justify-center bg-gradient-to-b from-gray-700 to-gray-800">
        <h1 className="text-3xl font-bold text-white">
          Welcome to Hack Heroes
        </h1>
        <p className="text-white">Let's learn to code</p>
        <a
          href="https://studio.code.org/hoc/1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 rounded-md"
        >
          Angry Birds Game
        </a>
        <a
          href="https://trinket.io/turtle"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 rounded-md"
        >
          Turtle Coding
        </a>
        {query?.q === "admin" && (
          <a
            href="https://trinket.io/turtle"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-4 rounded-md"
          >
            Slideshow PDF
          </a>
        )}
      </div>
    </div>
  );
}
