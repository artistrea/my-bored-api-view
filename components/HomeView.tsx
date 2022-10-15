import Head from "next/head";
import { MouseEventHandler } from "react";
import { activity } from "../pages/types";
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
    return <div>
      <Head>
        <title>Bored? Not anymore</title>
        <meta name="description" content="A bored api view for usability" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Navbar />

      <main>
        <h1>
          Bored? Hopefully not anymore.
        </h1>
        <h2>
          What should you do?
        </h2>
        <span>
          {activity.activity}
        </span>
      </main>
      <button onClick={handleClick}
        disabled={nextActivityIsLoading}
      >
        Not this one
      </button>
      {
        nextActivityIsLoading &&
        <span>Loading...</span>
      }
    </div>
}