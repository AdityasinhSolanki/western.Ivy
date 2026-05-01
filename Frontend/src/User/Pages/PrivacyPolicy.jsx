import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full font-serif space-y-10">

        <h1 className="text-4xl font-bold tracking-wide">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-relaxed">
          At Western Ivy, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our website.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Information We Collect
            </h3>
            <p>
              We may collect personal information such as your name, email
              address, phone number, shipping address, and payment details when
              you place an order or contact us.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              How We Use Your Information
            </h3>
            <p>
              Your information is used to process orders, provide customer
              support, improve our services, and communicate updates related to
              your purchases.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Data Protection
            </h3>
            <p>
              We implement appropriate security measures to protect your
              personal data against unauthorized access, alteration, or
              disclosure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Cookies
            </h3>
            <p>
              Our website may use cookies to enhance your browsing experience.
              You can choose to disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Third-Party Services
            </h3>
            <p>
              We do not sell or share your personal data with third parties
              except when required to fulfill services such as payment
              processing or shipping.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Your Rights
            </h3>
            <p>
              You have the right to access, update, or request deletion of your
              personal data by contacting our support team.
            </p>
          </div>

        </div>

        <p className="text-sm text-gray-500 pt-6">
          This Privacy Policy may be updated from time to time without prior
          notice.
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;