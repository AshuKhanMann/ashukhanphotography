import Hero from "@/components/home/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesOverview />
      <Testimonials />
      <CallToAction />
    </>
  );
}
