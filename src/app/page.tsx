import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold">Hello</h2>
          {/* Add your main content here */}
        </main>
      </div>
    </div>
  );
}
