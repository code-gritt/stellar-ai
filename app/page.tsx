import {
  Features,
  Tutorial,
  Customers,
  Footer,
  Hero,
  Teams,
  Steps,
  Changelog,
  NoOverflow,
} from '@/components';

export default function Home() {
  return (
    <NoOverflow>
      <a id="top"></a>

      <Hero />
      <Teams />
      <Steps />
      <Changelog />
      <Features />
      <Tutorial />
      <Customers />
      <Footer />
    </NoOverflow>
  );
}
