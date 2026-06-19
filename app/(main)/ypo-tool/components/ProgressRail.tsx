"use client";

import { CIRCLES, type Responses } from "../lib/behaviors";

export default function ProgressRail({ responses }: { responses: Responses }) {
  return (
    <div className="flex gap-0.5">
      {CIRCLES.flatMap((circle) =>
        circle.items.map((item) => {
          const answered = responses[item.key] != null;
          return (
            <div
              key={item.key}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{
                background: answered ? circle.color : "#EEE9F6",
              }}
            />
          );
        }),
      )}
    </div>
  );
}
