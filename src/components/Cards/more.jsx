import { useState } from "react";
import { FaCar, FaGasPump, FaCogs, FaUsers, FaSuitcase, FaSnowflake, FaMapMarkedAlt, FaBluetooth, FaDoorOpen, FaTachometerAlt } from "react-icons/fa";

const VehicleCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const vehicleData = {
    name: "2024 Mercedes-Benz S-Class",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1622200294023-4d2c3fe76ecd",
    specifications: {
      fuelType: "Hybrid",
      transmission: "Automatic",
      seatingCapacity: 5,
      luggageCapacity: "520L"
    },
    rental: {
      pricePerDay: 299,
      minDays: 1,
      maxDays: 30,
      discount: "15% off on weekly rentals",
      conditions: "Valid driver's license and credit card required"
    },
    features: {
      airConditioning: true,
      gps: true,
      bluetooth: true,
      doors: 4,
      mileage: "20 km/L"
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={vehicleData.image}
            alt={vehicleData.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf";
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-2xl font-bold text-white">{vehicleData.name}</h2>
            <p className="text-white/90 flex items-center gap-2">
              <FaCar /> {vehicleData.type}
            </p>
          </div>
        </div>

        {/* Main Info Section */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <InfoItem icon={<FaGasPump />} label="Fuel" value={vehicleData.specifications.fuelType} />
            <InfoItem icon={<FaCogs />} label="Transmission" value={vehicleData.specifications.transmission} />
            <InfoItem icon={<FaUsers />} label="Seats" value={vehicleData.specifications.seatingCapacity} />
            <InfoItem icon={<FaSuitcase />} label="Luggage" value={vehicleData.specifications.luggageCapacity} />
          </div>

          {/* Rental Price Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Rental Price</p>
                <p className="text-3xl font-bold text-blue-600">${vehicleData.rental.pricePerDay}</p>
                <p className="text-sm text-gray-500">per day</p>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-semibold">{vehicleData.rental.discount}</p>
                <button
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleExpandClick}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Features Section */}
          <div className={`transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
              <Feature icon={<FaSnowflake />} label="Air Conditioning" available={vehicleData.features.airConditioning} />
              <Feature icon={<FaMapMarkedAlt />} label="GPS Navigation" available={vehicleData.features.gps} />
              <Feature icon={<FaBluetooth />} label="Bluetooth" available={vehicleData.features.bluetooth} />
              <Feature icon={<FaDoorOpen />} label="Doors" value={vehicleData.features.doors} />
              <Feature icon={<FaTachometerAlt />} label="Mileage" value={vehicleData.features.mileage} />
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Rental Conditions</h3>
              <p className="text-gray-600">{vehicleData.rental.conditions}</p>
            </div>
          </div>

          <button
            className="w-full mt-4 text-blue-600 hover:text-blue-700 transition-colors"
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Show Less" : "Show More Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-blue-600">{icon}</span>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const Feature = ({ icon, label, available, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-blue-600">{icon}</span>
    <div>
      <p className="text-gray-600">{label}</p>
      {available !== undefined ? (
        <span className={available ? "text-green-500" : "text-red-500"}>
          {available ? "Available" : "Not Available"}
        </span>
      ) : (
        <span className="font-semibold">{value}</span>
      )}
    </div>
  </div>
);

export default VehicleCard;