import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Loading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const handleComplete = () => setLoading(false)
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    
    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
    }
  }, [router.asPath, router.events])

  return loading
    ? <div className='spinner-wrapper'>
        <div className='spinner' />
      </div>
    : <></>
  
}


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Loading />
    <Component {...pageProps} />
  </> 
}

export default MyApp
