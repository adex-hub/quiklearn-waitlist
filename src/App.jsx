import Header from "./components/Header";
import { Icon } from "@iconify/react";
import CardPreview from "./assets/cards-preview.png";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  return (
    <div className="bg-base-300 h-dvh w-full">
      <Header />
      <main className="flex items-start justify-between pt-[18vh] px-28 max-w-7xl gap-x-16 mx-auto">
        <div className="">
          <div className="w-[440px] h-[325px] relative">
            <img src={CardPreview} alt="flashcards" className="w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="text-sm">Supercharge your learning with AI ✦</p>
          <h1 className="text-3xl font-bold text-primary">
            Join the waitlist to get started
          </h1>
          <p className="text-base">What you get:</p>
          <ul className="list-disc text-base translate-x-6 space-y-2">
            <li className="leading-6">
              Generate custom flashcards on any topic, and from course PDFs too
            </li>
            <li className="leading-6">
              Benefit from our spaced-repetition algorithm that ensures what you
              learn sticks.
            </li>
            <li className="leading-6">
              Test yourself with interactive quizzes based on what you&apos;ve
              studied.
            </li>
            <li className="leading-6">Early bird discounts on the app.</li>
          </ul>

          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary ml-2">
              <Icon icon="si:mail-line" /> Join Waitlist
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
