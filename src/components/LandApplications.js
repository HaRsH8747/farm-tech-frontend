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
    const [agreements, setAgreements] = useState([]);
    const [selectedLandId, setSelectedLandId] = useState(null);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('lands'); // Add state to manage active tab

    const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
    let isLandOwner = false;
    if (storedDBData) {
        isLandOwner = storedDBData.designation === "L";
    }

    const storedUserData = JSON.parse(localStorage.getItem('storedDBData'));
    useEffect(() => {
        const fetchLands = async () => {
            const response = await axios.get("http://192.168.2.18:8000/api/lands");
            if (response.data && storedUserData) {
                const filteredLands = response.data.filter(land => land.land_owner_name === storedUserData.user_name);
                setLands(filteredLands);
                // // Filter JSON B based on the farmer ID matching a variable called userId
                // const filteredFarmerApplications = jsonDataB.filter(item => item.farmer === storedDBData.id);

                // // Filter JSON A based on matching IDs from JSON B
                // const filteredJsonA = jsonDataA.filter(itemA => jsonDataB.some(itemB => itemA.id === itemB.landid));
            } else {
                setLands(response.data);
            }
        };

        const fetchApplications = async () => {
            const response = await axios.get("http://192.168.2.18:8000/api/landapplications");
            if (response.data && storedUserData) {
                if (isLandOwner) {
                    const currentApplications = response.data.filter(application => application.landowner === storedUserData.id);
                    setApplications(currentApplications);
                } else {
                    const currentApplications = response.data.filter(application => application.farmer === storedUserData.id);
                    setApplications(currentApplications);
                }

            } else {
                setApplications(response.data);
            }
            // setApplications(response.data);
        };

        const fetchAgreements = async () => {
            const response = await axios.get("http://192.168.2.18:8000/api/agreements");
            if (response.data && storedUserData) {
                if (isLandOwner) {
                    const currentAgreements = response.data.filter(agreement => agreement.landowner === storedUserData.id);
                    setAgreements(currentAgreements);
                } else {
                    const currentAgreements = response.data.filter(agreement => agreement.farmer === storedUserData.id);
                    setAgreements(currentAgreements);
                }
            } else {
                setAgreements(response.data);
            }
        };

        fetchLands();
        fetchApplications();
        fetchAgreements();
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
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Applications">
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
            </Tabs.Item>
            <Tabs.Item title="Agreements">
                <div className="w-3/4 p-4" style={{ minHeight: "100vh" }}>
                    <LandCard lands={agreements} onLandClick={handleLandClick} />
                </div>
            </Tabs.Item>
        </Tabs>
    );
};

export default LandApplications;