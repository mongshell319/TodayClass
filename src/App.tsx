import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { SchoolQuest } from "./components/SchoolQuest";
import { SchoolLife } from "./components/SchoolLife";
import { StudentRecord } from "./components/StudentRecord";

type AppView = "home" | "dashboard" | "school-quest" | "school-life" | "student-record";

export default function App() {
  const [currentView, setCurrentView] =
    useState<AppView>("home");

  const handleNavigateToTeacherDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleNavigateToSchoolQuest = () => {
    setCurrentView("school-quest");
  };

  const handleNavigateToSchoolLife = () => {
    setCurrentView("school-life");
  };

  const handleNavigateToStudentRecord = () => {
    setCurrentView("student-record");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  return (
    <>
      {currentView === "home" && (
        <LandingPage
          onNavigateToTeacherDashboard={
            handleNavigateToTeacherDashboard
          }
          onNavigateToSchoolQuest={handleNavigateToSchoolQuest}
          onNavigateToSchoolLife={handleNavigateToSchoolLife}
          onNavigateToStudentRecord={handleNavigateToStudentRecord}
        />
      )}
      {currentView === "dashboard" && (
        <TeacherDashboard
          onNavigateToSchoolQuest={handleNavigateToSchoolQuest}
          onBack={handleBackToHome}
        />
      )}
      {currentView === "school-quest" && (
        <SchoolQuest onBack={handleBackToHome} />
      )}
      {currentView === "school-life" && (
        <SchoolLife onBack={handleBackToHome} />
      )}
      {currentView === "student-record" && (
        <StudentRecord onBack={handleBackToHome} />
      )}
    </>
  );
}