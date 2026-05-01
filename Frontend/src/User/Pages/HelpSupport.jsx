import React from "react";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full font-serif space-y-10">

        <h1 className="text-4xl font-bold tracking-wide">
          Help & Support
        </h1>

        <p className="text-gray-700 leading-relaxed max-w-3xl">
          Need assistance? We’re here to help you with orders, returns, account
          issues, or anything else related to Western Ivy.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold">Customer Support</h3>
            <p className="text-gray-700">📞 9:00 AM – 6:00 PM (Daily)</p>
            <p className="text-gray-700">📧 support@westernivy.com</p>
          </div>

          <div className="bg-black text-white p-8 rounded-2xl space-y-4">
            <h3 className="text-xl font-semibold">Quick Help</h3>
            <p className="text-gray-300">• Order tracking</p>
            <p className="text-gray-300">• Returns & exchanges</p>
            <p className="text-gray-300">• Account & login issues</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HelpSupport;