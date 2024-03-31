import React, { useState } from 'react';
import {
    Button,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LandDetail = () => {
    const navigate = useNavigate();
    const images = ['/img/farm3.jpg', '/img/farm4.jpg', '/img/farm5.jpg'];
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(images[selectedImageIndex]);
    const location = useLocation();
    // console.log("land",location.state );
    const { land } = location.state; // Fallback to an empty object if state is undefined

    const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
    const isLandOwner = storedDBData.designation == "L" ? true : false;


    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        setSelectedImage(images[index]);
    };

    // Image navigation functions...

    return (
        <>
            <div className="container mx-auto my-12 p-4 flex flex-wrap lg:flex-nowrap">
                <div className="flex flex-col w-full lg:w-1/2">
                    {/* Main Product Image */}
                    <div className="rounded-lg shadow-md mb-4 overflow-hidden">
                        <img
                            src={selectedImage}
                            alt={`Product Image ${selectedImageIndex}`}
                            className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex justify-center gap-2">
                        {images.map((image, index) => (
                            <button
                                key={image}
                                className={`rounded - lg overflow-hidden border-2 ${index === selectedImageIndex ? 'border-green-500' : 'border-transparent'}`}
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <img src={image} alt={`Thumbnail ${index}`} className="w-20 h-20 object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 lg:pl-12">
                    <div className="flex flex-col items-start space-y-4">
                        {/* Landlord Profile Picture */}
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
                            <img src="/img/vatsal.jpg" alt="Landlord" className="w-full h-full object-cover" />
                        </div>
                        {/* Farm Details */}
                        <div>
                            <h1 className="text-3xl font-bold text-green-600">{land.land_owner_name}</h1>
                            <p className="text-lg">{land.land_owner_name}</p>
                            <ul className="list-none space-y-1 text-lg">
                                <li><strong>Description:</strong> Expansive vineyard with mature grapes.</li>
                                <li><strong>Size:</strong>{land.land_size}</li>
                                <li><strong>Address:</strong>{land.street_address + land.city + land.province}</li>
                                <li><strong>Available For:</strong>{land.farmland_available_for}</li>
                                <li><strong>Soil Type:</strong>{land.type_of_soil}</li>
                                <li><strong>Current Use:</strong>{land.and_currently_being_used_for}</li>
                                <li><strong>Facility & Equipment:</strong>{land.facility_and_equipment}</li>
                                <li><strong>Experience Needed:</strong>{land.experience_needed}</li>
                            </ul>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {!isLandOwner && <Button
                                color="black"
                                buttonType="filled"
                                size="regular"
                                rounded={true}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                            >
                                Application Request
                            </Button>}

                            {!isLandOwner &&
                                <Button
                                    color="black"
                                    buttonType="filled"
                                    size="regular"
                                    rounded={true}
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    onClick={navigate("/chatpage")}>
                                    Message
                                </Button>
                            }

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LandDetail;