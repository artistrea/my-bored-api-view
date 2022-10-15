import type { NextPage } from 'next'
import { MouseEventHandler, useEffect, useRef } from 'react'
import type { activity } from './types'
import { useState } from 'react'
import { api } from '../services/api'
import HomeView from '../components/HomeView'


interface homeProps {
  activities: [activity, activity]
}

const Home: NextPage<homeProps> = ({ activities }) => {
  const  [firstActivity, secondActivity] = activities
  const nextActivityRef = useRef(secondActivity)
  const [nextActivityIsLoading, setNextActivityIsLoading] = useState(false)
  const [activity, setActivity] = useState(firstActivity)

  useEffect(() => {
    if (nextActivityIsLoading) {
      
      const interval = setInterval(() => {
        if (nextActivityRef.current === activity) return;
        clearInterval(interval)
        setActivity(nextActivityRef.current)
        setNextActivityIsLoading(false)
      }, 100)

      api.get("").then((re) => {
        nextActivityRef.current = re.data
      })
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [nextActivityIsLoading])

  const handleClick : MouseEventHandler<HTMLButtonElement> = (_e) => {
    if (nextActivityRef.current === activity) {
      setNextActivityIsLoading(true)
      return;
    }

    setActivity(nextActivityRef.current)

    api.get("").then((re) => {
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
  const promise1 = api.get("")
  const promise2 = api.get("")

  
    
  return  {
    props: {
      activities: (await Promise.all([promise1, promise2])).map((r) => r.data)
    }
  }
}

export default Home
