import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { AccountProvider } from '../context/AccountContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
  <>
   <Component {...pageProps} />
   <Footer />
  </>
  )
}

export default MyApp
