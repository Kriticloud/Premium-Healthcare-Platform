
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Required app root element is missing.");
}

createRoot(rootElement).render(<App />);
  