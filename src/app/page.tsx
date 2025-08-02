"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  creator: string;
  age: string;
  grade: string;
  image: string;
}

const products: Product[] = [
  {
    id: "lydias-laughs",
    name: "Lydia's Laughs",
    description: "A collection of 7 original comics created by Lydia! Each book includes all 7 stories: The Squashing Squash and the Terrible Tomato, Doggy and the Bone, Water vs Rock, The Chopsticks, No More Phone, Man vs Bubblegum, and The Chalkboard vs the Eraser. Original stories filled with adventure, humor, and creativity that will make you laugh out loud!",
    price: 5,
    creator: "Lydia",
    age: "8",
    grade: "3rd Grade",
    image: "/laughs.jpg"
  },
  {
    id: "handmade-bookmarks",
    name: "Handmade Bookmarks (6 total)",
    description: "Phoebe created all of these beautiful bookmarks! Each purchase includes six bookmarks: three water-color painted paper bookmarks and three hand-braided thread bookmarks. Two of the braided bookmarks feature binary beads that spell out \"I love you\" and \"one more chapter\" - perfect for keeping your place in your favorite books!",
    price: 10,
    creator: "Phoebe",
    age: "11",
    grade: "6th Grade",
    image: "/bookmarks.jpg"
  },
  {
    id: "family-notecards",
    name: "Note Cards (12 total)",
    description: "Hand stamped and designed by everyone in the family with handmade stamps. Each purchase includes 6 large sized note cards (4x5.5) and 6 smaller size note cards (2.5x3.5) perfect for sending to friends and family with unique designs created with love! Envelopes are included.",
    price: 10,
    creator: "Team Miller",
    age: "All of Us",
    grade: "Family Project",
    image: "/cards.jpg"
  },
  {
    id: "fabric-tote",
    name: "Large Fabric Grocery Tote",
    description: "Large fabric grocery tote with a design by Chloe screen printed on one side. Perfect for shopping, carrying books, or everyday use with a beautiful custom design that will inspire you and everyone you see!",
    price: 25,
    creator: "Chloe",
    age: "15",
    grade: "Sophomore",
    image: "/tote.png"
  }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Product | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "lydias-laughs": 0,
    "handmade-bookmarks": 0,
    "family-notecards": 0,
    "fabric-tote": 0
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  const handleImageClick = (product: Product) => {
    setSelectedImage(product);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleQRCodeClick = (qrType: string) => {
    setSelectedQRCode(qrType);
  };

  const closeQRModal = () => {
    setSelectedQRCode(null);
  };

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, prev[productId] + change)
    }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (product.price * quantities[product.id]);
    }, 0);
  };

  const getOrderSummary = () => {
    return products.filter(product => quantities[product.id] > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderSummary = getOrderSummary();
    if (orderSummary.length === 0) {
      alert("Please select at least one item to order.");
      return;
    }

    const orderData = {
      items: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantities[product.id],
        subtotal: product.price * quantities[product.id],
        creator: product.creator,
        age: product.age,
        grade: product.grade
      })),
      customer: formData,
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://n8n.teammiller.org/webhook/59b489ff-d54d-4a08-8de9-63d7f017ec55', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setPaymentTotal(calculateTotal());
        setIsModalOpen(false);
        setIsPaymentModalOpen(true);
        setFormData({ name: "", email: "", phone: "", address: "", message: "" });
        setQuantities({
          "lydias-laughs": 0,
          "handmade-bookmarks": 0,
          "family-notecards": 0,
          "fabric-tote": 0
        });
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert("There was an issue submitting your order. Please try again or contact us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="text-center pt-20 pb-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="py-12">
            <Image
              src="/header.png"
              alt="Miller Academy Fundraiser - Taking orders until August 16, 2025"
              width={500}
              height={500}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="pt-2 pb-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-800 mb-8">
            Our Goal
          </h2>
          <div className="text-left space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Our primary goal at Miller Academy is to raise empathetic humans who think for themselves, solve problems creatively, appreciate the arts, and actively notice others and the world around them.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We tried to structure this fundraiser to reflect that purpose.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We plan to use contributions to this fundraiser to support this goal by:
            </p>
            <ul className="text-lg text-gray-600 leading-relaxed space-y-3 ml-6">
              <li>• sourcing curriculum that trains young minds to think independently</li>
              <li>• attending museums and a variety of performances that open our minds and our world</li>
              <li>• purchasing supplies to help our girls have meaningful hands on experiences that connect them to others and the world around them</li>
            </ul>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are grateful for your love and support. For more details please see our <a href="#faq" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">FAQ</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-800 mb-16">
            Handcrafted Creations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[650px]">
                {/* Product Image */}
                <div className="h-80 border-b border-gray-200 overflow-hidden cursor-pointer group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={320}
                    onClick={() => handleImageClick(product)}
                    className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                      product.id === "handmade-bookmarks" ? "object-contain bg-white" :
                      product.id === "fabric-tote" ? "object-contain bg-white" :
                      product.id === "family-notecards" ? "object-contain bg-white" :
                      "object-cover"
                    }`}
                  />
                </div>

                <div className="p-4 flex flex-col h-full">
                  {/* Title and Price - Fixed Height */}
                  <div className="mb-3 min-h-[3rem] flex items-start">
                    <div className="flex items-start justify-between w-full">
                      <h3 className="text-xl font-medium text-gray-800 leading-tight flex-1 pr-3">
                        {product.name}
                      </h3>
                      <span className="text-3xl font-light text-gray-700 whitespace-nowrap">
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  {/* Description - Flexible space */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {product.description}
                    </p>
                  </div>

                  {/* Creator Info - Fixed at bottom with spacing */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center mt-auto">
                    <p className="text-base text-gray-600">
                      <span className="font-medium">Created by {product.creator}</span><br/>
                      {product.age === "All of Us" ? product.age : `Age ${product.age}`} • {product.grade}
                    </p>
                  </div>


                </div>
              </div>
            ))}
          </div>
          
          {/* Single Purchase Button */}
          <div className="text-center mt-12">
            <button
              onClick={handlePurchase}
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-12 rounded-lg transition-all duration-300 text-lg"
            >
              Purchase Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 id="faq" className="text-4xl font-light text-center text-gray-800 mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How will the funds be used?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All funds raised will directly support our educational goals by purchasing curriculum that encourages independent thinking, funding visits to museums and performances, and buying supplies for hands-on learning experiences that connect our daughters to others, knowledge, and the world around them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                When will I receive my purchase?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our fundraiser will close on August 16th. Since these are handcrafted items made by our daughters, our goal is to have all items shipped or hand-delivered by September 1st. We'll contact you with updates and coordinate delivery details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What's the process?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Simply add items to your cart, go through the checkout process, and that loads your order on our end with your address and quantities. After you submit your order, you'll see QR codes to pay us via either Venmo or Zelle. Click the QR code to make it bigger. It's that easy!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What is Miller Academy?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Miller Academy is our family's home education approach focused on raising empathetic humans who think independently, solve problems creatively, appreciate the arts, and actively notice others and the world around them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How much reading do you do together?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our family reads 36-40 full length novels out loud together each year, in addition to all of the girls' personal reading! Our public library has an amazing catalog that we depend on heavily, but we usually have to fill in about half of our booklist with purchases.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Each girl's favorite read aloud from this past year:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong className="text-gray-900">Lydia:</strong> <em>My Ántonia</em> by Willa Cather - She enjoyed how the author added interesting details to the characters and plot.</li>
                    <li>• <strong className="text-gray-900">Phoebe:</strong> <em>The Gallery</em> by Laura Marx Fitzgerald - She loved that it was about an empowered girl her age that was trying to fix things.</li>
                    <li>• <strong className="text-gray-900">Chloe:</strong> <em>Echo</em> by Pam Muñoz Ryan - She liked how all of the stories were woven together.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What curriculum and subjects do you focus on?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  At Miller Academy we rely on a variety of well-developed curriculum to guide our learning. We love being able to mix and match curriculum that best suits each of our girls' unique learning styles for each individual subject - language arts, math, science, and history.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Each girl's favorite subject:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong className="text-gray-900">Lydia:</strong> Reading and language arts</li>
                    <li>• <strong className="text-gray-900">Phoebe:</strong> Language arts</li>
                    <li>• <strong className="text-gray-900">Chloe:</strong> Reading for history</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How important is art in your education?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Art is a huge part of our homeschool culture! We try to always have art supplies available and to encourage creative expression. We usually have several ongoing art projects that we work on during our many read aloud hours.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Each girl's favorite art project from this past year:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong className="text-gray-900">Lydia:</strong> Drawing comics that make people laugh</li>
                    <li>• <strong className="text-gray-900">Phoebe:</strong> Making large scale paintings</li>
                    <li>• <strong className="text-gray-900">Chloe:</strong> Working with pastels</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What kind of field trips and community involvement do you have?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We aim to spend as much time in the community as possible each year. Each week we volunteer at a local church handing out lunches to people in need. We try to attend as many performances as possible at our local performing arts center, and we also try to make it to a few museums, zoos, and historical spots each year.
                </p>
                <p className="text-gray-700 leading-relaxed font-medium">
                  All three girls' favorite performance to attend was the acrobatic performance of Romeo and Juliet!
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Each girl's favorite field trip:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <strong className="text-gray-900">Lydia:</strong> Museum of Science and Industry</li>
                    <li>• <strong className="text-gray-900">Phoebe:</strong> Exploring any children's museum</li>
                    <li>• <strong className="text-gray-900">Chloe:</strong> Anything involving animals in any form</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What is each girl most proud of from this past year?
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong className="text-gray-900">Lydia:</strong> "Doing good deeds and spelling."</li>
                  <li>• <strong className="text-gray-900">Phoebe:</strong> "Making the teeter totter with Dad."</li>
                  <li>• <strong className="text-gray-900">Chloe:</strong> "All of my creations - art, writing, music."</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-800">
                Place Your Order
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Select Items</h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-900"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-gray-900 font-medium">{quantities[product.id]}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-900"
                        >
                          +
                        </button>
                        <span className="w-16 text-right text-sm text-gray-900 font-medium">
                          ${product.price * quantities[product.id]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-gray-900"
                    placeholder="Any special requests or messages..."
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
                {getOrderSummary().length > 0 ? (
                  <div className="space-y-2">
                    {getOrderSummary().map((product) => (
                      <div key={product.id} className="flex justify-between text-sm text-gray-900">
                        <span>{product.name} × {quantities[product.id]}</span>
                        <span>${product.price * quantities[product.id]}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium text-gray-900">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-900 text-sm">No items selected</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Complete Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-light text-gray-800 mb-6">
            Thank You for Supporting Miller Academy
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your generosity helps create amazing educational opportunities for our daughters. 
            Every purchase and donation is deeply appreciated and makes a real difference in their learning journey.
          </p>
        </div>
      </footer>

      {/* Family Photo Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/family.jpg"
              alt="Team Miller"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl font-light z-10"
            >
              ×
            </button>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedImage.image}
                alt={selectedImage.name}
                width={800}
                height={600}
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-medium text-gray-800 mb-2">
                  {selectedImage.name}
                </h3>
                <p className="text-gray-600 text-lg">
                  ${selectedImage.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">
                Thank you for supporting Miller Academy!
              </h2>
              
              <p className="text-lg text-gray-700 mb-4">
                You can make your payment of <span className="font-bold text-gray-900">${paymentTotal}</span> using either Zelle or Venmo.
              </p>
              
              <p className="text-sm text-gray-600 mb-8">
                Click on any QR code below to see a larger version.
              </p>
              
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleQRCodeClick('zelle')}
                  >
                    <Image
                      src="/zelle.png"
                      alt="Zelle Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto mb-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Zelle</p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleQRCodeClick('venmo')}
                  >
                    <Image
                      src="/venmo.png"
                      alt="Venmo Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto mb-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Venmo</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="mt-8 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Enlargement Modal */}
      {selectedQRCode && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={closeQRModal}
        >
          <div 
            className="relative bg-white rounded-lg p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQRModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl font-light z-10"
            >
              ×
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-4 capitalize">
                {selectedQRCode} Payment QR Code
              </h3>
              
              <Image
                src={`/${selectedQRCode}.png`}
                alt={`${selectedQRCode} Payment QR Code`}
                width={400}
                height={400}
                className="mx-auto rounded-lg border border-gray-200"
              />
              
              <p className="text-sm text-gray-600 mt-4">
                Scan this QR code with your {selectedQRCode === 'zelle' ? 'Zelle' : 'Venmo'} app to make your payment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
