import { requireLearner } from "../../_lib/learner";
import { getPresentation, getSlides } from "../../_lib/db";
import DeckBuilder, { type BuilderSlide } from "./DeckBuilder";
import AddPresentation from "./AddPresentation";

export default async function DeckPage() {
  const { enrollment } = await requireLearner();
  const presentation = await getPresentation(enrollment.id);

  if (!presentation) {
    return <AddPresentation />;
  }

  const slides = await getSlides(presentation.id);
  const builderSlides: BuilderSlide[] = slides.map((s) => ({
    id: s.id,
    position: s.position,
    beat: s.beat,
    actionTitle: s.actionTitle ?? "",
    speakerNote: s.speakerNote ?? "",
    supportNote: s.supportNote,
  }));

  return (
    <DeckBuilder
      presentationId={presentation.id}
      deckTitle={presentation.title}
      spine={presentation.spine}
      initialSlides={builderSlides}
    />
  );
}
