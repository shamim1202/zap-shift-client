
const HowItWorks = () => {
  const steps = [
    {
      icon: "📝",
      title: "Book Your Shipment",
      desc: "Enter pickup & delivery details and confirm your booking instantly.",
    },
    {
      icon: "🚚",
      title: "Courier Picks Up",
      desc: "A nearby courier collects your parcel safely from your location.",
    },
    {
      icon: "📍",
      title: "Track in Real Time",
      desc: "Follow your shipment with live tracking and instant updates.",
    },
    {
      icon: "🎯",
      title: "Delivered Securely",
      desc: "The parcel is delivered and you receive proof of completion.",
    },
  ];

  return (
    <div className="px-8 md:px-20">
      <h1 className="text-secondary text-2xl md:text-4xl font-bold mb-4 md:mb-8">How It Works</h1>

      <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white p-4 md:p-8 rounded-lg md:rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-secondary md:text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-accent text-sm md:text-base leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
