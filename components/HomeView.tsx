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
    return <div className="flex flex-col p-10">
      <Head>
        <title>Bored? Not anymore</title>
        <meta name="description" content="A bored api view for usability" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex flex-col">
        <h1 className="text-3xl font-bold m-4">
          Bored? Hopefully not anymore.
        </h1>
        <h2 className="text-2xl m-8">
          What should you do?
        </h2>
        <span className="self-center text-xl border-2 bg-zinc-800 border-zinc-900 w-2/3 flex justify-center p-10">
          {activity.activity}
        </span>
      </main>
      <button onClick={handleClick}
        disabled={nextActivityIsLoading}
        className={`bg-slate-600 p-3 rounded mx-auto my-7 ${nextActivityIsLoading && "bg-slate-800 cursor-default"}`}
      >
        Another one
      </button>
      {
        nextActivityIsLoading &&
        <span className="mx-auto">
          Loading...
          </span>
      }
    </div>
}