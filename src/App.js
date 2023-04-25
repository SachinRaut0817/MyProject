import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { FirebaseProvider } from "./contexts/FirebaseContext";

import routes, { renderRoutes } from "./routes";

const App = () => {
  return (
    <React.Fragment>
      {/* <Router basename={BASENAME}> */}
      <Router>
        <FirebaseProvider>{renderRoutes(routes)}</FirebaseProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
