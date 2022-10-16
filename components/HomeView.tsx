import Head from "next/head";
import { MouseEventHandler } from "react";
import { activity } from "../services/types";
import Navbar from "./Navbar";

interface props {
    activity: activity,
    handleClick: MouseEventHandler<HTMLButtonElement>,
    nextActivityIsLoading: boolean
}

export default function HomeView({
    activity, handleClick, nextActivityIsLoading
}: props
) {
    return <div className="flex flex-col sm:p-10 h-full">
      <Head>
        <title>Bored? Not anymore</title>
        <meta name="description" content="A bored api view for usability" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex flex-col flex-grow">
        <h1 className="text-3xl font-bold m-4">
          Bored? Hopefully not anymore.
        </h1>
        <h2 className="text-2xl m-8">
          What should you do?
        </h2>
        <span className="my-auto self-center text-xl border-2
        bg-zinc-800 border-zinc-900 w-full sm:w-2/3 flex justify-center p-10">
          {activity.activity}
        </span>
      </main>
      <button onClick={handleClick}
        disabled={nextActivityIsLoading}
        className={`bg-slate-600 p-3 rounded mx-auto
        my-20 hover:shadow-slate-300 hover:shadow-2xl ${nextActivityIsLoading && "bg-slate-800 cursor-default"}`}
      >
        Another one
      </button>
      {
        nextActivityIsLoading &&
        <span className="mx-auto absolute top-2/3 sm:top-1/3 left-1/2 -translate-x-1/2">
          Loading...
        </span>
      }
      <footer className="flex items-center justify-center border-cyan-800 border-t-2 h-16 w-screen sm:-m-10 mt-16 sm:mt-16">
        <a href="https://github.com/artistrea/my-bored-api-view" target="_blank" rel="noreferrer"
          className="text-violet-300 underline decoration-2 decoration-cyan-600 rounded-full p-8"
        >github repo</a>
      </footer>
    </div>
}