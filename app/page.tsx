import { TanstackProvider } from "@/utils/providers/TanstackProvider";

import { DashboardPage } from "@/pages/DashboardPage";

export default function Home() {
  return (
    <TanstackProvider>
      <DashboardPage />
    </TanstackProvider>
  );
}
