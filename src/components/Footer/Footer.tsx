// components/Footer.tsx
import { FC } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Semight Fashion Store</p>
          <p className="text-sm">Bringing you the latest trends and styles.</p>
        </div>
        <div className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline">Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Semight Fashion Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
