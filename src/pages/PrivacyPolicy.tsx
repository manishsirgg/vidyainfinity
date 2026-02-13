import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-6">
        At Vidya Infinity, we value your privacy. This policy explains how we collect, use,
        and protect your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Name, email address, and phone number submitted via forms.</li>
        <li>Information provided during consultation enquiries.</li>
        <li>Website usage data (analytics).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To respond to enquiries.</li>
        <li>To provide educational consultation services.</li>
        <li>To send newsletters (if subscribed).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Protection</h2>
      <p>
        We do not sell or share your personal information with third parties
        except trusted service providers like Mailchimp and Formspree
        necessary for operating our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p>
        If you have any questions, contact us at info@vidyainfinity.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
