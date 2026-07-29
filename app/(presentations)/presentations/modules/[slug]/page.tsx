import { MODULES } from "../../../_data/course";
import ModuleView from "./ModuleView";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseModule = MODULES.find((m) => m.slug === slug) ?? MODULES[0];
  return <ModuleView module={courseModule} />;
}
