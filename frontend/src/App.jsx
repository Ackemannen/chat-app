import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Call from "./pages/Call";
import ChatPage from "./pages/ChatPage";

import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {

  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  //const isOnboarded = authUser?.isOnboarded;

  if(isLoading) return <PageLoader />

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Layout showSidebar={true}><Home /></Layout>) : <Navigate to="/login" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />

        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? (<Layout showSidebar={true}><Notifications /></Layout>) : <Navigate to="/login" />} />
        
        <Route path="/call/:id" element={isAuthenticated ? <Call /> : <Navigate to="/login" />} />
        <Route path="/chat/:id" element={isAuthenticated ? <Layout showSidebar={false}><ChatPage /></Layout> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App