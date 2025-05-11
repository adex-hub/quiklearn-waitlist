import { Icon, loadIcons } from "@iconify/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import CardPreview from "./assets/cards-preview.png";
import Header from "./components/Header";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const joinWaitlist = async (email) => {
  const { data, error } = await supabase
    .from("waitlist")
    .insert([{ email }])
    .select();

  if (error) {
    console.error("Error joining waitlist:", error);
  } else {
    console.log("Successfully joined waitlist:", data);
  }
};

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  loadIcons([
    "eos-icons:three-dots-loading",
    "si:mail-line",
    "material-symbols:check-circle-rounded",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (joined) return;

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    try {
      await joinWaitlist(email);
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
      setJoined(true);
      e.target.reset();
    }
  };

  return (
    <div className="bg-base-300 h-dvh w-full">
      <Header />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(26.74% 0.005 248)", // Your base-300 color
            color: "oklch(84.955% 0 0)", // Your base-content color
            border: "1px solid oklch(32.42% 0.006 258.35)", // Subtle border with base-200
          },
        }}
      />
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

          <form onSubmit={handleSubmit} className="flex mt-4 gap-2 relative">
            <input
              type="email"
              name="email"
              disabled={isSubmitting}
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="input input-bordered w-full validator"
            />
            {joined ? (
              <button className="btn !btn-success min-w-[130.9px]">
                <Icon icon="material-symbols:check-circle-rounded" />
                Joined!
              </button>
            ) : (
              <button
                disabled={isSubmitting}
                className={`btn btn-primary min-w-[130.9px]`}
              >
                {isSubmitting ? (
                  <span>
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      className="text-2xl"
                    />
                  </span>
                ) : (
                  <>
                    <Icon icon="si:mail-line" /> Join Waitlist
                  </>
                )}
              </button>
            )}
            <p class="validator-hint absolute top-10">
              Enter a valid email address
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
