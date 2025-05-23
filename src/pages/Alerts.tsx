import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AlertFilters from "@/components/alerts/AlertFilters";
import AlertsTable from "@/components/alerts/AlertsTable";
import AlertDialog from "@/components/alerts/AlertDialog";
import NewAlertDialog from "@/components/alerts/NewAlertDialog";
import { useAlerts } from "@/hooks/useAlerts";
import PageLayout from "@/components/layout/PageLayout";

const Alerts: React.FC = () => {
  const {
    isSindico,
    searchQuery,
    setSearchQuery,
    selectedAlert,
    alertDialogOpen,
    setAlertDialogOpen,
    newAlertOpen,
    setNewAlertOpen,
    newAlertTitle,
    setNewAlertTitle,
    newAlertDescription,
    setNewAlertDescription,
    submitting,
    loading,
    handleAlertClick,
    handleCreateAlert,
    filteredAlerts,
    alerts,
  } = useAlerts();

  return (
    <PageLayout
      title="Avisos"
      subtitle="Visualize e gerencie os avisos do condomínio"
      headerActions={
        isSindico ? (
          <Button
            onClick={() => setNewAlertOpen(true)}
            className="bg-kondo-primary hover:bg-kondo-secondary text-white shadow-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Novo aviso
          </Button>
        ) : undefined
      }
    >
      <AlertFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <AlertsTable
        alerts={alerts}
        loading={loading}
        filteredAlerts={filteredAlerts}
        handleAlertClick={handleAlertClick}
      />

      <AlertDialog
        selectedAlert={selectedAlert}
        alertDialogOpen={alertDialogOpen}
        setAlertDialogOpen={setAlertDialogOpen}
      />

      <NewAlertDialog
        newAlertOpen={newAlertOpen}
        setNewAlertOpen={setNewAlertOpen}
        newAlertTitle={newAlertTitle}
        setNewAlertTitle={setNewAlertTitle}
        newAlertDescription={newAlertDescription}
        setNewAlertDescription={setNewAlertDescription}
        handleCreateAlert={handleCreateAlert}
        submitting={submitting}
      />
    </PageLayout>
  );
};

export default Alerts;
