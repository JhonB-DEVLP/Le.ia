import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Two from "@/components/sections/Two";
import Three from "@/components/sections/Three";
import Four from "@/components/sections/Four";
import Five from "@/components/sections/Five";
import Six from "@/components/sections/Six";
import Seven from "@/components/sections/Seven";
import Eight from "@/components/sections/Eight";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Two />
        <Three />
        <Four />
        <Five />
        <Six />
        <Seven />
        <Eight />
      </main>
      <Footer />
    </>
  );
}
