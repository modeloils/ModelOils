import { useEffect, useState, type ReactNode } from "react";
import { CONTACT } from "@/lib/site-data";

export function useSafeEmail() {
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    setEmail(CONTACT.email);
  }, []);

  return {
    email,
    displayEmail: email ?? CONTACT.emailDisplay,
    mailto: email ? `mailto:${email}` : undefined,
  };
}

export function SafeEmailLink({
  className,
  children,
}: {
  className?: string;
  children: (displayEmail: string) => ReactNode;
}) {
  const { displayEmail, mailto } = useSafeEmail();

  return (
    <a href={mailto} className={className}>
      {children(displayEmail)}
    </a>
  );
}
