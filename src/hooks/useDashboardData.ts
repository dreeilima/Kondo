import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Incident } from "@/components/dashboard/IncidentsSection";
import { Alert } from "@/components/dashboard/AlertsSection";

export interface DashboardStats {
  totalIncidents: number;
  openIncidents: number;
  resolvedIncidents: number;
  totalAlerts: number;
  myIncidents: number;
}

export const useDashboardData = () => {
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalIncidents: 0,
    openIncidents: 0,
    resolvedIncidents: 0,
    totalAlerts: 0,
    myIncidents: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Buscar incidentes recentes
      const { data: incidentsData, error: incidentsError } = await supabase
        .from("incidents")
        .select(
          "id, sequential_id, title, status, created_at, description, response, closing_note"
        )
        .order("created_at", { ascending: false })
        .limit(5);

      if (incidentsError) throw incidentsError;
      setRecentIncidents(incidentsData || []);

      // Buscar alertas recentes
      const { data: alertsData, error: alertsError } = await supabase
        .from("alerts")
        .select("id, sequential_id, title, created_at, description")
        .order("created_at", { ascending: false })
        .limit(5);

      if (alertsError) throw alertsError;
      setRecentAlerts(alertsData || []);

      // Buscar estatísticas
      await fetchStats();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Buscar total de incidentes
      const { count: totalIncidents } = await supabase
        .from("incidents")
        .select("*", { count: "exact", head: true });

      // Buscar incidentes abertos
      const { count: openIncidents } = await supabase
        .from("incidents")
        .select("*", { count: "exact", head: true })
        .eq("status", "Aberto");

      // Buscar incidentes resolvidos
      const { count: resolvedIncidents } = await supabase
        .from("incidents")
        .select("*", { count: "exact", head: true })
        .eq("status", "Resolvido");

      // Buscar total de alertas
      const { count: totalAlerts } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true });

      // Buscar meus incidentes (se usuário logado)
      let myIncidents = 0;
      if (user) {
        const { count } = await supabase
          .from("incidents")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        myIncidents = count || 0;
      }

      setStats({
        totalIncidents: totalIncidents || 0,
        openIncidents: openIncidents || 0,
        resolvedIncidents: resolvedIncidents || 0,
        totalAlerts: totalAlerts || 0,
        myIncidents,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    recentIncidents,
    recentAlerts,
    stats,
    loading,
    fetchData,
  };
};
