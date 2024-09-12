import React, { useCallback, useState } from "react";
import "./App.css";
import CombatPage from "./pages/CombatPage/CombatPage";
import AncientWheel from "./pages/Start/Start";

export enum Pages {
  start = "start",
  pwp = "pwp",
}

function App() {
  const [page, setPage] = useState(Pages.start);
  const [userPoints, setUserPoints] = useState(100);

  const onChangeUserPoints = useCallback(
    (gamePoints: number) => {
      return setUserPoints((prev) => prev + gamePoints);
    },
    [setUserPoints]
  );

  if (page === Pages.start) {
    return (
      <div className="App">
        <AncientWheel
          onChangePage={() => setPage(Pages.pwp)}
          userPoints={userPoints}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <CombatPage
          onChangePage={() => setPage(Pages.start)}
          userPoints={userPoints}
          onChangeUserPoints={onChangeUserPoints}
        />
      </div>
    );
  }
}

export default App;
