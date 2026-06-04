"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    // Hide bar when quote form is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(false);
      },
      { threshold: 0.3 }
    );

    const form = document.querySelector("[data-quote-form]");
    if (form instanceof HTMLElement) {
      formRef.current = form;
      observer.observe(form);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-brand-900 border-t border-brand-700 px-4 py-3 flex gap-3 safe-area-inset-bottom">
        <Link
          href="/contact/request-quote"
          className="flex-1 h-12 bg-gradient-to-r from-accent-600 to-accent-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]"
        >
          Request a Quote
        </Link>
        <a
          href="https://wa.me/905334567975?text=Hi%2C%20I'd%20like%20to%20request%20a%20bulk%20lubricant%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 w-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0 hover:brightness-110 transition-all active:scale-[0.98]"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
