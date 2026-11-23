import Hero from "@/components/Hero";
import ShowcaseMarquee from "@/components/ShowcaseMarquee";
import TechStack from "@/components/TechStack";
import ScrollText from "@/components/ScrollText";
import Localization from "@/components/Localization";
import DemoSelector from "@/components/DemoSelector";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowcaseMarquee />
      <TechStack />
      <ScrollText />
      <Localization />
      <DemoSelector />
      <CallToAction />
    </>
  );
}
