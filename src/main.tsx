import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
