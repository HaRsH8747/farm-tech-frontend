import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            weight: 'bold',
            family: 'Roboto, sans-serif',
            color: '#000000', // Light text for contrast against dark background
          },
        },
      },
      title: {
        display: true,
        text: 'Comparative Crop Revenue Analysis',
        color: '#000000', // Light text for contrast against dark background
        font: {
          size: 18,
          weight: 'bold',
          family: 'Roboto, sans-serif',
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#000000', // Light text for contrast
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(128, 128, 128, 0.25)', // Medium gray lines for the grid with transparency
        },
        ticks: {
          color: '#000000', // Light text for contrast
          font: {
            size: 12,
          },
          callback: function(value) {
            return '$' + value;
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutCubic',
    },
    elements: {
      bar: {
        borderRadius: 20,
        borderSkipped: false,
      },
    },
  };
  

function CropRecommendationForm() {
  const [inputs, setInputs] = useState({
    soilType: "",
    location: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
const inputBaseClasses = "mt-1 block w-full p-3 bg-white-900 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";
  const labelClasses =
    "block text-base font-medium text-gray-800 mb-1 tracking-wide font-roboto";
  const hoverEffect = "hover:shadow-2xl"; // Shadow will increase on hover for a nice effect
  const buttonClasses = "py-3 px-6 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-md shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50";

  const inputWrapperClasses =
    "relative bg-white rounded-2xl shadow-lg p-4 mb-4";

  const [recommendation, setRecommendation] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ["Tomato", "Wheat", "Corn", "Rice", "Soybean"],
    datasets: [
      {
        label: "Potential Revenue ($)",
        data: [1200, 950, 1100, 900, 1050],
        backgroundColor: [
            "rgba(41, 128, 185, 0.6)",   // Blue
            "rgba(46, 204, 113, 0.6)",   // Emerald
            "rgba(241, 196, 15, 0.6)",   // Sunflower
            "rgba(231, 76, 60, 0.6)",    // Alizarin
            "rgba(155, 89, 182, 0.6)",   // Amethyst
          ],
          borderColor: [
            "rgba(41, 128, 185, 1)",
            "rgba(46, 204, 113, 1)",
            "rgba(241, 196, 15, 1)",
            "rgba(231, 76, 60, 1)",
            "rgba(155, 89, 182, 1)",
          ],
        borderWidth: 1,
      },
    ],
  });
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate a backend response with static data
    const staticRecommendation = {
      crop: "Tomato",
      futureGrowth: "15%",
      info: "Tomatoes have a high market demand and can be very profitable under the right conditions.",
    };

    // Update the state with the static data
    setRecommendation(staticRecommendation);
    // Assuming chartData is already set for demonstration purposes
  };

  const selectClasses =
    "block appearance-none w-full bg-transparent bg-clip-padding bg-no-repeat " +
    "border border-gray-300 rounded-2xl shadow-sm px-4 py-3 pr-8 leading-tight focus:outline-none focus:ring " +
    "focus:border-blue-300 cursor-pointer";

  return (
    <div className="min-h-screen bg-sky-300 flex justify-center items-center">
    <div className="container mx-auto p-4  rounded bg-sky-300" style={{ maxWidth: '1200px' }}>
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-700 mt-4 ">
      Smart Crop Yield Forecasting
      </h2>
        <div className="upper-section mb-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Soil Type Dropdown */}
            <div className="mb-4 md:mb-0">
              <label
                htmlFor="soilType"
                className={`${labelClasses} mb-2 block`}
              >
                Soil Type
              </label>
              <div>
                <select
                  id="soilType"
                  name="soilType"
                  value={inputs.soilType}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${hoverEffect}`}
                >
                  <option value="">Select a soil type</option>
                  <option value="sandy">Sandy</option>
                  <option value="clay">Clay</option>
                  <option value="loamy">Loamy</option>
                  <option value="peaty">Peaty</option>
                  <option value="silty">Silty</option>
                  <option value="chalky">Chalky</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label className={`${labelClasses} mb-2`}>Location</label>
              <input
                type="text"
                name="location"
                value={inputs.location}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="Enter your location"
              />
            </div>

            {/* Temperature Field */}
            <div>
              <label className={`${labelClasses} mb-2`}>Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                value={inputs.temperature}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 24"
              />
            </div>

            {/* Humidity Field */}
            <div>
              <label className={`${labelClasses} mb-2`}>Humidity (%)</label>
              <input
                type="number"
                name="humidity"
                value={inputs.humidity}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 60"
              />
            </div>

            {/* pH Field */}
            <div>
              <label className={`${labelClasses} mb-2`}>pH Level</label>
              <input
                type="number"
                name="ph"
                step="0.01"
                value={inputs.ph}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 6.5"
              />
            </div>

            {/* Rainfall Field */}
            <div>
              <label className={`${labelClasses} mb-2`}>Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                value={inputs.rainfall}
                onChange={handleChange}
                className={`${inputBaseClasses} ${hoverEffect}`}
                placeholder="e.g., 200"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
            <button className={buttonClasses}>
  Get Recommendation
</button>
            </div>
          </form>
        </div>
        <div className="lower-section flex flex-col lg:flex-row justify-between gap-4">
          {/* Recommendation Card */}
          <div className="recommendation-card bg-gradient-to-tr from-blue-100 via-blue-50 to-white p-6 border border-blue-200 rounded-2xl shadow-2xl flex-1 transition duration-300 ease-in-out hover:shadow-inner">
            {recommendation ? (
              <>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {recommendation.crop}
                </h3>
                <p className="text-sm font-medium text-gray-700">
                  Future Growth: {recommendation.futureGrowth}
                </p>
                <p className="text-gray-600 mt-2">{recommendation.info}</p>
              </>
            ) : (
              <p className="text-gray-500">No recommendation yet</p>
            )}
          </div>

          {/* Chart Container */}
      {/* Chart Container */}
<div className="chart-container w-full lg:w-1/2" bg-sky-300> {/* Inline style for dark background */}
  <Bar data={chartData} options={options} />
</div>

        </div>
      </div>
    </div>
  );
}

export default CropRecommendationForm;
