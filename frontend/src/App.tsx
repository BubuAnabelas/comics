import React from "react";

import { Refine, handleUseParams } from "@pankod/refine-core";
import {
    useLocation,
    useParams
} from "react-router-dom";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import 'index.css';
import { Layout } from "./components/Layout";
import { ComicsList } from './pages/index'
import { ViewComic } from './pages/ViewComic'

function App() {
  return (
    <Refine
      dataProvider={dataProvider("http://localhost:4000")}
      routerProvider={routerProvider}
      /*routerProvider={{...routerProvider, useParams: () => {
        const params = useParams();
        console.log({params})
        const { pathname } = useLocation();

        const paramsString = `/${Object.values(params).join("/")}`;
        console.log({paramsString})
        console.log('pathname', pathname.substring(1))
        console.log('ohter', decodeURIComponent(pathname.substring(1)).replace(
                          paramsString,
                          "",
                      ))
        return handleUseParams({
            ...params,
            resource:
                Object.keys(params).length === 0
                    ? pathname.substring(1)
                    : decodeURIComponent(pathname.substring(1)).replace(
                          paramsString,
                          "",
                      ),
        });
    }}}*/
      resources={[{ name: "comics", list: ComicsList }, { name: "view", list: ViewComic }]}
      Layout={Layout}
    />
  );
}

export default App;
