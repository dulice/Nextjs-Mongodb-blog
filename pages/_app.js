import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navbar/Navigation";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <Navigation>
      <AnimatePresence
        exitBeforeEnter
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </Navigation>
  );
}

export default MyApp;
