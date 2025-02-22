import React from 'react';
import { motion } from "framer-motion";


const Section = () => {
    return (
        <div>
             <section className="relative bg-gradient-to-br from-[#8dc8ff] to-blue-600 py-20 px-6 md:px-12 lg:px-20 text-white">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Heading with Motion Effect */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          **Smart Task Management** for Effortless Productivity
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl opacity-90 mb-6"
        >
          Organize, prioritize, and track your tasks seamlessly with a 
          powerful **drag-and-drop workflow**, real-time updates, and 
          an intuitive interface built for teams & individuals.
        </motion.p>

        {/* Feature Highlights with Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { title: "📌 Drag & Drop Tasks", desc: "Easily move tasks between categories." },
            { title: "⏳ Track Progress", desc: "Monitor task status and deadlines in real-time." },
            { title: "🔔 Smart Notifications", desc: "Get instant alerts for updates & deadlines." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-5 bg-white bg-opacity-10 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-md opacity-85">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition"
        >
          Get Started
        </motion.button>
      </div>
    </section>
        </div>
    );
};

export default Section;