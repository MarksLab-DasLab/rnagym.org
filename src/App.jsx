import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Download from "./pages/Download";
import Layout from "./pages/Layout";
import Benchmarks from "./pages/Benchmarks";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="benchmarks" element={<Benchmarks />} />
            <Route path="download" element={<Download />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="about" element={<About />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
