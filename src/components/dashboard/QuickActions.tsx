import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Plus,
  AlertTriangle,
  Bell,
  Users,
  FileText,
  Settings,
  Eye,
  UserPlus,
} from "lucide-react";

interface QuickActionsProps {
  isAdmin: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ isAdmin }) => {
  const commonActions = [
    {
      title: "Novo Incidente",
      description: "Registrar um novo incidente",
      icon: Plus,
      href: "/incidents/new",
      color: "bg-red-50 hover:bg-red-100 text-red-600 border-red-200",
    },
    {
      title: "Ver Incidentes",
      description: "Visualizar todos os incidentes",
      icon: Eye,
      href: "/incidents",
      color: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200",
    },
    {
      title: "Ver Avisos",
      description: "Consultar avisos do condomínio",
      icon: Bell,
      href: "/alerts",
      color:
        "bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-yellow-200",
    },
    {
      title: "Meu Perfil",
      description: "Atualizar informações pessoais",
      icon: Settings,
      href: "/profile",
      color: "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200",
    },
  ];

  const adminActions = [
    {
      title: "Gerenciar Usuários",
      description: "Administrar moradores",
      icon: Users,
      href: "/users",
      color:
        "bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200",
    },
    {
      title: "Novo Aviso",
      description: "Criar aviso para moradores",
      icon: FileText,
      href: "/alerts",
      color: "bg-green-50 hover:bg-green-100 text-green-600 border-green-200",
    },
    {
      title: "Criar Admin",
      description: "Adicionar novo síndico",
      icon: UserPlus,
      href: "/admin",
      color:
        "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200",
    },
  ];

  const actions = isAdmin ? [...commonActions, ...adminActions] : commonActions;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle size={20} className="text-kondo-accent" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="flex-1 min-w-[140px] max-w-[300px]"
            >
              <Button
                variant="outline"
                className={`w-full h-auto p-4 flex flex-col items-center gap-3 ${action.color} transition-all duration-200 hover:scale-105 min-h-[100px]`}
              >
                <action.icon size={24} />
                <div className="text-center">
                  <div className="font-medium text-sm leading-tight">
                    {action.title}
                  </div>
                  <div className="text-xs opacity-70 mt-1 leading-tight">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
