/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Privacy Policy | Gradient Generator",
    description: "Privacy Policy for Gradient Generator - Learn how we collect, use, and protect your personal information.",
  };
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p>
                We at CSS Gradient respect the privacy of your personal information and, as such, make every effort to ensure your information is protected and remains private. As the owner and operator of cssgradient.io (the "Website") hereafter referred to in this Privacy Policy as "CSS Gradient", "us", "our" or "we", we have provided this Privacy Policy to explain how we collect, use, share and protect information about the users of our Website (hereafter referred to as "user", "you" or "your"). For the purposes of this Agreement, any use of the terms "CSS Gradient", "us", "our" or "we" includes CSS Gradient, without limitation. We will not use or share your personal information with anyone except as described in this Privacy Policy.
              </p>

              <p>
                This Privacy Policy will inform you about the types of personal data we collect, the purposes for which we use the data, the ways in which the data is handled and your rights with regard to your personal data. Furthermore, this Privacy Policy is intended to satisfy the obligation of transparency under the EU General Data Protection Regulation 2016/679 ("GDPR") and the laws implementing GDPR.
              </p>

              <p>
                For the purpose of this Privacy Policy the Data Controller of personal data is CSS Gradient and our contact details are set out in the Contact section at the end of this Privacy Policy. Data Controller means the natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal information are, or are to be, processed.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">Personal Data</h3>
              <p>
                We may collect personal data that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
              </p>

              <p>
                The personal data we collect may include the following:
              </p>
              <ul>
                <li>Names</li>
                <li>Phone numbers</li>
                <li>Email addresses</li>
                <li>Mailing addresses</li>
                <li>Contact or authentication data</li>
                <li>Billing addresses</li>
                <li>Debit/credit card numbers</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <p>
                When you visit our Website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we may collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect in various ways, including to:
              </p>
              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              
              <h3 className="text-xl font-semibold mb-3">Google Analytics</h3>
              <p>
                CSS Gradient may use third-party services such as Google Analytics to help understand use of the Services. These services typically collect the information sent by your browser as part of a web page request, including Cookies and your IP address. They receive this information and their use of it is governed by their respective privacy policies.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Advertising</h3>
              <p>
                Our Website may use remarketing services, to serve ads on our behalf across the internet on third party websites to previous visitors to our Sites. It could mean that we advertise to previous visitors who haven't completed a task on our site. This could be in the form of an advertisement on the Google search results page or a site in the Google Display Network.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p>
                Under the GDPR, you have the following rights:
              </p>
              <ul>
                <li>The right to access - You have the right to request copies of your personal data</li>
                <li>The right to rectification - You have the right to request that we correct any information you believe is inaccurate</li>
                <li>The right to erasure - You have the right to request that we erase your personal data, under certain conditions</li>
                <li>The right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions</li>
                <li>The right to object to processing - You have the right to object to our processing of your personal data, under certain conditions</li>
                <li>The right to data portability - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Disclosure of Personal Information</h2>
              <p>
                We may share your information in the following situations:
              </p>
              <ul>
                <li>With service providers: We may share your personal information with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf</li>
                <li>For business transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
                <li>With affiliates: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy</li>
                <li>As we deem necessary, in our sole discretion, if we believe that you are violating any applicable law, rule or regulation, or are otherwise interfering with another's rights or property, including, without limitation, our rights or property</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction or damage. However, please note that no method of transmission over the internet, or method of electronic storage, is 100% secure.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: <a href="mailto:bilaltoor1234@gmail.com" className="text-primary hover:underline">bilaltoor1234@gmail.com</a></li>
                <li>On our website: <Link href="/" className="text-primary hover:underline">Gradient Generator</Link></li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Last updated: August 27, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
