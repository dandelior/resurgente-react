import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollToTop";

// Pages
import Home from "./pages/Home";
import Tag from "./pages/Tag";
import Single from "./pages/Single";
import Autor from "./pages/Autor";

export default function App() {
  return (
    <Router>
      <Header />

      <ScrollToTop />
      
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/tag/:slug">
          <Tag />
        </Route>

        <Route path="/autor/:slug">
          <Autor />
        </Route>

        <Route path="/:slug">
          <Single />
        </Route>

        {/* <Route>
        </Route> */}

      </AnimatedSwitch>
      <Footer />
    </Router>
  );
}