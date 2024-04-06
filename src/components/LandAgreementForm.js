import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Textarea, Select } from 'flowbite-react';
import axios from 'axios'; // Make sure to import Axios at the top of your file
import { useNavigate } from 'react-router-dom';

// const facilitiesOptions = [
//   { value: 'irrigation', label: 'Irrigation System' },
//   { value: 'tractor', label: 'Tractor' },
//   { value: 'storage', label: 'Storage Unit' },
//   { value: 'harvester', label: 'Harvester' },
//   { value: 'plough', label: 'Plough' },
//   { value: 'seedDrill', label: 'Seed Drill' },
//   { value: 'sprinklerSystem', label: 'Sprinkler System' },
//   { value: 'fertilizerSpreaders', label: 'Fertilizer Spreaders' },
//   // Add more options as needed
// ];

const facilitiesOptions = [
  'Housing',
  'Irrigation capacity',
  'Irrigation equipment',
  'Greenhouse',
  'Fencing',
  'Agricultural machinery',
  'Cold storage',
  'Processing facilities',
  'Other facilities',
  // Add more options as needed
];

const cropList = [
  'Field Crops (grains or beans)',
  'Flowers',
  'Fruit/berries/grapes',
  'Hay or forage crops',
  'Herbs',
  'Livestock',
  'Seeds, seedlings or nursery stock',
  'Vegetables',
  'Other products',
  // Add more options as needed
];

function LandAgreementForm(props) {

  const { landOwnerId, farmerId, landId, landOwnerName, farmerName, landAddress } = props.preFormData;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    landOwnerName: landOwnerName,
    farmerName: farmerName,
    landAddress: landAddress,
    agreementDuration: '',
    durationType: 'years',
    decidedCrop: [0],
    facilitiesAndEquipment: '',
    agreementDescription: '',
  });

  // setFormData({
  //   ...props.preFormData
  // })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'decidedCrop') {
      // const selectedOptionIndex = cropList.findIndex(option => option.value === value);
      const selectedOptionIndex = cropList.map((selectedValue, index) => {
        if (value === selectedValue) {
          return index;
        }
      });
      setFormData({
        ...formData,
        product_planning_to_produce: [selectedOptionIndex], // Store the index in the desired array
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleInputChangeProduct = (e) => {
    const { name, value, type, checked } = e.target;

  };

  const updateLandApplicationStatus = async (url, status) => {
    const data = {
      status: status
    };
    try {
      const response = await axios.patch(url, data);
      console.log(response.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform formData to the API's expected format
    const apiPayload = {
      landowner: landOwnerId,
      farmer: farmerId,
      landid: landId, // Assuming landAddress is the ID, adjust as necessary
      agreement_duration: formData.agreementDuration + ' ' + formData.durationType, // Combining duration and type
      product_planning_to_produce: [1], // Assuming a single crop, adjust as necessary
      facility_and_equipment_agreed_to: formData.facilitiesAndEquipment,
      agreement_description: formData.agreementDescription,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/agreements", apiPayload);
      updateLandApplicationStatus(`http://127.0.0.1:8000/api/landapplications/${landId}`, 'Accepted');
      console.log(response.data); // For debugging, remove or adjust as necessary
      alert('Agreement Submitted Successfully!');
      navigate('/landapplications')

    } catch (error) {
      console.error('Failed to submit agreement:', error);
      alert('Failed to submit agreement. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="landOwnerName">Land Owner Name</Label>
            <TextInput
              id="landOwnerName"
              name="landOwnerName"
              value={formData.landOwnerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="farmerName">Farmer Name</Label>
            <TextInput
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="landAddress">Land Address</Label>
            <TextInput
              id="landAddress"
              name="landAddress"
              value={formData.landAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex gap-4 items-center">
            <Label htmlFor="agreementDuration">Agreement Duration</Label>
            <TextInput
              id="agreementDuration"
              name="agreementDuration"
              type="number"
              min="1"
              value={formData.agreementDuration}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2 items-center">
              <Checkbox
                id="years"
                name="durationType"
                value="years"
                checked={formData.durationType === 'years'}
                onChange={handleInputChange}
              />
              <Label htmlFor="years">Years</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="months"
                name="durationType"
                value="months"
                checked={formData.durationType === 'months'}
                onChange={handleInputChange}
              />
              <Label htmlFor="months">Months</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="decidedCrop">Decided Crop</Label>
            <Select id="decidedCrop" name="decidedCrop" onChange={handleInputChange} required>
              <option>Select Decided Crop</option>
              {cropList.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="facilitiesAndEquipment">Facilities and Equipment</Label>
            <Select id="facilitiesAndEquipment" name="facilitiesAndEquipment" value={formData.facilitiesAndEquipment} onChange={handleInputChange} required>
              <option>Select Facilities/Equipment</option>
              {facilitiesOptions.map((option) => (
                <option>{option}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="agreementDescription">Agreement Description</Label>
            <Textarea
              id="agreementDescription"
              name="agreementDescription"
              value={formData.agreementDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type="submit">
            Submit Agreement
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LandAgreementForm;
