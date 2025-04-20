import Container from "@/components/common/Container";
import UnderDevelopment from "@/components/common/UnderDevelopment";
import UserHeader from "@/components/user/UserHeader";
import UserHistory from "@/components/user/UserHistory";
import { useState } from "react";

export default function UserPage() {
  const [active, setActive] = useState<string>("history");
  return (
    <Container className="py-0 min-h-screen">
      {/* "user header" */}
      <UserHeader active={active} setActive={setActive} />
      {active === "history" && <UserHistory />}
      {active === "statistics" && <UnderDevelopment />}
      {active === "clicks" && <UnderDevelopment />}
    </Container>
  );
}
