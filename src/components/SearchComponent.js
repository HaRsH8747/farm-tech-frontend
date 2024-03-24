import React, { useState } from 'react';
import { Checkbox } from "@material-tailwind/react";
import styled from 'styled-components';
import { Dropdown, DropdownItem, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';


function DropdownMenu() {

    const markersData = [
        {
            lat: 42.25842463671085,
            lng: -83.0721388933654,
            detail: "This storage has a great capacity for grains.",
            name: "Grain Storage Facility",
            city: "Windsor",
            province: "Ontario",
            storageCapacity: "10,000 tons",
            storageType: "Grain",
            minRentingPeriod: "6 months"
        },
        {
            lat: 42.29121029697507,
            lng: -82.9939575928812,
            detail: "Ideal for perishable goods, with excellent temperature control.",
            name: "Perishable Goods Storage",
            city: "Essex",
            province: "Ontario",
            storageCapacity: "5,000 cubic feet",
            storageType: "Refrigerated",
            minRentingPeriod: "3 months"
        },
        {
            lat: 42.314937088967046,
            lng: -83.03636360168505,
            detail: "Secure and spacious, perfect for equipment or vehicle storage.",
            name: "Equipment Storage Yard",
            city: "LaSalle",
            province: "Ontario",
            storageCapacity: "2,500 square meters",
            storageType: "Outdoor",
            minRentingPeriod: "1 month"
        },
        {
            lat: 42.26910445645066,
            lng: -83.13831716275215,
            detail: "Specialized in liquid storage with high-capacity tanks.",
            name: "Liquid Storage Tanks",
            city: "Amherstburg",
            province: "Ontario",
            storageCapacity: "500,000 liters",
            storageType: "Liquid",
            minRentingPeriod: "12 months"
        },
        {
            lat: 42.33725627853263,
            lng: -83.04930027008057,
            detail: "Equipped for bulk storage with easy transport access.",
            name: "Bulk Storage Warehouse",
            city: "Tecumseh",
            province: "Ontario",
            storageCapacity: "20,000 pallets",
            storageType: "Dry",
            minRentingPeriod: "1 month"
        }
    ];

    const uniqueCities = Array.from(new Set(markersData.map(marker => marker.city)));
    const uniqueStorageTypes = Array.from(new Set(markersData.map(marker => marker.storageType)));

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <Wrapper>
                <Accordion collapseAll>
                    <AccordionPanel>
                        <AccordionTitle>
                            <div className="small-accordion-title">City</div>
                        </AccordionTitle>
                        <AccordionContent>
                            {uniqueCities.map((item, index) => (
                                <div>
                                    <input type="checkbox" id={`checkbox-${index}`} name="dashboard" className="checkbox-small" />
                                    <label htmlFor={`checkbox-${index}`} className="label-large">{item}</label>

                                </div>
                            ))}

                            {/* Add more checkboxes as needed */}
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>Storage Type</AccordionTitle>
                        <AccordionContent>
                            {uniqueStorageTypes.map((item, index) => (
                                <div>
                                    <input type="checkbox" id={`checkbox-${index}`} name="dashboard" className="checkbox-small" />
                                    <label htmlFor={`checkbox-${index}`} className="label-large">{item}</label>
                                </div>
                            ))}
                            {/* Add more checkboxes as needed */}
                        </AccordionContent>
                    </AccordionPanel>
                    {/* Add more accordion panels as needed */}
                </Accordion>

            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
.checkbox-small {
    width: 20px; /* Adjust the width as needed */
    height: 20px; /* Adjust the height as needed */
    margin-right: 8px; /* Adjust the margin-right as needed */
}

.label-large {
    font-size: 16px; /* Adjust the font size as needed */
}
  
  .checkbox-large {
    transform: scale(3.5); /* Adjust the scale factor as needed */
  }

  .accordion-panel .accordion-title.small-accordion-title {
    font-size: 8px; /* Adjust the font size as needed */
    padding: 8px; /* Adjust the padding as needed */
    /* Add any additional styling as needed */
  }
`;


export default DropdownMenu;
