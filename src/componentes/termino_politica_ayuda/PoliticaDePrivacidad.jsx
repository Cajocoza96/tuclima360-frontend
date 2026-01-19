import React from 'react';
import { Shield, Eye, Database, Lock, UserCheck, Globe } from 'lucide-react';
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import ConexionSinConexion from '../conexion_sin_conexion/ConexionSinConexion';

export default function PoliticaDePrivacidad() {

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
              <div className="p-4 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <Shield size={32} />
              </div>
            </div>
            <h1 className="capitalize py-2 text-4xl 2xl:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <h2 className="text-2xl 2xl:text-3xl font-semibold mb-2"><span translate="no">TuClima360</span></h2>
            <p className="text-base 2xl:text-2xl text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Globe size={16} />
              Last updated: January 19, 2026
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <Eye size={20} className="text-blue-500" />
                Introduction
              </h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                In <span translate="no"> TuClima360, </span> We respect your privacy and are committed to protecting your personal information. This Privacy Policy describes how we collect, use, and protect your information when you use our weather forecast web application.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <Database size={20} className="text-purple-500" />
                Information We Collect
              </h3>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <h4 className="font-semibold text-lg 2xl:text-2xl">Locally Stored Information:</h4>
                <ul className="list-disc pl-6 space-y-2 text-base 2xl:text-2xl">
                  <li><strong>Saved Locations:</strong> Selected city, department and country</li>
                  <li><strong>User Preferences:</strong> Application settings</li>
                  <li><strong>Session data:</strong> Temporary navigation information</li>
                </ul>

                <h4 className="font-semibold text-lg 2xl:text-2xl mt-6">Usage Information:</h4>
                <ul className="list-disc pl-6 space-y-2 text-base 2xl:text-2xl">
                  <li>Browser and device type</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <Lock size={20} className="text-orange-500" />
                Local Storage (LocalStorage)
              </h3>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p className='text-base 2xl:text-2xl'>
                  At the moment, <span translate="no"> TuClima360 </span> uses your browser's local storage to save:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base 2xl:text-2xl">
                  <li>Your favorite locations and custom settings</li>
                  <li>Display Preferences</li>
                </ul>
                <div className="p-4 rounded-lg bg-yellow-50 border-yellow-200 border dark:bg-yellow-900 dark:border-yellow-700">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium text-base 2xl:text-2xl">
                    ⚠️ Important: This information is stored only on your device and will be lost if you clear your browser data or cache.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                <UserCheck size={20} className="text-green-500" />
                Future User Account Features
              </h3>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p className='text-base 2xl:text-2xl'>
                  In future releases, we will be implementing registration and login options that will include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base 2xl:text-2xl">
                  <li><strong>Phone:</strong> For account verification and recovery</li>
                  <li><strong>Email:</strong> For communications and updates</li>
                  <li><strong>Google:</strong> Login via <span translate="no">OAuth</span></li>
                  <li><strong>Facebook:</strong> Login via <span translate="no">OAuth</span></li>
                </ul>
                <p className='text-base 2xl:text-2xl'>
                  When these features become available, we will update this policy to reflect how we handle this additional information.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">How We Use Your Information</h3>
              <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Improve our services and functionalities</li>
                <li>Analyze usage patterns to optimize performance</li>
                <li>Send important service updates</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">Share Information</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent except as follows:
              </p>
              <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
                <li>Reliable weather service providers</li>
                <li>When required by law</li>
                <li>To protect our legal rights</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">Data Security</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">Your Rights</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your information</li>
                <li>Manually delete your browser's local storage data</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">Policy Updates</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy occasionally. We will notify you of major changes by posting the new policy on this page with a revised update date.
              </p>
            </section>

            <section>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-4">Contact</h3>
              <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your information, please feel free to contact us at <span translate="no"> carloscogoza@gmail.com</span>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 00 text-center">
            <p className="text-base 2xl:text-2xl text-gray-600 dark:text-gray-400">
              © 2026 <span translate="no"> TuClima360</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}