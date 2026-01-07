import About from "./About";
import { Benefits } from "./Benefits";
import Hero from "./Hero";
import Partners from "./Partners";
import { Stats } from "./Stats";
import Technology from "./Technology";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <About />
      <Technology />
      {/* <Fleet /> */}
      <Benefits />
      <Stats />
    </main>
  )
}
