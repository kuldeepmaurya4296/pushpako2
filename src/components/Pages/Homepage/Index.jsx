import About from "./About";
import { Benefits } from "./Benefits";
import Hero from "./Hero";
import Leadership from "./Leadership";
import Partners from "./Partners";
import { Stats } from "./Stats";
import Technology from "./Technology";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <About />
      <Leadership />
      <Technology />
      {/* <Fleet /> */}
      <Benefits />
      <Stats />
    </main>
  )
}
