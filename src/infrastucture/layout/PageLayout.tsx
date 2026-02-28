import  { type ReactNode } from "react";
import Sidebar from "../componentes/Sidebar/Sidebar";
import Header from "../components/Header/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
          {children}
        </main>
      </div>
    </div>
  );
}
