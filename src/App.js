import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import links from "./constants/links";
import { Home } from "./pages";
import { Networth } from "./components";

function App() {
    return (
        <BrowserRouter>
            <Route exact path={links.home} component={Home} />
            <Route exact path={links.networth} component={Networth} />
        </BrowserRouter>
    );
}

export default App;
