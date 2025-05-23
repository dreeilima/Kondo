import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/components/AuthProvider";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useCheckRole } from "@/hooks/useCheckRole";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserRole } from "@/hooks/useUserRole";
import AlertsSection from "@/components/dashboard/AlertsSection";
import IncidentsSection from "@/components/dashboard/IncidentsSection";
import DetailOverlay from "@/components/dashboard/DetailOverlay";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import QuickActions from "@/components/dashboard/QuickActions";
import { Incident } from "@/components/dashboard/IncidentsSection";
import { Alert } from "@/components/dashboard/AlertsSection";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { recentIncidents, recentAlerts, stats, loading } = useDashboardData();
  const { isSindico } = useCheckRole(user);
  const { profile, loading: profileLoading } = useUserProfile();
  const { isAdmin } = useUserRole();

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setSelectedAlert(null);
    setOverlayOpen(true);
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setSelectedIncident(null);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-background to-muted/30 h-full transition-colors duration-300">
      <div className="p-4 sm:p-6 space-y-6 max-w-none">
        <WelcomeHeader profile={profile} loading={profileLoading} />

        <StatsSection stats={stats} loading={loading} isAdmin={isAdmin} />

        <QuickActions isAdmin={isAdmin} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncidentsSection
            incidents={recentIncidents}
            loading={loading}
            onIncidentClick={handleIncidentClick}
          />
          <AlertsSection
            alerts={recentAlerts}
            loading={loading}
            isSindico={isSindico}
            onAlertClick={handleAlertClick}
          />
        </div>

        <DetailOverlay
          open={overlayOpen}
          onOpenChange={setOverlayOpen}
          selectedIncident={selectedIncident}
          selectedAlert={selectedAlert}
          isMobile={isMobile}
          onClose={closeOverlay}
        />
      </div>
    </div>
  );
};

export default Dashboard;
