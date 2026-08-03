"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMember } from "../lib/useMember";
import AppHeader from "../components/AppHeader";
import InvitePeers from "../components/InvitePeers";

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#9D88ED] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function InvitePageClient() {
  const router = useRouter();
  const { loading, user, assessment } = useMember();

  useEffect(() => {
    if (!loading && !assessment) router.replace("/ypo-tool");
  }, [loading, assessment, router]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-white">
      <AppHeader email={user?.email} />
      <InvitePeers
        onBack={() => router.push("/ypo-tool/results")}
        onViewComparison={() => router.push("/ypo-tool/compare")}
        onViewPeer={(id) => router.push(`/ypo-tool/compare?peer=${id}`)}
      />
    </div>
  );
}
