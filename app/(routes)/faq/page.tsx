"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Domestic orders typically arrive within 3-5 business days with standard shipping, and 1-2 business days with express shipping. International shipping times vary by location, ranging from 7-14 business days for standard and 3-5 business days for express shipping.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. Shipping rates are calculated at checkout based on destination and package weight. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or canceled within 2 hours of placement. Please contact our customer service team immediately if you need to make changes to your order. Once an order has begun processing, we cannot guarantee that changes can be made.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with all original tags attached. Sale items and accessories are final sale and cannot be returned unless defective.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, please contact our customer service team at returns@stores.com. You will receive a return shipping label and instructions via email. Once we receive and inspect your return, a refund will be issued to your original payment method within 5-7 business days.",
        },
        {
          question: "Do you offer exchanges?",
          answer:
            "Yes, we offer free exchanges for domestic orders. To initiate an exchange, please contact our customer service team with your order number and the item you wish to exchange.",
        },
      ],
    },
    {
      category: "Product Information",
      questions: [
        {
          question: "How do I care for my Stores garments?",
          answer:
            "Each item comes with specific care instructions on the garment tag. Generally, we recommend gentle hand washing or dry cleaning for most items. Always refer to the care label for the best results and to maintain the quality of your garment.",
        },
        {
          question: "Are your products ethically made?",
          answer:
            "Yes, all Stores products are ethically produced. We work with carefully selected workshops and artisans who are paid fair wages and work in safe conditions. We regularly visit our production facilities to ensure our standards are maintained.",
        },
        {
          question: "What materials do you use?",
          answer:
            "We prioritize natural, high-quality materials such as organic cotton, silk, linen, and responsibly sourced wool. We're committed to reducing our environmental impact and are continuously researching and incorporating more sustainable materials into our collections.",
        },
      ],
    },
  ]

  const [activeCategory, setActiveCategory] = useState("Orders & Shipping")

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-light mb-8 uppercase tracking-widest text-center">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {faqs.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                activeCategory === category.category
                  ? "bg-black text-white"
                  : "border border-black hover:bg-black hover:text-white"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div>
          {faqs.map(
            (category) =>
              activeCategory === category.category && (
                <div key={category.category}>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-light">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ),
          )}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl font-light mb-4 uppercase tracking-wider">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help. Contact us and we will get back to you as soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

