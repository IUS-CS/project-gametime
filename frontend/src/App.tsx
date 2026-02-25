import "./styles/global.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import SignIn from "./pages/SignIn/SignIn";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//allows navigation
function AppContent() {
    const navigate = useNavigate();

    return (
        <>
            //header points the pages
            <Header
                onSignIn={() => navigate("/sign-in")}
                onCreateAccount={() => navigate("/create-account")}
                onAccount={() => console.log("Account")}
            />
            //routes the buttons take
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />}/>
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}