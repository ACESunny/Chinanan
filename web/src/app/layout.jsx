// Vercel
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

// Shadcn
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"

// Styles
import "./globals.css";

export const metadata = {
  title: "Chinanan Thailand",
  description: "Chinanan Thailand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
