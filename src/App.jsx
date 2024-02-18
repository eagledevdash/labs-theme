/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "~/assets/theme";
import Presentation from "~/layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "./routes";

import ContactUs from "~/layouts/pages/landing-pages/contact-us";
import AboutUs from "~/layouts/pages/landing-pages/about-us";
import Author from "~/layouts/pages/landing-pages/author";
import Lab from "~/pages/LandingPages/Lab";
import LabLanding from "./pages/LandingPages/Lab/LabLanding";
export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/author" element={<Author />} />
        <Route path="/lab/:id" element={<LabLanding />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/lab/edit/:id" element={<Lab />} />
      </Routes>
    </ThemeProvider>
  );
}
