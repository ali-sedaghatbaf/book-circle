// This layout is a remnant from before internationalization was added.
// It is now simplified to just render its children, which are redirecting pages.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
