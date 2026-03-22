import type { ReactNode } from "react";

import { AppShell } from "@/components/crm/app-shell";

export default function CrmLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
