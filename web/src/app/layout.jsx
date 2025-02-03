// Vercel
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

// Shadcn
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/ui/app-sidebar"

// Components
import Header from "../components/header";
import Footer from "../components/footer";

// Styles
import "./globals.css";

export const metadata = {
  title: "Chinanan Thailand",
  description: "Chinanan Thailand",
};

export default function RootLayout({ children }) {
  return (

    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
        <Header />
        <Footer />
  
      <SpeedInsights />
      <Analytics />
    </SidebarProvider>

  );
}
