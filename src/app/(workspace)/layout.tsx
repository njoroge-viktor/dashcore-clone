import Navbar from "@/components/Navbar";
import WorkspaceShell from "@/components/workspace/Shell";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <WorkspaceShell>{children}</WorkspaceShell>
      </main>
    </>
  );
}
