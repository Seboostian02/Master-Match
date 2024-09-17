import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { UserProvider } from "./contexts/UserProvider";
import AppLayout from "./pages/AppLayout";
import Signup from "./pages/Signup";
import Trainings from "./components/Trainings/Trainings";
import Training from "./components/Trainings/Training/Training";
import Questions from "./components/Questions/Questions";
import MyProfile from "./components/MyProfile/MyProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import About from "./pages/About";
import HomeApp from "./pages/HomeApp";
import AboutUsDescription from "./components/AboutUsDescription/AboutUsDescription";
import Answers from "./components/Questions/Answers/Answers";
import SebiCelFlorin from "./components/Footer/SebiCelFlorin";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route
            path="app"
            element={
              // <ProtectedRoute>
              <AppLayout />
              // </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomeApp />} />
            <Route path="about" element={<AboutUsDescription />} />
            <Route path="trainings" element={<Trainings />} />
            <Route path="trainings/:id" element={<Training />} />
            <Route path="questions" element={<Questions />} />
            <Route path="questions/:id" element={<Answers />} />
            <Route path="my-profile" element={<MyProfile />} />

            <Route path="edit-profile" element={<EditProfile />} />
          </Route>

          <Route path="sebi-cel-florin" element={<SebiCelFlorin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
