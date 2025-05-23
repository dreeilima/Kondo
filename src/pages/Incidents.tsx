import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncidents, Incident } from "@/hooks/useIncidents";
import IncidentsTable from "@/components/incidents/IncidentsTable";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentDetailOverlay from "@/components/incidents/IncidentDetailOverlay";
import PageLayout from "@/components/layout/PageLayout";

const Incidents: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    incidents,
    loading,
    isAdmin,
    submitting,
    handleResponse,
    handleResolve,
  } = useIncidents();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    setSelectedIncident(null);
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout
      title="Incidentes"
      subtitle="Gerencie e acompanhe todos os incidentes do condomínio"
      headerActions={
        <Link to="/incidents/new">
          <Button className="bg-kondo-accent hover:bg-kondo-accent/90 text-white shadow-lg flex items-center gap-2">
            <Plus size={18} />
            Registrar novo incidente
          </Button>
        </Link>
      }
    >
      <IncidentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <IncidentsTable
        incidents={incidents}
        loading={loading}
        onIncidentClick={handleIncidentClick}
        filteredIncidents={filteredIncidents}
      />

      <IncidentDetailOverlay
        open={overlayOpen}
        onOpenChange={setOverlayOpen}
        selectedIncident={selectedIncident}
        isMobile={isMobile}
        isAdmin={isAdmin}
        submitting={submitting}
        onResponse={handleResponse}
        onResolve={handleResolve}
        onClose={closeOverlay}
      />
    </PageLayout>
  );
};

export default Incidents;
