import React from 'react';
import { FileText, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import ConexionSinConexion from '../conexion_sin_conexion/ConexionSinConexion';

export default function TerminosDeServicios() {

  const navigate = useNavigate();

  const handleHome = () => navigate("/");

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">

      <ConexionSinConexion />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center px-4 py-2 rounded-lg 
                              transition-colors text-gray-600 
                              hover:bg-gray-200 dark:text-gray-300 
                              dark:hover:bg-gray-800 cursor-pointer"
            onClick={handleHome} >
            <HiHome
              className="text-center text-base md:text-xl lg:text-xl 
                            xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300 cursor-pointer"/>
          </button>
        </div>

        <div className="rounded-2xl shadow-xl p-8 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <FileText size={32} />
              </div>
            </div>
            <h1 className="capitalize py-2 text-4xl 2xl:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <h2 className="text-2xl 2xl:text-2xl font-semibold mb-2"><span translate="no">TuClima360</span></h2>
            <p className="text-base 2xl:text-2xl text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Calendar size={16} />
              Last updated: June 27, 2025
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                1. Acceptance of the Terms
              </h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using <span translate="no">TuClima360, </span> you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-green-500" />
                2. Description of the Service
              </h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <span translate="no">TuClima360 </span> is a web application that provides up-to-date weather information for different locations. Our services include:
              </p>
              <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Real-time weather forecast</li>
                <li>Saved Locations Information</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-500" />
                3. Use of the Service
              </h3>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p className='text-base 2xl:text-2xl'>You agree to:</p>
                <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2">
                  <li>Use the service only for lawful purposes</li>
                  <li>Do not interfere with the operation of the service</li>
                  <li>Do not attempt to access restricted areas</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">4. Data Storage</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                At the moment, <span translate="no"> TuClima360 </span> uses the browser's local storage (LocalStorage) to save your favorite locations. This information is stored only on your device and may be lost if you delete your browser data. We will be implementing user account options for more secure storage in the future.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">5. Limitation of Liability</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                <span translate="no">TuClima360 </span> provides weather information for informational purposes only. We do not guarantee the absolute accuracy of the data and are not responsible for decisions made based on our information. For critical situations, please consult official meteorological sources.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">6. Modifications</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Modifications will take effect immediately upon posting on the website. Your continued use of the service constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">7. Contact</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, you can contact us through official channels. <span translate="no"> TuClima360</span>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-base 2xl:text-2xl text-gray-600 dark:text-gray-400">
              © 2025 <span translate="no"> TuClima360</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}