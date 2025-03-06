"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Ensure you construct the URL correctly (e.g., no extraneous contactId if creating a new record)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`, // Use the correct endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Ensure formData has valid values
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Send Us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1"
            placeholder="Your Message"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "error" && <p className="text-red-500">{error}</p>}
        {status === "success" && <p>Message sent successfully!</p>}
      </form>
    </div>
  );
};

interface ContactCardProps {
  title: string;
  details: string[];
  icon: React.ReactNode;
  gradient: string;
  index: number;
}

function ContactCard({
  title,
  details,
  icon,
  gradient,
  index,
}: ContactCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: 0.2 * i + 0.4,
      },
    }),
  };

  return (
    <motion.div
      className="flex items-start gap-6"
      variants={cardVariants}
      custom={index}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {details.map((detail, i) => (
          <p key={i} className="text-gray-600 mt-1">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function GetInTouch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        delay: 0.8,
      },
    },
  };

  const contactInfo = [
    {
      title: "Customer Support",
      details: ["0728 038 778", "justinnjoroge426@gmail.com"],
      icon: <Mail className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      title: "Visit Us",
      details: ["Nairobi, Kenya", "Open Mon-Fri: 9AM - 5PM"],
      icon: <MapPin className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-br from-pink-400 to-red-500",
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-pink-50 to-blue-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block"
            variants={titleVariants}
          >
            Get in Touch
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform translate-y-2"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Have questions or need assistance? We are here to help!
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactCard
                  key={index}
                  title={info.title}
                  details={info.details}
                  icon={info.icon}
                  gradient={info.gradient}
                  index={index}
                />
              ))}
            </div>
            <motion.div
              className="w-full aspect-video rounded-xl overflow-hidden shadow-lg"
              variants={mapVariants}
            >
              <iframe
                width="100%"
                height="100%"
                className="border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyALB1YNVF9KvptNi0LDkAcljfKw-7oSEKs&q=Your+Business+Name,Nairobi+Kenya"
              ></iframe>
            </motion.div>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
