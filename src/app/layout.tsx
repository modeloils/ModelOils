// Root layout — intentionally minimal.
// The [locale] layout provides <html>, <body>, fonts, and providers.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
