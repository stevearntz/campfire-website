"use client";

import { useState, useEffect } from "react";

const quotes = [
  { text: "A leader takes people where they want to go. A great leader takes people where they don\u2019t necessarily want to go, but ought to be.", author: "Rosalynn Carter" },
  { text: "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence.", author: "Sheryl Sandberg" },
  { text: "Growth and comfort do not coexist.", author: "Ginni Rometty" },
  { text: "Don\u2019t be afraid. Be focused. Be determined. Be hopeful. Be empowered.", author: "Michelle Obama" },
  { text: "Failure is not the opposite of success, it\u2019s part of success.", author: "Arianna Huffington" },
  { text: "Vulnerability is not winning or losing; it\u2019s having the courage to show up and be seen when we have no control over the outcome.", author: "Bren\u00e9 Brown" },
  { text: "The price of greatness is responsibility.", author: "Winston Churchill" },
  { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
  { text: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.", author: "Jack Welch" },
  { text: "Leadership is not about being in charge. It\u2019s about taking care of the people in your charge.", author: "Simon Sinek" },
  { text: "A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves.", author: "Lao Tzu" },
  { text: "Never doubt that a small group of thoughtful, concerned citizens can change the world. Indeed it is the only thing that ever has.", author: "Margaret Mead" },
  { text: "A man who wants to lead the orchestra must turn his back on the crowd.", author: "Max Lucado" },
  { text: "If one is lucky, a solitary fantasy can totally transform one million realities.", author: "Maya Angelou" },
  { text: "A cowardly leader is the most dangerous of men.", author: "Stephen King" },
  { text: "Fight for the things that you care about, but do it in a way that will lead others to join you.", author: "Ruth Bader Ginsburg" },
  { text: "Some people only ask others to do something. I believe that, why should I wait for someone else? Why don\u2019t I take a step and move forward?", author: "Malala Yousafzai" },
  { text: "The most courageous act is still to think for yourself. Aloud.", author: "Coco Chanel" },
  { text: "I always did something I was a little not ready to do. I think that\u2019s how you grow.", author: "Marissa Mayer" },
  { text: "My best successes came on the heels of failures.", author: "Barbara Corcoran" },
  { text: "The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart" },
  { text: "To bring about change, you must not be afraid to take the first step. We will fail when we fail to try.", author: "Rosa Parks" },
  { text: "Find a group of people who challenge and inspire you, spend a lot of time with them, and it will change your life.", author: "Amy Poehler" },
];

export default function LeaderQuoteEgg() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    if (!visible) return;
    const fadeTimer = setTimeout(() => setFading(true), 8000);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setFading(false);
    }, 10000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, [visible]);

  const handleClick = () => {
    if (visible) return;
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setVisible(true);
    setFading(false);
  };

  return (
    <div
      className="hidden sm:block sm:col-span-2 rounded-xl cursor-pointer"
      style={{ minHeight: "80px" }}
      onClick={handleClick}
    >
      {visible && (
        <div
          className="bg-white rounded-xl p-5 overflow-hidden relative h-full flex flex-col justify-between"
          style={{
            animation: fading ? "quote-fade-out 2s ease-in forwards" : "quote-fade-in 0.5s ease-out",
          }}
        >
          <style>{`@keyframes quote-fade-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes quote-fade-out{from{opacity:1}to{opacity:0}}`}</style>
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: "linear-gradient(to bottom, #9D88ED, #6E3FCC)" }}
          />
          <p className="text-sm font-bold text-gray-900 leading-relaxed pl-1">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="text-sm font-bold text-[#6E3FCC] text-right mt-3">
            {quote.author}
          </p>
        </div>
      )}
    </div>
  );
}
