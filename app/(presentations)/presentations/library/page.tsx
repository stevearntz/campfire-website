import { Icon } from "../../_components/Icon";
import { RESOURCES } from "../../_data/course";
import { requireLearner } from "../../_lib/learner";
import { getJournalEntries } from "../../_lib/db";

export default async function LibraryPage() {
  const { enrollment } = await requireLearner();
  const entries = await getJournalEntries(enrollment.id);

  return (
    <div className="max-w-[1000px] px-12 pt-11 pb-[70px]">
      <div className="text-[12px] font-bold tracking-[0.18em] text-cf-purple-600 uppercase">
        Templates &amp; notes
      </div>
      <h1 className="mt-3 text-[38px] font-bold tracking-[-0.015em] text-cf-indigo-700">
        Everything you can take with you
      </h1>

      <div className="mt-[30px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border border-cf-gray-100 bg-white p-6"
          >
            <Icon name={r.icon} className="text-[26px] text-cf-purple-600" />
            <div className="mt-3 text-[17px] leading-[1.35] font-bold text-cf-indigo-700">
              {r.title}
            </div>
            <div className="mt-[6px] text-sm leading-[1.55] text-cf-gray-500">
              {r.desc}
            </div>
            <div className="mt-[14px] cursor-pointer text-[12px] font-bold tracking-[0.12em] text-cf-purple-600 uppercase">
              {r.action}
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-11 text-[26px] font-bold text-cf-indigo-700">
        Your journal
      </h3>
      <p className="mt-2 text-[16px] text-cf-gray-500">
        Private by default. Share an entry when you want your coach to see it.
      </p>
      <div className="mt-[22px] flex flex-col gap-[14px]">
        {entries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cf-gray-200 bg-cf-gray-50 px-6 py-8 text-center">
            <Icon name="edit_note" className="text-[32px] text-cf-purple-300" />
            <div className="mt-3 text-[16px] font-bold text-cf-indigo-700">
              Your journal is empty
            </div>
            <div className="mt-[6px] text-[14px] leading-[1.55] text-cf-gray-500">
              Reflections you write in a module&apos;s Check &amp; reflect tab
              show up here — private until you share them.
            </div>
          </div>
        ) : (
          entries.map((j) => (
            <div
              key={j.id}
              className="rounded-xl border border-cf-gray-100 bg-white px-6 py-[22px]"
            >
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-bold tracking-[0.14em] text-cf-gray-500 uppercase">
                  {j.moduleSlug
                    ? "Module " + j.moduleSlug + " · reflection"
                    : "Reflection"}
                </div>
                <span className="text-[12px] text-cf-gray-400">
                  {new Date(j.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="mt-[10px] text-[16px] leading-[1.65] text-cf-gray-600">
                {j.body}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
