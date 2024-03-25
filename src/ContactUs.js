import React from 'react';
import { EnvelopeIcon} from '@heroicons/react/24/solid';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 p-10">
      <div className="container mx-auto">
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg md:flex md:items-start">

          {/* Left side with image, details, and social icons */}
          <div className="md:w-1/2 mb-6 md:mb-0 p-6">
            <div className="mb-6 flex justify-center md:justify-start">
              <img
                src="img/ContactUs.jpg" // Replace with your actual image path
                alt="FarmTech Team"
                className="w-32 h-32 rounded-full object-cover" // Adjust this for a rounded square image
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Abhishek Patel</h2>
            <p className="text-gray-600 mb-4">Front-End Developer</p>
            <p className="text-gray-600 mb-6">I am available for internship or part-time position as of now. Contact me and let's talk.</p>
            <p className="text-lg font-semibold mb-2">CONNECT WITH ME</p>
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Insert actual URLs */}
              <a href="https://linkedin.com/in/yourprofile" className="text-blue-600">
                <EnvelopeIcon className="h-6 w-6" />
              </a>
              <a href="tel:+1234567890" className="text-green-600">
                <EnvelopeIcon className="h-6 w-6" />
              </a>
              <a href="https://yourwebsite.com" className="text-gray-900">
                <EnvelopeIcon className="h-6 w-6" />
              </a>
              <a href="mailto:your-email@example.com" className="text-teal-600">
                <EnvelopeIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right side with the form */}
          <div className="md:w-1/2 p-6 flex flex-col justify-start">
            <form className="flex flex-col space-y-4">
              <input type="text" placeholder="NAME" className="mb-4 p-4 border rounded-lg" />
              <input type="email" placeholder="EMAIL" className="mb-4 p-4 border rounded-lg" />
              <input type="tel" placeholder="PHONE NUMBER" className="mb-4 p-4 border rounded-lg" />
              <input type="text" placeholder="SUBJECT" className="mb-4 p-4 border rounded-lg" />
              <textarea placeholder="MESSAGE" className="mb-4 p-4 border rounded-lg" rows="4"></textarea>
              <button type="submit" className="bg-teal-500 text-white p-4 rounded-lg shadow-lg hover:bg-teal-600 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;