import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Agnos Patient System
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          Real-time patient registration & staff monitoring
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/patient"
            className="px-10 py-5 bg-blue-600 text-white text-xl font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            Open Patient Form
          </Link>

          <Link
            href="/staff"
            className="px-10 py-5  bg-teal-600 text-white text-xl font-semibold rounded-xl hover:bg-teal-700 transition shadow-lg"
          >
            Open Staff View
          </Link>
        </div>

        <p className="mt-12 text-gray-600">
          Open two browser tabs — type in Patient form → watch live updates in Staff view
        </p>
      </div>
    </div>
  );
}