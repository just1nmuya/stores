"use client"

import React, { useState } from "react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle")
  const [error, setError] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
  )
}

export default ContactForm
