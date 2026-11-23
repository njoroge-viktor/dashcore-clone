import ShowcaseShell from "@/components/showcase/ShowcaseShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ShowcaseShell>{children}</ShowcaseShell>;
}
