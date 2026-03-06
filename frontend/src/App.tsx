import "./styles/global.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import SignIn from "./pages/SignIn/SignIn";
import Account from "./pages/Account/Account";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage/searchPage";
import GamePage from "./pages/gamePage/gamePage";
import Backlog from "./pages/Backlog/backlog";
import Recomendations from "./pages/Recomendations/recomendations";

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
                onRecomendations={() => navigate("/recomendations")}
                onBacklogAchives={() => navigate("/backlog-achives")}
            />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />}/>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/account" element={<Account />} />
                <Route path="/recomendations" element={<Recomendations />} />
                <Route path="/backlog-achives" element={<Backlog />} />
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