import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <p className="mb-6">
        By accessing and using Vidya Infinity’s website, you agree to comply
        with these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Services</h2>
      <p>
        Vidya Infinity provides educational consultation services.
        We do not guarantee admission, visa approval, or specific outcomes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide accurate information.</li>
        <li>Use the website lawfully.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
      <p>
        We are not responsible for decisions made based on information
        provided on this website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>
      <p>
        We may update these terms at any time without prior notice.
      </p>
    </div>
  );
};

export default TermsOfService;
