import Container from "@/components/common/Container";
import UserHeader from "@/components/user/UserHeader";
import { useState } from "react";

export default function UserPage() {
  const [active, setActive] = useState<string>("history");
  return (
    <Container className="py-0 min-h-screen">
      {/* "user header" */}
      <UserHeader active={active} setActive={setActive} />
    </Container>
  );
}
