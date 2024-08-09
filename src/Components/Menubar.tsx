import "../Style/Menubar.css"
import Dashboard from "../Icons/Dashboard.tsx"
import EditSubjects from "../Icons/EditSubjects.tsx"
import EditTeachers from "../Icons/EditTeachers.tsx"
import Files from "../Icons/Files.tsx"
import TimeTables from "../Icons/TimeTables.tsx"
import TimeTableStructure from "../Icons/TimeTableStructure.tsx"
import Arrow from "../Icons/Arrow.tsx"

import React, { memo, useEffect } from "react"
import { Link } from "react-router-dom"
import Contact from "../Icons/ContactIcon.tsx"

interface MenubarProps {
    activeMenuIndex: number
}

const Menubar: React.FC<MenubarProps> = ({ activeMenuIndex }) => {
    function toggleMenubar() {
        let activeApp = document.querySelector(".app.active");
        activeApp!.classList.remove("active");
        document.querySelector(".app")!.classList.add("active");
    }
    function autoToggleInResize() {
        let app = document.querySelector(".app")
        if (window.innerWidth <= 1250) {
            if (app)
                app.classList.add("active");
        } else {
            if (app)
                app.classList.remove("active");
        }
    }
    useEffect(() => {
        autoToggleInResize();
        window.onresize = () => {
            autoToggleInResize()
        }
    }, [])

    return (
        <div className="menubar-container">
            <Arrow arrowIconClickHandler={toggleMenubar} className={"toggle-menubar-icon"} />
            <div className="title">
                <p>Time Table <br />Designer</p>
            </div>
            <Link to="/Subjects" className="menu-container" id={activeMenuIndex === 0 ? "active" : ""}>
                <EditSubjects />
                <div>Subjects</div>
            </Link>
            <Link to="/Teachers" className="menu-container" id={activeMenuIndex === 1 ? "active" : ""}>
                <EditTeachers />
                <div>Teachers</div>
            </Link>
            <Link to="/" className="menu-container" id={activeMenuIndex === 2 ? "active" : ""}>
                <Dashboard />
                <div>Dashboard</div>
            </Link>
            <Link to="/TimeTables" className="menu-container" id={activeMenuIndex === 3 ? "active" : ""}>
                <TimeTables />
                <div>Time Tables</div>
            </Link>
            <Link to="/TimeTableStructure" className="menu-container" id={activeMenuIndex === 4 ? "active" : ""}>
                <TimeTableStructure />
                <div>Time Table <br />Structure</div>
            </Link>
            <Link to="/Files" className="menu-container" id={activeMenuIndex === 5 ? "active" : ""}>
                <Files />
                <div>Files</div>
            </Link>
            <Link to="/ContactUs" className="menu-container" id={activeMenuIndex === 6 ? "active" : ""}>
                <Contact />
                <div>Contact Us</div>
            </Link>
        </div>
    )
}

export default memo(Menubar)