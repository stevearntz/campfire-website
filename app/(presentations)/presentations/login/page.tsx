import { redirect } from "next/navigation";
import { getCurrentLearner } from "../../_lib/learner";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const learner = await getCurrentLearner();
  if (learner) redirect("/presentations");

  const { error } = await searchParams;
  return <LoginForm error={error} />;
}
