import React from 'react';
import links from "../../constants/links";
import { Header, Footer, Introduction, Conclusion, DevicePreview } from '../../components';

const SectionTitle = ({ title }) => {
  return (
    <>
      <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">{title}</h1>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Introduction link="#test" caption="Check My Solution!" />

      <section className="bg-white border-b py-8" id="test">
        <div className="container mx-auto my-8 pt-12">
          <SectionTitle title="Solution" />
          <DevicePreview link={links.networth} styles={{ width: "100%", height: "70vh" }} />
        </div>
      </section>

      <Conclusion />
      <Footer />
    </div>
  );
}

export default App;
