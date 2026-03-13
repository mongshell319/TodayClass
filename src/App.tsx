import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { SchoolQuest } from "./components/SchoolQuest";
import { SchoolLife } from "./components/SchoolLife";
import { StudentRecord } from "./components/StudentRecord";

type AppView = "home" | "dashboard" | "school-quest" | "school-life" | "student-record";

const VIEW_TO_HASH: Record<AppView, string> = {
  home: "",
  dashboard: "dashboard",
  "school-quest": "school-quest",
  "school-life": "school-life",
  "student-record": "student-record",
};

const HASH_TO_VIEW: Record<string, AppView> = Object.fromEntries(
  Object.entries(VIEW_TO_HASH).map(([k, v]) => [v, k as AppView])
);

function getViewFromHash(): AppView {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return HASH_TO_VIEW[hash] ?? "home";
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(getViewFromHash);

  // URL 해시 → 상태 동기화 (뒤로가기/앞으로가기 지원)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 상태 → URL 해시 동기화
  const navigateTo = (view: AppView) => {
    const hash = VIEW_TO_HASH[view];
    window.location.hash = hash ? `#${hash}` : "#";
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "home" && (
        <LandingPage
          onNavigateToTeacherDashboard={() => navigateTo("dashboard")}
          onNavigateToSchoolQuest={() => navigateTo("school-quest")}
          onNavigateToSchoolLife={() => navigateTo("school-life")}
          onNavigateToStudentRecord={() => navigateTo("student-record")}
        />
      )}
      {currentView === "dashboard" && (
        <TeacherDashboard
          onNavigateToSchoolQuest={() => navigateTo("school-quest")}
          onBack={() => navigateTo("home")}
        />
      )}
      {currentView === "school-quest" && (
        <SchoolQuest onBack={() => navigateTo("home")} />
      )}
      {currentView === "school-life" && (
        <SchoolLife onBack={() => navigateTo("home")} />
      )}
      {currentView === "student-record" && (
        <StudentRecord onBack={() => navigateTo("home")} />
      )}
    </>
  );
}
