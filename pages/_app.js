import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navbar/Navigation";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Navigation>
      <AnimatePresence
        exitBeforeEnter
      >
        <Component {...pageProps} key={router.pathname}/>
      </AnimatePresence>
    </Navigation>
  );
}

export default MyApp;
