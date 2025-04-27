import Container from "@/components/common/Container";
import UnderDevelopment from "@/components/common/UnderDevelopment";
import UserHeader from "@/components/user/UserHeader";
import UserHistory from "@/components/user/UserHistory";
import UserSetting from "@/components/user/UserSetting";
import UserShortner from "@/components/user/UserShortner";
import { useState } from "react";

export default function UserPage() {
  const [active, setActive] = useState<string>("shortner");
  
  return (
    <Container className="py-0 min-h-screen">
      {/* "user header" */}
      <UserHeader className="hidden sm:flex" active={active} setActive={setActive} />
      <div className="py-5">
        {active === "shortner" && <UserShortner />}
        {active === "history" && <UserHistory />}
        {active === "statistics" && <UnderDevelopment />}
        {active === "clicks" && <UnderDevelopment />}
        {active === "settings" && <UserSetting />}
      </div>
    </Container>
  );
}
