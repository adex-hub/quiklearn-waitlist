import animationData from "../lotties/quiklearn.json";
import Lottie from "react-lottie";

export default function WaitlistHeader() {
  return (
    <header className="w-full flex justify-center py-8">
      <div className="w-[150px] h-[49.5px]">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height="100%"
          width="100%"
          isClickToPauseDisabled={false}
        />
      </div>
    </header>
  );
}
