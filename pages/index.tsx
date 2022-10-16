import type { NextPage } from 'next'
import { MouseEventHandler, useEffect, useRef } from 'react'
import type { activity } from '../services/types'
import { useState } from 'react'
import { api } from '../services/api'
import HomeView from '../components/HomeView'


const Home: NextPage<activity> = (firstActivity) => {
  const [nextActivityIsLoading, setNextActivityIsLoading] = useState(false)
  const [activity, setActivity] = useState(firstActivity)

  const handleClick : MouseEventHandler<HTMLButtonElement> = (_e) => {
    setNextActivityIsLoading(true)

    api.get('').then((re) => {
      setActivity(re.data)
      setNextActivityIsLoading(false)
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
  return {
    props: (await api.get('')).data
  }
}

export default Home
