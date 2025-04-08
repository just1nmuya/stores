// export default function TermsPage() {
//     return (
//       <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
//         <h1 className="text-3xl font-light mb-8 uppercase tracking-widest text-center">Terms & Conditions</h1>
  
//         <div className="max-w-3xl mx-auto prose prose-sm">
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">1. Introduction</h2>
//             <p>
//               Welcome to Stores. These Terms and Conditions govern your use of our website and the purchase of
//               products from our online store. By accessing our website or placing an order, you agree to be bound by these
//               Terms and Conditions.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">2. Ordering & Payment</h2>
//             <p>
//               All orders placed through our website are subject to acceptance and availability. We reserve the right to
//               refuse any order without giving reason. When you place an order, you will receive an order confirmation
//               email acknowledging receipt of your order.
//             </p>
//             <p className="mt-4">
//               Payment can be made using the methods specified on our website. All credit/debit cardholders are subject to
//               validation checks and authorization by the card issuer. If your payment method is declined, we reserve the
//               right to cancel your order.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">3. Shipping & Delivery</h2>
//             <p>
//               Delivery times are estimates only and commence from the date of shipping, not the date of order. We are not
//               responsible for delays caused by customs clearance procedures or other circumstances beyond our control.
//             </p>
//             <p className="mt-4">
//               Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are
//               responsible for filing any claims with carriers for damaged and/or lost shipments.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">4. Returns & Refunds</h2>
//             <p>
//               Please refer to our Returns Policy for detailed information on returns, exchanges, and refunds. By making a
//               purchase, you agree to the terms of our Returns Policy.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">5. Intellectual Property</h2>
//             <p>
//               All content on our website, including text, graphics, logos, images, and software, is the property of
//               Storesand is protected by international copyright laws. Unauthorized use of any materials may
//               violate copyright, trademark, and other laws.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">6. Privacy Policy</h2>
//             <p>
//               Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
//               protect your personal information.
//             </p>
//           </section>
  
//           <section className="mb-8">
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">7. Limitation of Liability</h2>
//             <p>
//               Storesshall not be liable for any indirect, incidental, special, consequential, or punitive
//               damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
//               resulting from your access to or use of or inability to access or use the website.
//             </p>
//           </section>
  
//           <section>
//             <h2 className="text-xl font-light mb-4 uppercase tracking-wider">8. Changes to Terms</h2>
//             <p>
//               We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately
//               upon posting on the website. Your continued use of the website following the posting of revised Terms and
//               Conditions means that you accept and agree to the changes.
//             </p>
//             <p className="mt-4">Last updated: April 6, 2025</p>
//           </section>
//         </div>
//       </div>
//     )
//   }
  

"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function TermsPage() {
  const sectionRefs = useRef<HTMLElement[]>([] as HTMLElement[])

  useEffect(() => {
    // Animation for sections on page load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-4")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all section elements
    const currentSections = sectionRefs.current;
    currentSections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Add section to refs
  const addToRefs = (el: HTMLElement | null): void => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <h1
          ref={addToRefs}
          className="text-3xl font-light mb-12 uppercase tracking-widest text-center opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          Terms & Conditions
        </h1>

        <div className="max-w-3xl mx-auto prose prose-sm">
          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Stores. These Terms and Conditions govern your use of our website and the purchase of products
              from our online store. By accessing our website or placing an order, you agree to be bound by these Terms
              and Conditions.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">2. Ordering & Payment</h2>
            <p className="text-gray-700 leading-relaxed">
              All orders placed through our website are subject to acceptance and availability. We reserve the right to
              refuse any order without giving reason. When you place an order, you will receive an order confirmation
              email acknowledging receipt of your order.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Payment can be made using the methods specified on our website. All credit/debit cardholders are subject
              to validation checks and authorization by the card issuer. If your payment method is declined, we reserve
              the right to cancel your order.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">3. Shipping & Delivery</h2>
            <p className="text-gray-700 leading-relaxed">
              Delivery times are estimates only and commence from the date of shipping, not the date of order. We are
              not responsible for delays caused by customs clearance procedures or other circumstances beyond our
              control.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are
              responsible for filing any claims with carriers for damaged and/or lost shipments.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-400"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">4. Returns & Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Please refer to our Returns Policy for detailed information on returns, exchanges, and refunds. By making
              a purchase, you agree to the terms of our Returns Policy.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-500"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, is the property of
              Stores and is protected by international copyright laws. Unauthorized use of any materials may violate
              copyright, trademark, and other laws.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-600"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">6. Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
              protect your personal information.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-700"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Stores shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting
              from your access to or use of or inability to access or use the website.
            </p>
          </section>

          <section
            ref={addToRefs}
            className="mb-12 opacity-0 translate-y-4 transition-all duration-700 ease-out delay-800"
          >
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">8. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting on the website. Your continued use of the website following the posting of
              revised Terms and Conditions means that you accept and agree to the changes.
            </p>
            <p className="mt-6 text-gray-500 text-sm">Last updated: April 6, 2025</p>
          </section>
        </div>

        {/* Contact Section */}
        <div
          ref={addToRefs}
          className="mt-20 text-center max-w-xl mx-auto opacity-0 translate-y-4 transition-all duration-700 ease-out delay-900"
        >
          <h2 className="text-xl font-light mb-4 uppercase tracking-wider">Need Help?</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            If you have any questions about our terms or need assistance, our customer service team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2025 Stores. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
                Terms
              </Link>
              <Link href="/privacy" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
                Privacy
              </Link>
              <Link href="/shipping" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
                Shipping
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
