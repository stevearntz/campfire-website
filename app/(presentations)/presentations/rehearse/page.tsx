import { requireLearner } from "../../_lib/learner";
import { Rehearse } from "./Rehearse";

export default async function RehearsePage() {
  await requireLearner();
  return <Rehearse />;
}
