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
  NoOverflow,
} from '@/components';

export default function Home() {
  return (
    <NoOverflow>
      <Header />
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
