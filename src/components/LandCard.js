import React from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const LandCard = ({ lands, onLandClick }) => {
  return (
    <section className="bg-sky-50 p-5 lg:p-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lands.map((land) => (
            <div key={land.Title} onClick={() => onLandClick(land.id)} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <a href="#">
                <img className="w-full h-56 object-cover object-center" src="/img/farm1.jpg" alt={land.Title} />
              </a>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{land.Title}</h5>
                <p className="mb-2 font-normal text-gray-700 text-shadow-default"><span className="font-semibold">City:</span> {land.city},{land.province}</p>
                <p className="mb-2 font-normal text-gray-700 text-shadow-default"><span className="font-semibold">Land Size:</span> {land.land_size} Acre</p>
                <p className="mb-2 font-normal text-gray-700"><span className="font-semibold">Available For:</span> {land.farmland_available_for}</p>
                <p className="mb-4 font-normal text-gray-700"><span className="font-semibold">Soil Type:</span> {land.type_of_soil}</p>
                <Button variant="filled">
                  <Link 
                  to={"/land-detail"}
                  state={{land}}>
                  Read more
                  </Link>
        
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandCard;
