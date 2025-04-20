import Container from "@/components/common/Container";
import UserHeader from "@/components/user/UserHeader";

export default function UserPage() {
  return (
    <Container className="py-0 min-h-screen">
      {/* "user header" */}
      <UserHeader />
    </Container>
  );
}
