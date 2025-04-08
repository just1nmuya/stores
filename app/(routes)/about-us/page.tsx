"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState("faq")

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

  const [activeFaqCategory, setActiveFaqCategory] = useState("Orders & Shipping")

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-light mb-10 uppercase tracking-widest text-center">Information</h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b pb-4">
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider transition-colors ${
              activeTab === "faq" ? "font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider transition-colors ${
              activeTab === "shipping" ? "font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider transition-colors ${
              activeTab === "terms" ? "font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider transition-colors ${
              activeTab === "privacy" ? "font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Content */}
          {activeTab === "faq" && (
            <div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {faqs.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveFaqCategory(category.category)}
                    className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider transition-colors ${
                      activeFaqCategory === category.category
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
                    activeFaqCategory === category.category && (
                      <div key={category.category}>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                              <AccordionTrigger className="text-left font-light py-4">{faq.question}</AccordionTrigger>
                              <AccordionContent className="text-gray-700 pb-4">{faq.answer}</AccordionContent>
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
          )}

          {/* Shipping & Returns Content */}
          {activeTab === "shipping" && (
            <div>
              <section className="mb-12">
                <h2 className="text-xl font-light mb-6 uppercase tracking-wider">Shipping Information</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light mb-2">Domestic Shipping</h3>
                    <p className="text-gray-700 mb-4">
                      We offer free standard shipping on all domestic orders over $250. Orders under $250 incur a flat
                      shipping rate of $15.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Standard Shipping (3-5 business days): $15 or Free over $250</li>
                      <li>• Express Shipping (1-2 business days): $25</li>
                      <li>• Same Day Delivery (select cities only): $35</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-2">International Shipping</h3>
                    <p className="text-gray-700 mb-4">
                      We ship to most countries worldwide. International shipping rates are calculated at checkout based
                      on destination and package weight.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Standard International (7-14 business days): Starting at $30</li>
                      <li>• Express International (3-5 business days): Starting at $50</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      Please note that international orders may be subject to import duties and taxes, which are the
                      responsibility of the recipient.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-2">Order Processing</h3>
                    <p className="text-gray-700">
                      Orders are processed within 1-2 business days. You will receive a shipping confirmation email with
                      tracking information once your order has been shipped.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-light mb-6 uppercase tracking-wider">Returns & Exchanges</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light mb-2">Return Policy</h3>
                    <p className="text-gray-700 mb-4">
                      We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with all
                      original tags attached.
                    </p>
                    <p className="text-gray-700">
                      Sale items and accessories are final sale and cannot be returned unless defective.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-2">Exchange Process</h3>
                    <p className="text-gray-700 mb-4">
                      We offer free exchanges for domestic orders. To initiate an exchange, please contact our customer
                      service team.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-2">Return Process</h3>
                    <ol className="space-y-2 text-gray-700 list-decimal pl-4">
                      <li>
                        Contact our customer service team at returns@stores.com to request a return authorization.
                      </li>
                      <li>You will receive a return shipping label and instructions via email.</li>
                      <li>Package your item securely in its original packaging if possible.</li>
                      <li>Attach the provided shipping label and drop off at the designated carrier location.</li>
                      <li>
                        Once we receive and inspect your return, a refund will be issued to your original payment method
                        within 5-7 business days.
                      </li>
                    </ol>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Terms & Conditions Content */}
          {activeTab === "terms" && (
            <div className="prose prose-sm max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">1. Introduction</h2>
                <p>
                  Welcome to Stores. These Terms and Conditions govern your use of our website and the purchase of
                  products from our online store. By accessing our website or placing an order, you agree to be bound by
                  these Terms and Conditions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">2. Ordering & Payment</h2>
                <p>
                  All orders placed through our website are subject to acceptance and availability. We reserve the right
                  to refuse any order without giving reason. When you place an order, you will receive an order
                  confirmation email acknowledging receipt of your order.
                </p>
                <p className="mt-4">
                  Payment can be made using the methods specified on our website. All credit/debit cardholders are
                  subject to validation checks and authorization by the card issuer. If your payment method is declined,
                  we reserve the right to cancel your order.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">3. Shipping & Delivery</h2>
                <p>
                  Delivery times are estimates only and commence from the date of shipping, not the date of order. We
                  are not responsible for delays caused by customs clearance procedures or other circumstances beyond
                  our control.
                </p>
                <p className="mt-4">
                  Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You
                  are responsible for filing any claims with carriers for damaged and/or lost shipments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">4. Returns & Refunds</h2>
                <p>
                  Please refer to our Returns Policy for detailed information on returns, exchanges, and refunds. By
                  making a purchase, you agree to the terms of our Returns Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">5. Intellectual Property</h2>
                <p>
                  All content on our website, including text, graphics, logos, images, and software, is the property of
                  Stores and is protected by international copyright laws. Unauthorized use of any materials may violate
                  copyright, trademark, and other laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">6. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                  and protect your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">7. Limitation of Liability</h2>
                <p>
                  Stores shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your access to or use of or inability to access or use the website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">8. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                  immediately upon posting on the website. Your continued use of the website following the posting of
                  revised Terms and Conditions means that you accept and agree to the changes.
                </p>
                <p className="mt-4">Last updated: April 6, 2025</p>
              </section>
            </div>
          )}

          {/* Privacy Policy Content */}
          {activeTab === "privacy" && (
            <div className="prose prose-sm max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">1. Information We Collect</h2>
                <p>
                  We collect personal information that you voluntarily provide to us when you register on our website,
                  express interest in obtaining information about us or our products, or otherwise contact us.
                </p>
                <p className="mt-4">The personal information we collect may include:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Name and contact information (email address, phone number, shipping and billing address)</li>
                  <li>Payment information (processed securely through our payment processors)</li>
                  <li>Order history and preferences</li>
                  <li>Communications and correspondence with us</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">2. How We Use Your Information</h2>
                <p>We use the information we collect for various business purposes, including:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Processing and fulfilling your orders</li>
                  <li>Managing your account and providing customer support</li>
                  <li>Sending transactional emails and order confirmations</li>
                  <li>Sending marketing and promotional communications (with your consent)</li>
                  <li>Improving our website, products, and services</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">
                  3. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to collect and track information about your browsing
                  activities on our website. You can control cookies through your browser settings and other tools.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">4. Information Sharing</h2>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>
                    Service providers who help us operate our business (payment processors, shipping companies, etc.)
                  </li>
                  <li>Professional advisors (lawyers, accountants, etc.)</li>
                  <li>Third parties in connection with a business transaction (merger, acquisition, etc.)</li>
                  <li>Law enforcement or other authorities when required by law</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">5. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information,
                  including:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information
                  from unauthorized access, disclosure, alteration, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-light mb-4 uppercase tracking-wider">7. Contact Us</h2>
                <p>
                  If you have any questions or concerns about our Privacy Policy or data practices, please contact us
                  at:
                </p>
                <p className="mt-2 text-gray-700">
                  Email: privacy@stores.com
                  <br />
                  Address: 123 Mercer Street, SoHo, New York, NY 10012
                  <br />
                  Phone: +1 (800) 555-1234
                </p>
                <p className="mt-4">Last updated: April 6, 2025</p>
              </section>
            </div>
          )}

          {/* Contact Section (shown on all tabs) */}
          {activeTab !== "faq" && (
            <div className="mt-16 text-center">
              <h2 className="text-xl font-light mb-4 uppercase tracking-wider">Need Help?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about our policies or need assistance, our customer service team is here to
                help.
              </p>
              <a
                href="/contact"
                className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
