import type { NextPage } from 'next'
import { MouseEventHandler, useRef } from 'react'
import type { activity } from '../services/types'
import { useState } from 'react'
import { api } from '../services/api'
import HomeView from '../components/HomeView'


interface homeProps {
  activities: [activity, activity]
}

const Home: NextPage<homeProps> = ({ activities }) => {
  const  [firstActivity, secondActivity] = activities
  const [activity, setActivity] = useState(firstActivity)
  const nextActivityRef = useRef(secondActivity)  // Does not cause rerender
  const [nextActivityIsLoading, setNextActivityIsLoading] = useState(false)

  const handleClick : MouseEventHandler<HTMLButtonElement> = async (_e) => {
    // prefetch
    const nextValueApiRequest = api.get('')

    // if previous prefetch hasn't resolved yet
    if (nextActivityRef.current === activity) {
      setNextActivityIsLoading(true)

      // await here so that this prefetch doesn't overwrite previous prefetch
      // before the interval resolves, and setActivity can be called
      await new Promise<void>((resolve) => {
        // Loop while prefetch hasn't resolved
        const interval = setInterval(() => {
        if (nextActivityRef.current === activity) return;

        clearInterval(interval)
        setActivity(nextActivityRef.current)
        setNextActivityIsLoading(false)
        resolve()
      }, 100)
      })
    } else {
      setActivity(nextActivityRef.current)
    }

    // set next value from prefetch
    nextValueApiRequest.then((res) => {
      nextActivityRef.current = res.data
    })
  }

  return (
    <HomeView
        nextActivityIsLoading={nextActivityIsLoading}
        handleClick={handleClick}
        activity={activity}
    />
  )
}

export async function getServerSideProps() {
  const promises = [api.get(''), api.get('')]

  return  {
    props: {
      activities: (await Promise.all(promises)).map((r) => r.data)
    }
  }
}

export default Home
