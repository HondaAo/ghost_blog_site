import React, { useEffect } from 'react'
import { Footer } from '../components/Footer'
import '../styles/globals.scss'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
  <>
   <Component {...pageProps} />
   <Footer />
  </>
  )
}

export default MyApp
