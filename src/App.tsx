import React, { useState } from "react";
import "./App.css";
import CombatPage from "./pages/CombatPage/CombatPage";
import AncientWheel from "./pages/Start/Start";

export enum Pages {
  start = "start",
  pwp = "pwp",
}

function App() {
  const [page, setPage] = useState(Pages.start);

  if (page === Pages.start) {
    return (
      <div className="App">
        <AncientWheel onChangePage={() => setPage(Pages.pwp)} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <CombatPage onChangePage={() => setPage(Pages.start)} />
      </div>
    );
  }
}

export default App;
