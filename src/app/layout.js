import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Provider } from "react-redux";
import StoreProvider from "../../redux/StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Delivery",
  description: "Created By Priyanshu Negi",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
