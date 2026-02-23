'use client';

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function StaffPage() {
  const [data, setData] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
    });

    const channel = pusher.subscribe('patient-channel');

    channel.bind('form-update', (payload) => {
      console.log('Received update:', payload); // ← debug log (remove later)
      setData(payload);
    });

    // Connection status
    pusher.connection.bind('connected', () => {
      setIsConnected(true);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('patient-channel');
      pusher.disconnect();
    };
  }, []);

  const orDash = (value) => value || '—';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Staff Monitoring Dashboard
          </h1>
        </div>

        <div className="p-6 md:p-8">
          {/* Status Indicator */}
          <div className="mb-8 text-center">
            {data.status ? (
              <span
                className={`inline-block px-6 py-2.5 rounded-full text-sm md:text-base font-semibold border transition-colors ${
                  data.status === 'typing'
                    ? 'bg-teal-100 text-teal-800 border-teal-300'
                    : data.status === 'submitted'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {data.status === 'typing'
                  ? '● Patient is actively filling'
                  : data.status === 'submitted'
                  ? '✓ Form submitted'
                  : '○ No activity detected'}
              </span>
            ) : (
              <span className="inline-block px-6 py-2.5 rounded-full text-sm md:text-base font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                Waiting for patient to start...
              </span>
            )}
          </div>

          {Object.keys(data).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No patient data received yet.
              <br />
              <small className="text-sm">(Make sure patient is typing in the other tab)</small>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-teal-800 border-b border-teal-100 pb-2">
                  Personal Information
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
                  {[
                    ['First Name', data.firstName],
                    ['Middle Name', data.middleName],
                    ['Last Name', data.lastName],
                    ['Date of Birth', data.dateOfBirth],
                    ['Gender', data.gender],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-medium text-gray-900">{orDash(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Other */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-teal-800 border-b border-teal-100 pb-2">
                  Contact & Additional Info
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
                  {[
                    ['Phone', data.phoneNumber],
                    ['Email', data.email],
                    ['Address', data.address],
                    ['Preferred Language', data.preferredLanguage],
                    ['Nationality', data.nationality],
                    ['Religion', data.religion],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-medium text-gray-900">{orDash(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {(data.emergencyName || data.emergencyRelation) && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-teal-800 mb-4 border-b border-teal-100 pb-2">
                Emergency Contact
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium text-gray-900">{orDash(data.emergencyName)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relationship</span>
                  <span className="font-medium text-gray-900">{orDash(data.emergencyRelation)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}