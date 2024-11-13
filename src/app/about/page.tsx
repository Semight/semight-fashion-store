"use client";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Semight from "@/assets/semight.jpg"
import Pajoke from "@/assets/pajoke.jpg"
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="px-8 py-16 lg:px-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-secondary">
          About Us
        </h1>
        <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
          Our mission is to provide high-quality, fashionable products for every customer, focusing on style, quality, and value.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl text-center font-semibold mb-4 text-secondary">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          We aim to become a leading e-commerce platform for fashion, offering a seamless shopping experience with the latest trends in apparel for men, women, and kids.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center text-secondary">Meet the Team</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
          Our dedicated team is passionate about providing the best products and customer service. Get to know the people behind our brand!
        </p>

        <div className="flex sm:flex-col justify-center lg:flex-row gap-10">
          {[
              // { name: "Jane Smith", role: "Head of Design", img: Semight },
            { name: "David O. Irefin", role: "Founder & CEO", img: Semight },
            { name: "Peter O. Irefin", role: "Marketing Manager", img: Pajoke },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.img}
                alt={member.name}
                className="w-52 h-52 object-cover rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center text-secondary">Our Values</h2>
        <ul className="text-lg list-disc space-y-2 leading-relaxed max-w-2xl mx-auto">
          <li>Commitment to Quality: Delivering the best products at competitive prices.</li>
          <li>Customer Satisfaction: Ensuring a seamless shopping experience for every customer.</li>
          <li>Innovation: Constantly improving and adapting to the latest trends and technologies.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-center text-secondary">Contact Us</h2>
        <div className="flex flex-col space-y-4 text-lg text-gray-700 max-w-md mx-auto">
          <div className="flex items-center">
            <FaPhone className="text-indigo-500 mr-3" />
            <p>+234-91-6773-5079</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-indigo-500 mr-3" />
            <a 
            href="mailto:davidoluwasemiloorei@gmail.com" 
            className="text-blue-500 hover:underline"
          >
            davidoluwasemiloorei@gmail.com
          </a>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-indigo-500 mr-3" />
            <p>No 2, Pastor Irefin Close Off Ajia Road Ibadan</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
