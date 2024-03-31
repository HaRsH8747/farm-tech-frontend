import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API calls
import LandCard from "./LandCard"; // Make sure the path is correct
import ApplicationCard from "./ApplicationCard";
import { Tabs } from "flowbite-react";
import ChatPage from "../ChatPage";
import LandAgreementForm from "./LandAgreementForm";
import { Button, Modal } from "flowbite-react";
import CropRecommendationForm from "./CropRecommendationForm";
import LandApplicationsAccordion from "./LandApplicationsAccordion";
import FilterTag from "./FilterTag";

const LandApplications = () => {
    const [lands, setLands] = useState([]);
    const [applications, setApplications] = useState([]);
    const [agreements, setAgreements] = useState([]);
    const [selectedLandId, setSelectedLandId] = useState(null);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [farmersInfo, setFarmersInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('lands');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLandDetails, setSelectedLandDetails] = useState(null);
    const [isTagVisible, setIsTagVisible] = useState(false);


    const [formData, setFormData] = useState({
        landOwnerName: '',
        farmerName: '',
        landAddress: '',
        agreementDuration: '',
        durationType: 'years',
        decidedCrop: '',
        facilitiesAndEquipment: '',
        agreementDescription: '',
    });

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
                    // fetchExtendedUsers();
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

    const fetchExtendedUsers = async () => {
        const extendedUsersResponse = await axios.get('http://192.168.2.18:8000/api/extendedusers');
        const extendedUsers = extendedUsersResponse.data;

        // Create a Set of unique farmer IDs from the applications
        const farmerIds = new Set(applications.map(app => app.farmer));

        // Filter extendedUsers to get the userNames of matching farmer IDs
        const farmersInfo = extendedUsers
            .filter(user => farmerIds.has(user.id))
            .map(user => ({ userId: user.id, username: user.user_name }));

        setFarmersInfo(farmersInfo);
    };

    useEffect(() => {
        console.log("Applications updated: ", applications);
        fetchExtendedUsers();
        // Any additional actions you want to take after applications state is updated
    }, [applications]);

    const [landOwnerName, setlandOwnerName] = useState();
    const [farmerName, setFarmerName] = useState();
    const [landAddress, setLandAddress] = useState();
    const [landOwnerId, setLandOwnerId] = useState();
    const [farmerId, setFarmerId] = useState();
    const [landId, setLandId] = useState();

    const fetchFormData = ({ appId, landowner, farmer, landid }) => {

        setLandOwnerId(landowner);
        setFarmerId(farmer);
        setLandId(landid);
        const land_owner_name = storedDBData.user_name;
        setlandOwnerName(land_owner_name)
        const farmer_name = farmersInfo
            .filter(user => user.userId === farmer)
            .map(user => user.username);
        setFarmerName(farmer_name);

        const land_address = lands
            .filter(land => land.id === landid)
            .map(land => `${land.street_address},${land.city},${land.province}`);
        setLandAddress(land_address);
    }

    useEffect(() => {
        // This useEffect runs whenever selectedLandId changes.
        const newFilteredApplications = selectedLandId ? applications.filter(app => app.landid === selectedLandId) : applications;
        setFilteredApplications(newFilteredApplications);
    }, [selectedLandId, applications]); // Depend on both selectedLandId and applications to re-filter when either changes

    const handleLandClick = (land) => {
        setSelectedLandId(land.id);
        setSelectedLandDetails(land); // Save the selected land details to state
        setIsTagVisible(true);
    };

    const handleClear = () => {
        setIsTagVisible(false);
    };

    const handleAccept = (id, landowner, farmer, landid) => {

        fetchFormData({ id, landowner, farmer, landid });
        console.log("Accepted application with ID:", id);
        setOpenModal(true); // Open the modal when "Accept" is clicked
        // Here you can add logic to update the application status, such as making an API call
    };

    const handleIgnore = (appId) => {
        console.log("Ignored application with ID:", appId);
        setOpenModal(false);
        // Similar to handleAccept, add logic for the ignore action here
    };

    return (
        <div>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item active title="Applications">
                    <FilterTag
                        isVisible={isTagVisible}
                        selectedLandId={selectedLandId}
                        onClear={handleClear}
                    />
                    <div className="flex flex-row">
                        <div className="w-3/4 p-4" style={{ minHeight: "100vh" }}>
                            <LandCard lands={lands} onLandClick={handleLandClick} />
                        </div>
                        <div className="w-1/4 p-4 bg-gray-50" style={{ minHeight: "100vh" }}>
                            <div className="space-y-4">
                                <LandApplicationsAccordion applications={filteredApplications}
                                    onAccept={handleAccept} // Assuming each application has a unique ID
                                    onIgnore={handleIgnore}
                                />
                            </div>
                        </div>
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Agreements">
                    <div className="w-full" style={{ minHeight: "100vh" }}>
                        <LandCard lands={agreements} onLandClick={handleLandClick} />
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Chat">
                    <div className="w-full" style={{ minHeight: "100vh" }}>
                        {/* <ChatPage farmersInfo={farmersInfo} /> */}
                        {farmersInfo.length > 0 && <ChatPage farmersInfo={farmersInfo} />}

                    </div>
                </Tabs.Item>

            </Tabs>
            <Modal show={openModal} size="4xl" onClose={handleIgnore} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <LandAgreementForm preFormData={{ landOwnerId, farmerId, landId, landOwnerName, farmerName, landAddress }} />
                    </div>
                </Modal.Body>
            </Modal>



        </div>

    );
};

export default LandApplications;