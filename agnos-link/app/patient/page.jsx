"use client";

import { useState, useEffect, useRef } from "react";

export default function PatientPage() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "English",
    nationality: "",
    emergencyName: "",
    emergencyRelation: "",
    religion: "",
  });

  const [status, setStatus] = useState("idle");
  const [showEmergency, setShowEmergency] = useState(false);
  const timeoutRef = useRef(null);

  const requiredFieldsFilled =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.dateOfBirth &&
    form.gender &&
    form.phoneNumber.trim() &&
    form.email.trim();

  // Real-time broadcast with debounce
  const broadcast = async (data) => {
    try {
      await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {}
  };

  useEffect(() => {
    setStatus("typing");
    broadcast({ ...form, status: "typing", timestamp: Date.now() });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
      broadcast({ ...form, status: "idle", timestamp: Date.now() });
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requiredFieldsFilled) {
      alert("Please fill all required fields (*)");
      return;
    }
    broadcast({ ...form, status: "submitted", timestamp: Date.now() });
    alert("✅ Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-8 text-white">
          <h1 className="text-4xl font-bold text-center">
            Patient Registration Form
          </h1>
        </div>

        <div className="p-8">
          {/* Status Indicator */}
          <div className="mb-8 text-center">
            <span
              className={`inline-block px-6 py-2.5 rounded-full text-sm font-semibold border ${
                status === "typing"
                  ? "bg-teal-100 text-teal-800 border-teal-300"
                  : status === "submitted"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-amber-100 text-amber-800 border-amber-300"
              }`}
            >
              {status === "typing"
                ? "● Actively Filling"
                : status === "submitted"
                  ? "✓ Submitted"
                  : "○ Idle"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & Middle Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
              />
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  name="dateOfBirth"
                  type="date"
                  required
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900 require"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
              />
            </div>

            {/* Preferred Language & Nationality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language
                </label>
                <select
                  name="preferredLanguage"
                  value={form.preferredLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                >
                  <option>English</option>
                  <option>Myanmar</option>
                  <option>Chinese</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                />
              </div>
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Religion (optional)
              </label>
              <input
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={showEmergency}
                  onChange={(e) => setShowEmergency(e.target.checked)}
                />
                Add Emergency Contact (optional)
              </label>

              {showEmergency && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Name
                    </label>
                    <input
                      name="emergencyName"
                      value={form.emergencyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <input
                      name="emergencyRelation"
                      value={form.emergencyRelation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border bg-white border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-gray-900"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!requiredFieldsFilled}
              className="w-full py-4 px-6 bg-teal-600  hover:bg-teal-700 text-white font-semibold rounded-2xl text-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
