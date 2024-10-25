import LoginButton from "@/components/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main
      className="h-screen flex flex-col justify-center items-center space-y-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#000000] to-[#201f1f]  p-4 sm:p-8 lg:p-16"
    >
      <section>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-500 dark:text-zinc-300 font-extrabold tracking-tight leading-tight mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <span role="img" aria-label="lock">🔒</span> Secure Your Digital World
        </h1>
        <p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-zinc-600 dark:text-zinc-400 font-medium mb-6"
        >
          A robust authentication system for a safer tomorrow.
        </p>
        <div>
          <LoginButton>
            <Button
              variant={"secondary"}
              size={"lg"}
              className="shadow-lg shadow-zinc-500/50 dark:shadow-zinc-800/50"
            >
              Sign in
            </Button>
          </LoginButton>
        </div>
      </section>
    </main>
  );
}
