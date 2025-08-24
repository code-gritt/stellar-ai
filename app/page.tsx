import {
  Features,
  Tutorial,
  Customers,
  Footer,
  Header,
  Hero,
  Teams,
  Steps,
  Changelog,
} from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Teams />
      <Steps />
      <Changelog />
      <Features />
      <Tutorial />
      <Customers />
      <Footer />
    </>
  );
}
