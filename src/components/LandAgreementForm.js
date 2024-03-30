import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Textarea, Select } from 'flowbite-react';

const facilitiesOptions = [
  { value: 'irrigation', label: 'Irrigation System' },
  { value: 'tractor', label: 'Tractor' },
  { value: 'storage', label: 'Storage Unit' },
  { value: 'harvester', label: 'Harvester' },
  { value: 'plough', label: 'Plough' },
  { value: 'seedDrill', label: 'Seed Drill' },
  { value: 'sprinklerSystem', label: 'Sprinkler System' },
  { value: 'fertilizerSpreaders', label: 'Fertilizer Spreaders' },
  // Add more options as needed
];

function LandAgreementForm(props) {

  const { landOwnerName, farmerName, landAddress } = props.preFormData;

  const [formData, setFormData] = useState({
    landOwnerName: landOwnerName,
    farmerName: farmerName,
    landAddress: landAddress,
    agreementDuration: '',
    durationType: 'years',
    decidedCrop: '',
    facilitiesAndEquipment: '',
    agreementDescription: '',
  });

  // setFormData({
  //   ...props.preFormData
  // })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Agreement Submitted Successfully!');
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-5 text-gray-900">Land Agreement Form</h2>
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
            <TextInput
              id="decidedCrop"
              name="decidedCrop"
              value={formData.decidedCrop}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="facilitiesAndEquipment">Facilities and Equipment</Label>
            <Select id="facilitiesAndEquipment" name="facilitiesAndEquipment" value={formData.facilitiesAndEquipment} onChange={handleInputChange} required>
              <option>Select Facilities/Equipment</option>
              {facilitiesOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
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
