import React, { useState } from 'react';
import { sendEmail } from '../services/dbservice';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        // Send email using sendEmail from dbservice
        const response = await sendEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.description
        });
        
        if (response.status === 200 || response.status === 201) {
          // Email sent successfully
          setSubmitted(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            description: ''
          });

          // Reset message after 5 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setErrors({ submit: 'Failed to send message. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FDF3C4] to-[#fff8f0] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="h-20 md:h-40" />

        {/* Page Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#800000] mb-3 md:mb-4">
            Get in <span className="text-[#b8860b]">Touch</span>
          </h1>

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
                <p className="text-red-800 font-semibold">✗ Error</p>
                <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
              </div>
            )}
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#b8860b] mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-[#5B1A13] max-w-2xl mx-auto px-2">
            Have questions? We'd love to hear from you. Send us a message and we'll respond shortly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Contact Form</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Thank You!</p>
                <p className="text-green-700 text-sm mt-1">Please check your mail. We will contact you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-[#800000] font-semibold mb-2 text-sm sm:text-base">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] transition text-sm sm:text-base ${
                    errors.name ? 'border-red-500' : 'border-[#b8860b]'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[#800000] font-semibold mb-2 text-sm sm:text-base">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] transition text-sm sm:text-base ${
                    errors.email ? 'border-red-500' : 'border-[#b8860b]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-[#800000] font-semibold mb-2 text-sm sm:text-base">
                  Contact No.
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 sm:py-3 border-2 border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] transition text-sm sm:text-base"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-[#800000] font-semibold mb-2 text-sm sm:text-base">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry"
                  rows="5"
                  className="w-full px-4 py-2 sm:py-3 border-2 border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] transition text-sm sm:text-base resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#800000] hover:bg-[#b8860b] disabled:bg-gray-400 text-white font-bold py-2 sm:py-3 px-6 rounded-lg transition duration-300 shadow-md text-sm sm:text-base mt-6"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">Contact Information</h2>
              
              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="text-2xl sm:text-3xl text-[#b8860b] flex-shrink-0">📍</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#800000] text-sm sm:text-base mb-1">Address</h3>
                    <p className="text-[#5B1A13] text-xs sm:text-sm">Jaipur, Rajasthan, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="text-2xl sm:text-3xl text-[#b8860b] flex-shrink-0">📞</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#800000] text-sm sm:text-base mb-1">Phone</h3>
                    <p className="text-[#5B1A13] text-xs sm:text-sm">+91 XXXXXXXXXX</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="text-2xl sm:text-3xl text-[#b8860b] flex-shrink-0">📧</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#800000] text-sm sm:text-base mb-1">Email</h3>
                    <p className="text-[#5B1A13] text-xs sm:text-sm">info@jyothi-dental.com</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="text-2xl sm:text-3xl text-[#b8860b] flex-shrink-0">🕐</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#800000] text-sm sm:text-base mb-1">Business Hours</h3>
                    <p className="text-[#5B1A13] text-xs sm:text-sm">Monday - Sunday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.2183!2d75.82558992038064!3d26.852931414993964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3d0e0000001%3A0x1!2zMjbCsDUxJzEwLjI1Ik4gNzXCsDQ5JzMyLjEyIkU!5e0!3m2!1sen!2sin!4v1702646400000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jyothi Dental Clinic Location"
              />
            </div>
          </div>
        </div>

        <div className="h-20 md:h-32" />
      </div>
    </div>
  );
};

export default Contact;
