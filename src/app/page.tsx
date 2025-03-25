"use client";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/store/global";

const Header = dynamic(() => import("@/components/Header"));
const Setting = dynamic(() => import("@/components/Setting"));
const Topic = dynamic(() => import("@/components/Research/Topic"));
const Feedback = dynamic(() => import("@/components/Research/Feedback"));
const SearchResult = dynamic(
  () => import("@/components/Research/SearchResult")
);
const FinalReport = dynamic(() => import("@/components/Research/FinalReport"));
const History = dynamic(() => import("@/components/History"));

function Home() {
  const { t } = useTranslation();
  const globalStore = useGlobalStore();

  return (
    <div className="max-w-screen-md mx-auto px-4">
      <Header />
      <main>
        <Topic />
        <Feedback />
        <SearchResult />
        <FinalReport />
      </main>
      <footer className="my-4 text-center text-sm text-gray-600">
        <a href="https://github.com/u14app/" target="_blank">
          {t("copyright", {
            name: "U14App",
          })}
        </a>
      </footer>
      <aside>
        <Setting
          open={globalStore.openSetting}
          onClose={() => globalStore.setOpenSetting(false)}
        />
        <History
          open={globalStore.openHistory}
          onClose={() => globalStore.setOpenHistory(false)}
        />
      </aside>
    </div>
  );
}

export default Home;
