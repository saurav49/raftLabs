import { useState } from "react";
import "./App.css";
import { Navbar, Modal, Connection } from "./components/index";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="App">
      <Navbar setShowModal={setShowModal} />
      {showModal && <Modal setShowModal={setShowModal} />}
      <div className="w-full min-h-screen flex mt-16">
        <Connection />
      </div>
    </div>
  );
}

export default App;
