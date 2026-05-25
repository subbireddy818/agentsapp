import AgentSidebar from "@/components/AgentSidebar";
import AgentBottomNav from "@/components/AgentBottomNav";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800">
      {/* Desktop Sidebar navigation - hidden on mobile view */}
      <div className="hidden lg:block shrink-0">
        <AgentSidebar />
      </div>

      {/* Main app body */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 lg:pb-8">
          {children}
        </main>
        
        {/* PWA Mobile Bottom Navigation */}
        <AgentBottomNav />
      </div>
    </div>
  );
}
