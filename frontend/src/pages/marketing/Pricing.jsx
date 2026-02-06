import MainNavbar from "../../components/MainNavbar";

function Pricing() {
  const plans = [
    {
      title: "Free",
      price: "₹0",
      description: "Basic access to IPO listings & news",
      features: [
        "IPO Listings",
        "Market News",
        "Basic Blog Access",
        "Community Access",
      ],
      tier: "Starter",
    },
    {
      title: "Pro",
      price: "₹499",
      description: "Advanced insights and alerts",
      features: [
        "All Free Features",
        "Price Alerts",
        "Advanced IPO Analytics",
        "Save Favorites",
      ],
      tier: "Most Popular",
    },
    {
      title: "Enterprise",
      price: "₹1299",
      description: "Complete platform for professionals",
      features: [
        "All Pro Features",
        "Priority Support",
        "Custom Reports",
        "Team Access",
      ],
      tier: "",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <MainNavbar />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Choose the Plan That’s Right for You
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Whether you're a beginner investor or a professional trader, we have a
          plan that fits your needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-2xl p-8 shadow-lg transform transition hover:-translate-y-2
                ${plan.tier === "Most Popular"
                  ? "border-indigo-500 shadow-xl"
                  : ""
                }
              `}
            >
              {plan.tier && (
                <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                  {plan.tier}
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>

              <div className="flex items-center gap-2 my-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-600">/month</span>
              </div>

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="text-gray-700 space-y-3 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L8.414 15 5 11.586a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-indigo-600 text-white py-2 font-semibold rounded-lg hover:bg-indigo-700 transition">
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
