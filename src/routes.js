import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

import { BASE_URL } from "./config/constant";
import history from "./services/history";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            history={history}
            render={(props) => (
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Component {...props} />
                )}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("./views/auth/signin/SignIn1")),
  },
  {
    exact: true,
    path: "/auth/signup-1",
    component: lazy(() => import("./views/auth/signup/SignUp1")),
  },
  {
    path: "*",
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: "/dashboard",
        component: lazy(() => import("./views/dashboard/DashDefault")),
      },
      {
        exact: true,
        path: "/users",
        component: lazy(() => import("./views/users/Users")),
      },
      {
        exact: true,
        path: "/un-representative",
        component: lazy(() =>
          import("./views/un-representative/UNRepresentative")
        ),
      },

      {
        exact: true,
        path: "/contents",
        component: lazy(() => import("./views/content/Content")),
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to={BASE_URL} />,
      },
    ],
  },
];

export default routes;
