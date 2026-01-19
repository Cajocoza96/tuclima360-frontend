import React, { useState } from 'react';
import { HelpCircle, User, Database, AlertCircle, CheckCircle, Clock, Smartphone, Mail, Chrome } from 'lucide-react';
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import Toast from '../toast/Toast';
import ConexionSinConexion from '../conexion_sin_conexion/ConexionSinConexion';

export default function Ayuda() {
  const [showToast4, setShowToast4] = useState(false);

  const handleToast = () => {
    setShowToast4(true);
    setTimeout(() => setShowToast4(false), 2500);
  }

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navigate = useNavigate();

  const handleHome = () => navigate("/");

  const faqItems = [
    {
      id: 'guest',
      question: 'How do I log in as a guest?',
      answer: 'Simply click "Continue as Guest" under Log In. You do not need to register to use TuClima360 is basic features.',
      icon: <User size={20} className="text-blue-500" />
    },
    {
      id: 'data-storage',
      question: 'Where are my locations saved?',
      answer: 'Your locations are saved in your browser is LocalStorage. This means they are stored only on your device and not on our servers.',
      icon: <Database size={20} className="text-green-500" />
    },
    {
      id: 'data-loss',
      question: 'Why did I lose my saved locations?',
      answer: 'If you clear your browser is cache, cookies, or data, your saved locations will be lost. This can also happen if you use incognito mode or change devices.',
      icon: <AlertCircle size={20} className="text-red-500" />
    },
    {
      id: 'future-accounts',
      question: 'When will account registration be available?',
      answer: 'We are working on implementing registration options using phone number, email, Google, and Facebook. We will announce when it is available.',
      icon: <Clock size={20} className="text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">

      <ConexionSinConexion />

      <Toast show4={showToast4} message4="Not available" />

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
                <HelpCircle size={32} />
              </div>
            </div>
            <h1 className="capitalize py-2 text-4xl 2xl:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Login Help
            </h1>
            <h2 className="text-2xl 2xl:text-4xl font-semibold mb-2"><span translate="no">TuClima360</span></h2>
            <p className="text-base 2xl:text-2xl text-gray-600 dark:text-gray-400">
              Everything you need to know about accessing your account
            </p>
          </div>

          <div className="mb-8 p-6 rounded-xl bg-blue-50 border-blue-200 border dark:bg-blue-900 dark:border-blue-700">
            <h3 className="text-xl 2xl:text-3xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle size={24} className="text-blue-500" />
              Current State of the System
            </h3>
            <div className="text-blue-800 dark:text-blue-200 space-y-2 overflow-hidden">
              <p className="flex flex-wrap items-center gap-2 text-base 2xl:text-2xl">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Available:</strong> Guest account access
              </p>
              <p className="flex flex-wrap items-center gap-2 text-base 2xl:text-2xl">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <strong>In development:</strong> Registration with phone, email, Google y Facebook
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6 flex items-center gap-2">
              <User size={24} className="text-green-500" />
              How to Login as a Guest
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <h4 className="font-semibold text-lg 2xl:text-3xl mb-3">Step 1: Go to Login</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-base 2xl:text-2xl">
                  Click "Continue as Guest."
                </p>
                <div className="text-base 2xl:text-2xl p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  ✅ No registration required
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <h4 className="font-semibold text-lg 2xl:text-3xl mb-3">Step 2: Immediate Use</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-base 2xl:text-2xl">
                  You'll have full access to all weather forecast features.
                </p>
                <div className="text-base 2xl:text-2xl p-3 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  🌤️ Full features available
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6 flex items-center gap-2">
              <Database size={24} className="text-purple-500" />
              Data Storage (LocalStorage)
            </h3>

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 mb-6">
              <h4 className="font-semibold text-lg 2xl:text-2xl mb-4">What is LocalStorage?</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-base 2xl:text-2xl">
                It's a technology that allows your browser to store information locally on your device. It's like a "notebook" that only your browser can read.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <h5 className="font-medium mb-2 text-base 2xl:text-2xl">✅ Advantages</h5>
                  <ul className="text-sm 2xl:text-2xl space-y-1">
                    <li>• Quick access to your data</li>
                    <li>• No internet required for saved locations</li>
                    <li>• Total privacy (only on your device)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <h5 className="font-medium mb-2 text-base 2xl:text-2xl">⚠️ Limitations</h5>
                  <ul className="text-sm 2xl:text-2xl space-y-1">
                    <li>• It can be lost when cleaning the browser</li>
                    <li>• Doesn't sync between devices</li>
                    <li>• Only available in this browser</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border bg-orange-50 border-orange-200 dark:bg-orange-900 dark:border-orange-700">
              <h4 className="font-semibold text-lg 2xl:text-2xl mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-orange-500" />
                What information is stored?
              </h4>
              <ul className="text-orange-800 dark:text-orange-200 space-y-2">
                <li className="flex items-start gap-2 text-base 2xl:text-2xl">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Favorite locations:</strong> City, department and country</span>
                </li>
                <li className="flex items-start gap-2 text-base 2xl:text-2xl">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Settings:</strong> Display Preferences</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.id} className="rounded-xl border transition-all bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`cursor-pointer w-full p-6 text-left flex items-center justify-between hover:opacity-80 transition-opacity`}
                  >
                    <div className="flex items-center text-base 2xl:text-2xl gap-3">
                      {item.icon}
                      <span className="font-medium">{item.question}</span>
                    </div>
                    <span className={`transform transition-transform ${expandedSection === item.id ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>
                  {expandedSection === item.id && (
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 text-base 2xl:text-2xl">
                      <p className="leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6 flex items-center gap-2">
              <Chrome size={24} className="text-blue-500" />
              Tips for Preserving Your Data
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-base 2xl:text-2xl">
                  <CheckCircle size={20} className="text-green-500" />
                  Recommended ✅
                </h4>
                <ul className="text-green-700 dark:text-green-200 space-y-2 text-sm 2xl:text-2xl">
                  <li>• Always use the same browser</li>
                  <li>• Avoid incognito mode</li>
                  <li>• Do not delete browser data</li>
                </ul>
              </div>

              <div className="p-6 rounded-x bg-yellow-50 dark:bg-yellow-900">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-base 2xl:text-2xl">
                  <AlertCircle size={20} className="text-yellow-500" />
                  Be careful ⚠️
                </h4>
                <ul className="text-yellow-700 dark:text-yellow-200 space-y-2 text-sm 2xl:text-2xl">
                  <li>• Clear cache/cookies</li>
                  <li>• Use different browsers</li>
                  <li>• Change device</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-base 2xl:text-2xl">
                  <AlertCircle size={20} className="text-red-500" />
                  Avoid Doing ❌
                </h4>
                <ul className="text-red-700 dark:text-red-200 space-y-2 text-sm 2xl:text-2xl">
                  <li>• Reset the browser</li>
                  <li>• Use cleaning software</li>
                  <li>• Uninstall the browser</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6 flex items-center gap-2">
              <Clock size={24} className="text-purple-500" />
              Upcoming Performances
            </h3>

            <div className="p-6 rounded-xl bg-purple-50 border-purple-200 dark:bg-purple-900 dark:border-purple-700 border">
              <p className="text-purple-800 dark:text-purple-200 mb-6 text-base 2xl:text-2xl">
                We're working to implement user account options that will allow you to:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 text-base 2xl:text-2xl">Registration Methods:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-green-500" />
                      <span className="text-purple-800 dark:text-purple-200 text-base 2xl:text-2xl">Phone number</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-blue-500" />
                      <span className="text-purple-800 dark:text-purple-200 text-base 2xl:text-2xl">Email</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl 2xl:text-2xl">🔴</span>
                      <span className="text-purple-800 dark:text-purple-200 text-base 2xl:text-2xl">Google</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl 2xl:text-2xl">📘</span>
                      <span className="text-purple-800 dark:text-purple-200 text-base 2xl:text-2xl">Facebook</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-base 2xl:text-xl">Benefits:</h4>
                  <ul className="text-purple-800 dark:text-purple-200 space-y-2 text-base 2xl:text-2xl">
                    <li>✨ Synchronization between devices</li>
                    <li>💾 Secure cloud backup</li>
                    <li>🔔 Custom notifications</li>
                    <li>📊 Complete history</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl 2xl:text-3xl font-semibold mb-6">Troubleshooting</h3>

            <div className="space-y-4">
              <details className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <summary className="font-medium cursor-pointer mb-4 text-base 2xl:text-2xl">
                  🔧 I lost all my saved locations
                </summary>
                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                  <p className='text-base 2xl:text-2xl'><strong>Possible causes:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-base 2xl:text-2xl">
                    <li>Browser data deleted</li>
                    <li>Incognito mode was used</li>
                    <li>You changed your browser or device</li>
                  </ul>
                  <p className="mt-4 text-base 2xl:text-2xl"><strong>Solution:</strong> Please add your favorite locations again. User accounts will address this issue in the future.</p>
                </div>
              </details>

              <details className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <summary className="font-medium cursor-pointer mb-4 text-base 2xl:text-2xl">
                  🌐 I can't access the app
                </summary>
                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                  <p><strong className="text-base 2xl:text-2xl">Steps to follow:</strong></p>
                  <ol className="list-decimal pl-6 space-y-1 text-base 2xl:text-2xl">
                    <li>Check your internet connection</li>
                    <li>Refresh the page (Ctrl+F5 or Cmd+R)</li>
                    <li>Try another browser</li>
                    <li>Temporarily disable browser extensions</li>
                  </ol>
                </div>
              </details>

              <details className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
                <summary className="font-medium cursor-pointer mb-4 text-base 2xl:text-2xl">
                  📱 Problems on mobile devices
                </summary>
                <div className="text-gray-600 dark:text-gray-300 space-y-2 text-base 2xl:text-2xl">
                  <p className='text-base 2xl:text-2xl'><strong>Recommendations:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use the device's main browser</li>
                    <li>Avoid browsers in private mode</li>
                    <li>Make sure you have storage space</li>
                    <li>Update your browser to the latest version</li>
                  </ul>
                </div>
              </details>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-6">Need More Help?</h3>
            <div className="p-6 rounded-xl bg-blue-50 border-blue-200 border dark:bg-blue-900 dark:border-blue-700 text-center">
              <p className="text-blue-800 dark:text-blue-200 mb-4 text-base 2xl:text-2xl">
                If you have any additional questions or technical issues, please don't hesitate to contact us.
              </p>
              <button onClick={handleToast} className="text-base 2xl:text-2xl px-6 py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white cursor-pointer">
                Contact Support
              </button>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-base 2xl:text-2xl">
              © 2026 <span translate="no"> TuClima360</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}