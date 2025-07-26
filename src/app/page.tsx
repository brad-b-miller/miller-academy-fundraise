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
    id: "postcards",
    name: "Handcrafted Postcards",
    description: "Beautiful, artistic postcards perfect for sending to friends and family. Each one is uniquely designed with love and creativity!",
    price: 5,
    creator: "Chloe",
    age: "15",
    grade: "Sophomore",
    image: "/postcard-placeholder.jpg"
  },
  {
    id: "bookmarks",
    name: "Creative Bookmarks",
    description: "Colorful and fun bookmarks to keep your place in your favorite books. Made with care and imagination!",
    price: 3,
    creator: "Phoebe",
    age: "11",
    grade: "6th Grade",
    image: "/bookmark-placeholder.jpg"
  },
  {
    id: "comics",
    name: "Hand-Drawn Comic Books",
    description: "Original comic books filled with adventure, humor, and creativity. Each story is uniquely crafted and illustrated!",
    price: 8,
    creator: "Lydia",
    age: "8",
    grade: "3rd Grade",
    image: "/comic-placeholder.jpg"
  }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    additionalDonation: 0,
    message: ""
  });

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Airtable
    console.log("Order submitted:", { product: selectedProduct, customer: formData });
    alert("Thank you for your order! We'll be in touch soon.");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", phone: "", address: "", additionalDonation: 0, message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
             {/* Floating Animation Elements */}
       <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {[...Array(15)].map((_, i) => (
           <div
             key={i}
             className="absolute animate-bounce"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 5}s`,
               animationDuration: `${3 + Math.random() * 4}s`
             }}
           >
             <div className="text-pink-300 dark:text-pink-600 text-2xl">💖</div>
           </div>
         ))}
         {[...Array(10)].map((_, i) => (
           <div
             key={`star-${i}`}
             className="absolute animate-sparkle"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 3}s`,
               animationDuration: `${2 + Math.random() * 2}s`
             }}
           >
             <div className="text-yellow-400 text-xl">⭐</div>
           </div>
         ))}
         {[...Array(8)].map((_, i) => (
           <div
             key={`sparkle-${i}`}
             className="absolute animate-float"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 4}s`,
               animationDuration: `${4 + Math.random() * 3}s`
             }}
           >
             <div className="text-purple-400 text-lg">✨</div>
           </div>
         ))}
       </div>

             {/* Header */}
       <header className="relative z-10 text-center py-12 px-4">
         <div className="animate-float">
           <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
             Miller Academy Fundraiser
           </h1>
         </div>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
          Supporting our daughters' educational journey through creativity and community! 
          Every purchase helps fund amazing learning activities, curriculum, and school materials.
        </p>
        <div className="flex justify-center space-x-4 text-lg">
          <span className="bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-full">🎨 Chloe (15)</span>
          <span className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">📚 Phoebe (11)</span>
          <span className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">✏️ Lydia (8)</span>
        </div>
      </header>

      {/* Gratitude Section */}
      <section className="text-center py-8 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Thank You for Supporting Our Educational Journey! 🌟
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Your generous support enables us to provide our daughters with enriching educational experiences, 
            quality curriculum materials, and opportunities to explore their passions. Every purchase makes 
            a meaningful difference in their learning adventure. We are incredibly grateful for your kindness 
            and support of Miller Academy!
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
            Handcrafted Creations by Our Talented Daughters
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
                             <div
                 key={product.id}
                 className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden product-card"
                 style={{ animationDelay: `${index * 0.2}s` }}
               >
                {/* Product Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 flex items-center justify-center">
                  <div className="text-6xl opacity-50">
                    {product.id === "postcards" && "📮"}
                    {product.id === "bookmarks" && "🔖"}
                    {product.id === "comics" && "📚"}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {product.name}
                    </h3>
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Created by {product.creator}</span><br/>
                      Age {product.age} • {product.grade}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Purchase Now ✨
                  </button>
                </div>

                                 {/* Floating sparkles */}
                 <div className="absolute top-4 right-4 text-yellow-400 animate-sparkle">✨</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            Your Support Makes a Difference! 🌈
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Curriculum & Materials</h3>
              <p className="text-gray-600 dark:text-gray-400">Quality educational resources and learning materials</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Creative Activities</h3>
              <p className="text-gray-600 dark:text-gray-400">Art supplies, science experiments, and hands-on learning</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Educational Experiences</h3>
              <p className="text-gray-600 dark:text-gray-400">Field trips, workshops, and enrichment programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Purchase {selectedProduct?.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Donation to Miller Academy
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.additionalDonation}
                  onChange={(e) => setFormData({...formData, additionalDonation: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Any special requests or messages for the girls..."
                />
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Total Amount:</strong> ${selectedProduct?.price || 0} + ${formData.additionalDonation} donation = ${(selectedProduct?.price || 0) + formData.additionalDonation}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Complete Purchase 💝
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-12 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Thank You for Supporting Miller Academy! 🙏
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your generosity helps create amazing educational opportunities for our daughters. 
            Every purchase and donation is deeply appreciated and makes a real difference in their learning journey.
          </p>
          <div className="flex justify-center space-x-4 text-2xl">
            <span className="animate-bounce">💖</span>
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🌟</span>
            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🎨</span>
            <span className="animate-bounce" style={{animationDelay: '0.6s'}}>📚</span>
            <span className="animate-bounce" style={{animationDelay: '0.8s'}}>✨</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
