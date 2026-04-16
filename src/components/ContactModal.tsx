"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Package,
  User,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { Product } from "@/data/products";

interface ContactModalProps {
  product: Product & { matchScore?: number };
  onClose: () => void;
}

export default function ContactModal({ product, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission (in production, this would hit an API)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {submitted ? (
          /* ────── Success State ────── */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Inquiry Sent!
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Your inquiry for{" "}
                <span className="font-semibold text-slate-700">
                  {product.name}
                </span>{" "}
                has been sent to{" "}
                <span className="font-semibold text-slate-700">
                  {product.supplier}
                </span>
                . They will contact you within 24 hours.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Supplier Email</span>
                <span className="font-medium text-slate-800">
                  {product.supplierEmail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Supplier Phone</span>
                <span className="font-medium text-slate-800">
                  {product.supplierPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reference ID</span>
                <span className="font-mono font-medium text-slate-800">
                  INQ-{Date.now().toString(36).toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          /* ────── Form State ────── */
          <>
            {/* Product header */}
            <div className="p-6 pb-0">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white flex-shrink-0">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-900 leading-snug">
                    Contact Supplier
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Send an inquiry for this product
                  </p>
                </div>
              </div>

              {/* Product summary card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                <h3 className="font-bold text-slate-900 mb-1 text-[15px]">
                  {product.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                    {product.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                    {product.price}
                  </span>
                  {product.moq && (
                    <span className="text-slate-400">MOQ: {product.moq}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{product.supplier}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Your Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="buyerEmail"
                      value={formData.buyerEmail}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="buyerPhone"
                      value={formData.buyerPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Quantity Required
                  </label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 sqm"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                  Message to Supplier
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your project requirements, preferred delivery timeline, custom specifications…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm transition-all resize-none"
                  />
                </div>
              </div>

              {/* Supplier quick info */}
              <div className="flex items-center justify-between bg-blue-50/50 rounded-lg px-4 py-3 border border-blue-100/50 text-sm">
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {product.supplier}
                  </span>{" "}
                  will be notified immediately.
                </div>
                <div className="flex items-center gap-3 text-xs text-blue-600">
                  <a
                    href={`mailto:${product.supplierEmail}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </a>
                  <a
                    href={`tel:${product.supplierPhone}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-300 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:shadow-none"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending Inquiry…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Inquiry & Get Quote
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
