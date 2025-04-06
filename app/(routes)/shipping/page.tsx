export default function ShippingPage() {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <h1 className="text-3xl font-light mb-8 uppercase tracking-widest text-center">Shipping & Returns</h1>
  
        <div className="max-w-3xl mx-auto">
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
                  We ship to most countries worldwide. International shipping rates are calculated at checkout based on
                  destination and package weight.
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
  
          <section className="mb-12">
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">Returns & Exchanges</h2>
  
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light mb-2">Return Policy</h3>
                <p className="text-gray-700 mb-4">
                  We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with all original tags
                  attached.
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
  
          <section>
            <h2 className="text-xl font-light mb-6 uppercase tracking-wider">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about shipping, returns, or your order, please contact our customer service team
              at service@stores.com or call us at +1 (800) 555-1234, Monday through Friday, 9am to 6pm EST.
            </p>
          </section>
        </div>
      </div>
    )
  }
  
  