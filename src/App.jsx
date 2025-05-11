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
    <div className="bg-base-300 h-dvh w-full plus-jakarta-sans ">
      <Header />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(26.74% 0.005 248)",
            color: "oklch(84.955% 0 0)",
            border: "1px solid oklch(32.42% 0.006 258.35)",
          },
        }}
      />
      <main className="flex items-start justify-between pt-[12vh] sm:pt-[18vh] px-6 max-w-7xl gap-x-16 mx-auto">
        {/* temporarily hiding it to work on some other stuff. */}
        <div className="hidden">
          <div className="w-[440px] h-[325px] relative">
            <img src={CardPreview} alt="flashcards" className="w-full h-full" />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 text-center max-w-[450px] mx-auto">
          <p className="text-3xl comfortaa font-bold leading-10">
            Supercharge your learning with AI ✦
          </p>
          <h1 className="text-sm leading-7">
            Through instant interactive flashcards and quizzes, we are about to
            optimize your learning for the best! Join our waitlist to be the
            first to know when we launch!
          </h1>

          {/* Hiding this to focus on more important elements */}
          <div className="text-left order-3 sm:order-2 hidden">
            <p className="text-base">What you get:</p>
            <ul className="list-disc text-base translate-x-6 space-y-2">
              <li className="leading-6">
                Generate custom flashcards on any topic, and from course PDFs
                too
              </li>
              <li className="leading-6">
                Benefit from our spaced-repetition algorithm that ensures what
                you learn sticks.
              </li>
              <li className="leading-6">
                Test yourself with interactive quizzes based on what you&apos;ve
                studied.
              </li>
              <li className="leading-6">Early bird discounts on the app.</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row mt-4 gap-2 relative order-2 sm:order-3"
          >
            <input
              type="email"
              name="email"
              disabled={isSubmitting}
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="input input-bordered w-full validator"
            />
            <p class="validator-hint sm:absolute sm:top-10">
              Enter a valid email address
            </p>
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
          </form>
        </div>
      </main>
    </div>
  );
}
