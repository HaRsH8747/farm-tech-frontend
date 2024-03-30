import React, { useState } from 'react';
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

function App() {
  const [formData, setFormData] = useState({
    landOwnerName: '',
    farmerName: '',
    landName: '',
    agreementDuration: '',
    durationType: 'years',
    decidedCrop: '',
    facilitiesAndEquipment: '',
    agreementDescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, replace with your actual submission logic
    console.log(formData);
    alert('Agreement Submitted Successfully!');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-5 text-gray-900">Land Agreement Form</h2>

          
        </form>
      </div>
    </div>
  );
}

export default App;