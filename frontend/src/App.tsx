import "./styles/global.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import SignIn from "./pages/SignIn/SignIn";
import Account from "./pages/Account/Account";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//allows navigation
function AppContent() {
    const navigate = useNavigate();

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>

            <Header
                onSignIn={() => navigate("/sign-in")}
                onCreateAccount={() => navigate("/create-account")}
                onAccount={() => navigate("/account")}
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />}/>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/account" element={<Account />} />
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