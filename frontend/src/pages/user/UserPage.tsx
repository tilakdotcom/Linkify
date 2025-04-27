import Container from "@/components/common/Container";
import UnderDevelopment from "@/components/common/UnderDevelopment";
import UserHeader from "@/components/user/UserHeader";
import UserHistory from "@/components/user/UserHistory";
import UserSetting from "@/components/user/UserSetting";
import UserShortner from "@/components/user/UserShortner";
import { setActivePage } from "@/store/auth/authSlice";
import { useAppDispatch, useTypeSelector } from "@/store/store";

export default function UserPage() {
  const { activiePage } = useTypeSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleOnSetActivePage = (page: string) => {
    dispatch(setActivePage(page));
  };

  return (
    <Container className="py-0 min-h-screen">
      {/* "user header" */}
      <UserHeader
        className="hidden sm:flex"
        active={activiePage}
        setActive={handleOnSetActivePage}
      />
      <div className="py-5">
        {activiePage === "shortner" && <UserShortner />}
        {activiePage === "history" && <UserHistory />}
        {activiePage === "statistics" && <UnderDevelopment />}
        {activiePage === "clicks" && <UnderDevelopment />}
        {activiePage === "settings" && <UserSetting />}
      </div>
    </Container>
  );
}
