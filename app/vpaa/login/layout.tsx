export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout bypasses the parent vpaa layout
  return <>{children}</>;
}