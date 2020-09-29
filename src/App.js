import React from "react";
import "./App.css";
import Landing from "./Landing.js";
import Login from "./LogIn.js";
<<<<<<< HEAD
import {Calculator} from "./components/calculator"
=======
import Calculator from "./components/calculator.js"
>>>>>>> master

function App() {
  const [page, setPage] = React.useState(window.location.pathname);

  const navigate = (event) => {
    event.preventDefault();
    const newPath = event.target.pathname;
    window.history.pushState(null, null, newPath);
    setPage(newPath);
  };

  React.useEffect(() => {
    const onHistoryChange = () => {
      setPage(window.location.pathname);
    };
    window.addEventListener("popstate", onHistoryChange);
    return () => window.removeEventListener("popstate", onHistoryChange);
  }, []);

  return (
    <main>
      {page === "/" && <Landing setPage={setPage} navigate={navigate} />}
      {page === "/login" && <Login />}
<<<<<<< HEAD
      {/* {page === "/signup" && <Signup />}  */}
      {page === "/calculate" && <Calculator />}  
=======
      {/* {page === "/signup" && <Signup />} */}
      {page === "/calculate" && <Calculator />}
>>>>>>> master
    </main>
  );
}

export default App;
