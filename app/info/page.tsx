"use client"

export default function InfoPage() {
  return (
    <div className="min-h-screen pt-32 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-xs uppercase tracking-wider font-normal mb-16">Info</h1>
        
        <div className="space-y-16 max-w-2xl">
          <section id="about" className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-normal">About</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Stores is a contemporary clothing brand focused on minimalist design and high-quality materials.
              Founded in 2018, we create timeless pieces that blend comfort with distinctive aesthetics.
            </p>
          </section>
          
          <section id="shipping" className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-normal">Shipping</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Free shipping on all orders over $150. Standard shipping is $15 for domestic orders.
              International shipping available. All orders are processed within 1-2 business days.
            </p>
          </section>
          
          <section id="returns" className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-normal">Returns</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with original tags attached.
              Please contact us at support@stores.com to initiate a return.
            </p>
          </section>
          
          <section id="contact" className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-normal">Contact</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For any inquiries, please email us at info@stores.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
