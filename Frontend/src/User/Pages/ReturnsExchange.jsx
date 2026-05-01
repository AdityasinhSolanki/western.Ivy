import React from "react";

const ReturnsExchange = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full space-y-14 font-serif">

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-black">
            Returns & Exchange Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Because comfort and trust matter.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-4xl">

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-black">
              Eligibility for Returns
            </h2>
            <p>
              Items can be returned or exchanged within <strong>7 days</strong> of delivery.
              The product must be unused, unwashed, and in its original condition
              with all tags intact.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-black">
              Non-Returnable Items
            </h2>
            <p>
              Certain items are not eligible for return or exchange, including:
            </p>
            <p>• Items purchased during sale or clearance</p>
            <p>• Gift cards or promotional items</p>
            <p>• Products showing signs of wear or damage</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-black">
              Exchange Process
            </h2>
            <p>
              If you wish to exchange a product for a different size or color,
              please raise an exchange request through our support team.
              Exchanges are subject to stock availability.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-black">
              Refunds
            </h2>
            <p>
              Once the returned product is received and inspected, refunds will be
              processed within <strong>5–7 business days</strong>. The refund will
              be credited to the original mode of payment.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-black">
              Shipping Costs
            </h2>
            <p>
              Shipping charges are non-refundable. In case of exchanges,
              additional shipping costs may apply depending on the location.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <p className="text-lg font-medium text-black">
            Need help with a return or exchange?
          </p>
          <p className="text-gray-600 mt-2">
            Reach out to our support team — we’ve got you covered.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReturnsExchange;