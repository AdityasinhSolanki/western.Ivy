const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 flex justify-center">
      <div className="max-w-5xl w-full space-y-12 font-serif">

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-wide text-black">
            How Can We Help?
          </h1>

          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Got a burning question or just need someone to chat with (we don’t bite)?
            We’re here for all of it! Whether you're curious about our products,
            need help with your order, or just want to tell us how much you love our
            stuff (we’ll take that), our team is on standby to assist.
          </p>

          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Before you reach out, you might want to check our FAQs — we’ve covered
            the most asked questions there. But if your question’s a bit more...
            unique, feel free to hit us up directly!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-50 rounded-2xl p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-semibold text-black">
              Customer Service Hours
            </h3>

            <p className="text-gray-700">
              📞 Call us: <span className="font-medium">9:00 AM – 6:00 PM</span>, every day
            </p>

            <p className="text-gray-700">
              💬 Chat with us: <span className="font-medium">9:00 AM – 6:00 PM</span>, every day
            </p>

            <p className="text-sm text-gray-500 italic mt-4">
              Note: On the occasion of New Year, we are not available on 31st December.
              We will resume our operations on 1st January.
            </p>
          </div>

          <div className="bg-black text-white rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">
              Contact Details
            </h3>

            <p className="text-gray-200">
              📞 08634018989 / 08634018888
            </p>

            <p className="text-gray-200">
              📧 support@westernivy.com
            </p>

            <p className="text-gray-200">
              💬 WhatsApp: Available during working hours
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;
