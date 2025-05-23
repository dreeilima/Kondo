import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
  User,
  TrendingUp,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { DashboardStats } from "@/hooks/useDashboardData";

interface StatsSectionProps {
  stats: DashboardStats;
  loading: boolean;
  isAdmin: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  loading,
  isAdmin,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div
              className="rounded-lg h-32"
              style={{ backgroundColor: "var(--muted)" }}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  const adminStats = [
    {
      title: "Total de Incidentes",
      value: stats.totalIncidents,
      icon: AlertTriangle,
      description: "Todos os incidentes registrados",
      color: "blue" as const,
    },
    {
      title: "Incidentes Abertos",
      value: stats.openIncidents,
      icon: Clock,
      description: "Aguardando resolução",
      color: "red" as const,
    },
    {
      title: "Incidentes Resolvidos",
      value: stats.resolvedIncidents,
      icon: CheckCircle,
      description: "Finalizados com sucesso",
      color: "green" as const,
    },
    {
      title: "Total de Avisos",
      value: stats.totalAlerts,
      icon: Bell,
      description: "Avisos publicados",
      color: "yellow" as const,
    },
  ];

  const userStats = [
    {
      title: "Meus Incidentes",
      value: stats.myIncidents,
      icon: User,
      description: "Incidentes que você registrou",
      color: "purple" as const,
    },
    {
      title: "Incidentes Abertos",
      value: stats.openIncidents,
      icon: Clock,
      description: "Aguardando resolução",
      color: "red" as const,
    },
    {
      title: "Incidentes Resolvidos",
      value: stats.resolvedIncidents,
      icon: CheckCircle,
      description: "Finalizados com sucesso",
      color: "green" as const,
    },
    {
      title: "Avisos Ativos",
      value: stats.totalAlerts,
      icon: Bell,
      description: "Avisos do condomínio",
      color: "yellow" as const,
    },
  ];

  const statsToShow = isAdmin ? adminStats : userStats;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp size={20} style={{ color: "var(--destructive)" }} />
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {isAdmin ? "Estatísticas Gerais" : "Suas Estatísticas"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsToShow.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
