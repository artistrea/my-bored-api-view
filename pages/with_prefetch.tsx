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

  const handleClick : MouseEventHandler<HTMLButtonElement> = (_e) => {
    if (nextActivityRef.current === activity) {
      setNextActivityIsLoading(true)

      // Loop while next activity is still the same as current
      const interval = setInterval(() => {
        if (nextActivityRef.current === activity) return;

        clearInterval(interval)
        setActivity(nextActivityRef.current)
        setNextActivityIsLoading(false)
      }, 100)
    } else {
      setActivity(nextActivityRef.current)
    }

    api.get('').then((re) => {
      nextActivityRef.current = re.data
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
