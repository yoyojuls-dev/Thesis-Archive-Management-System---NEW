import Link from "next/link";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <Container>
        <div className="py-8">
          {/* Main Content - Left and Right Layout */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Left Side - Brand */}
            <div className="flex items-center gap-4">
              <img 
                src="/images/department-logo.png" 
                alt="Department Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-white font-semibold">Thesis Archive</h3>
                <p className="text-xs text-gray-500">Computer Studies Department</p>
              </div>
            </div>

            {/* Right Side - University & Address */}
            <div className="flex items-center gap-4 text-right md:text-right">
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  Technological University of the Philippines – Manila
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  San Marcelino St, Ayala Blvd, Ermita, Manila, 1000
                </p>
              </div>
              <img 
                src="/images/tup-logo.png" 
                alt="TUP Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Bottom Copyright - Centered */}
          <div className="border-t border-gray-800 mt-6 pt-4 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Thesis Archive Management System. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;