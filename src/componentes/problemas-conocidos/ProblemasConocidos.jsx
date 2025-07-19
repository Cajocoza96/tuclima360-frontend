import React from 'react';
import { Calendar, AlertTriangle, Wrench } from 'lucide-react';
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import ConexionSinConexion from '../conexion_sin_conexion/ConexionSinConexion';

export default function ProblemasConocidos() {

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
                                <AlertTriangle size={32} />
                            </div>
                        </div>
                        <h1 className="capitalize py-2 text-4xl 2xl:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Known Issues
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
                                <AlertTriangle size={20} className="text-blue-500" />
                                Problem with some special locations
                            </h3>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                When selecting or saving certain locations, the app may automatically redirect to the /error route.
                            </p>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                This occurs with locations that contain hyphens or special characters, such as:
                            </p>
                            <ul className="text-base 2xl:text-2xl list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>St Petersburg St.-Petersburg, Russia</li>
                                <li>Bil-Loca Ilocos, Philippines</li>
                                <li>La Brée-les-Bains - Nouvelle-Aquitaine / France</li>
                            </ul>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                These characters cause conflicts when building dynamic routes.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
                                <Wrench size={20} className="text-green-500" />
                                How can you fix it?
                            </h3>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                You have two options to correct this issue:
                            </p>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                1. Delete all saved locations
                            </p>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Go to the home route and open the hamburger menu. There you will see the “Delete All Weathers” option (available after saving at least one location, whether valid or not).
                            </p>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                2. Manage the failed location
                            </p>
                            <p className="text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Go to the home route and open the hamburger menu, select “Manage Location” The failed location automatically appears as the first selected option so you can delete or replace it.
                            </p>

                        </section>

                        <section>
                            <p className="font-bold text-base 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                We’re actively working to improve support for names with special characters and resolve these issues. Thank you for your patience and understanding!
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