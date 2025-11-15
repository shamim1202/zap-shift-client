import React from "react";

const OurServices = () => {
  const services = [
    {
      icon: "🚚",
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Barishal, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: "📦",
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours",
    },
    {
      icon: "🛒",
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: "🏍️",
      title: "Cash on Home Delivery",
      desc: "We ensure safe handling of fragile and valuable goods with 100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: "🌍",
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: "🔐",
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="bg-secondary p-8 md:p-20 rounded-2xl md:rounded-4xl text-center">
      <div className="md:w-2xl mx-auto mb-4 md:mb-8 md:space-y-3">
        <h2 className="text-2xl md:text-4xl font-bold text-white">Our Services</h2>
        <p className="text-neutral text-sm md:text-base">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-gray-50 hover:bg-primary rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p classname="text-accent text-sm md:text-base leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
