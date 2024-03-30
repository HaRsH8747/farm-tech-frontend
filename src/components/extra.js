import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API calls
import LandCard from "./LandCard"; // Make sure the path is correct
import ApplicationCard from "./ApplicationCard";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const LandApplications = () => {
    const [lands, setLands] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedLandId, setSelectedLandId] = useState(null);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('lands'); // Add state to manage active tab

    const storedUserData = JSON.parse(localStorage.getItem('storedDBData'));
    useEffect(() => {
        const fetchLands = async () => {
            const response = await axios.get("http://192.168.2.18:8000/api/lands");
            if (response.data && storedUserData) {
                const filteredLands = response.data.filter(land => land.land_owner_name === storedUserData.user_name);
                setLands(filteredLands);
            } else {
                setLands(response.data);
            }
        };

        const fetchApplications = async () => {
            const response = await axios.get("http://192.168.2.18:8000/api/landapplications");
            if (response.data && storedUserData) {
                const currentApplications = response.data.filter(application => application.landowner === storedUserData.id);
                setApplications(currentApplications);
            } else {
                setApplications(response.data);
            }
            // setApplications(response.data);
        };

        fetchLands();
        fetchApplications();
    }, []);

    useEffect(() => {
        // This useEffect runs whenever selectedLandId changes.
        const newFilteredApplications = selectedLandId ? applications.filter(app => app.landid === selectedLandId) : applications;
        setFilteredApplications(newFilteredApplications);
    }, [selectedLandId, applications]); // Depend on both selectedLandId and applications to re-filter when either changes

    const handleLandClick = (id) => {
        setSelectedLandId(id);
    };

    return (

        <div className="flex flex-row">
            <div className="w-3/4 p-4" style={{ minHeight: "100vh" }}>
                <LandCard lands={lands} onLandClick={handleLandClick} />
            </div>
            <div className="w-1/4 p-4 bg-gray-50" style={{ minHeight: "100vh" }}>
                <div className="space-y-4">
                    {filteredApplications.map((app, index) => (
                        <ApplicationCard
                            key={index}
                            senderName={app.senderName} // Make sure to adjust according to your actual API response structure
                            newsletterName={app.newsletterName} // Adjust accordingly
                            onAccept={() => console.log("Accepted!")}
                            onIgnore={() => console.log("Ignored!")}
                        />
                    ))}
                </div>
            </div>
        </div>

        // <Tabs aria-label="Default tabs" style="default">
        //     <Tabs.Item active title="Profile" icon={HiUserCircle}>
        //         This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //         control the content visibility and styling.
        //     </Tabs.Item>
        //     <Tabs.Item title="Dashboard" icon={MdDashboard}>
        //         This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //         control the content visibility and styling.
        //     </Tabs.Item>
        //     <Tabs.Item title="Settings" icon={HiAdjustments}>
        //         This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //         control the content visibility and styling.
        //     </Tabs.Item>
        //     <Tabs.Item title="Contacts" icon={HiClipboardList}>
        //         This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
        //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //         control the content visibility and styling.
        //     </Tabs.Item>
        //     <Tabs.Item disabled title="Disabled">
        //         Disabled content
        //     </Tabs.Item>
        // </Tabs>
    );
};

export default LandApplications;