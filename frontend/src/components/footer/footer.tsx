import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0B3B4A] text-white py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-4 right-8 w-8 h-8 bg-teal-300/20 rounded-full blur-sm" />
      <div className="absolute bottom-8 left-12 w-12 h-12 bg-purple-400/20 rounded-full blur-sm" />
      <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-pink-300/20 rounded-full blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mt-[-3rem]">
              <Image
                src="/Images/logo_white.png"
                alt="logo"
                width={120}
                height={20}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              ducimus voluptatibus neque illo id repellat quisquam? Autem
              expedita earum quae laborum ipsum.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'google', 'instagram', 'linkedin'].map(
                (social) => (
                  <Link key={social} href={`#${social}`}>
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                      <i className={`fab fa-${social}`}></i>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Privacy & TOS */}
          <div>
            <h3 className="text-lg font-semibold mb-6">PRIVACY & TOS</h3>
            <ul className="space-y-4">
              {[
                'Advertiser Agreement',
                'Acceptable Use Policy',
                'Privacy Policy',
                'Technology Privacy',
                'Developer Agreement',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-lg font-semibold mb-6">NAVIGATE</h3>
            <ul className="space-y-4">
              {[
                'Advertisers',
                'Developers',
                'Resources',
                'Company',
                'Connect',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CONTACT US</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <p>Mailing Address: xx00 E. Union Ave</p>
                <p>Suite 1100. Denver, CO 80237</p>
              </li>
              <li>
                <p>+999 90932 627</p>
              </li>
              <li>
                <Link
                  href="mailto:support@yourdomain.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  support@yourdomain.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
