import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function AppLayouts() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}