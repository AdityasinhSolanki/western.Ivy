import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full font-serif space-y-10">

        <h1 className="text-4xl font-bold tracking-wide">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Welcome to Western Ivy. By accessing or using our website, you agree
          to comply with and be bound by the following terms and conditions.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Use of Website
            </h3>
            <p>
              You agree to use this website only for lawful purposes and in a
              manner that does not infringe the rights of others.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Product Information
            </h3>
            <p>
              We strive to display accurate product information. However,
              Western Ivy does not guarantee that all descriptions or prices are
              error-free.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Orders & Payments
            </h3>
            <p>
              All orders are subject to acceptance and availability. Prices may
              change without prior notice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Intellectual Property
            </h3>
            <p>
              All content on this website including logos, designs, and text is
              the property of Western Ivy and may not be reused without
              permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Limitation of Liability
            </h3>
            <p>
              Western Ivy shall not be liable for any indirect or consequential
              damages arising from the use of this website.
            </p>
          </div>

        </div>

        <p className="text-sm text-gray-500 pt-6">
          These terms may be updated at any time without notice.
        </p>

      </div>
    </div>
  );
};

export default TermsConditions;