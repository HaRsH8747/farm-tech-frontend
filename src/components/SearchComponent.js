import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

function DropdownMenu({ data, fields, fieldNames, onFiltersChange }) {
    // State to hold the unique values for each field
    const [uniqueValues, setUniqueValues] = useState({});
    const [selectedFilters, setSelectedFilters] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field]: [] }), {})
    );

    // Effect to calculate unique values whenever the data or fields props change
    useEffect(() => {
        const newUniqueValues = fields.reduce((acc, field) => {
            const values = Array.from(new Set(data.map(item => item[field])));
            acc[field] = values;
            return acc;
        }, {});
        setUniqueValues(newUniqueValues);
    }, [data, fields]);

    useEffect(() => {
        onFiltersChange(selectedFilters); // Notify parent component of the filter change
    }, [selectedFilters, onFiltersChange]);


    const handleCheckboxChange = (field, value, isChecked) => {
        setSelectedFilters(prev => {
            const updatedFilters = { ...prev };
            if (isChecked) {
                // Add value to the filter
                updatedFilters[field] = [...updatedFilters[field], value];
            } else {
                // Remove value from the filter
                updatedFilters[field] = updatedFilters[field].filter(v => v !== value);
            }
            return updatedFilters;
        });
    };

    // Function to get the visible name for a field
    const getFieldName = (field) => {
        const fieldObj = fieldNames.find(f => f.field === field);
        return fieldObj ? fieldObj.name : field; // Fallback to field if no name is found
    }

    return (
        <>
            <Wrapper>
                <Accordion alwaysOpen={true}>
                    {fields.map(field => (
                        <AccordionPanel key={field}>
                            <AccordionTitle>{getFieldName(field)}</AccordionTitle>
                            <AccordionContent>
                                {uniqueValues[field]?.map((value, index) => (
                                    <div key={`${field}-${index}`}>
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${field}-${index}`}
                                            name={field}
                                            className="checkbox-small"
                                            onChange={e => handleCheckboxChange(field, value, e.target.checked)}
                                        />
                                        <label htmlFor={`checkbox-${field}-${index}`} className="label-large">{value}</label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionPanel>
                    ))}
                </Accordion>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
.checkbox-small {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.label-large {
    font-size: 16px;
}

.accordion-panel .accordion-title {
    font-size: 16px;
    padding: 8px;
}
`;

export default DropdownMenu;