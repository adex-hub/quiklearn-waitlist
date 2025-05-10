"use client";
import React from "react";
import animationData from "../lotties/quiklearn";
import Lottie from "react-lottie";

export default function WaitlistHeader() {
  return (
    <header className="w-full flex justify-center py-8">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={66}
        width={200}
        isClickToPauseDisabled={false}
      />
    </header>
  );
}
