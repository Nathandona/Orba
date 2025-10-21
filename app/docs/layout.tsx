import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}