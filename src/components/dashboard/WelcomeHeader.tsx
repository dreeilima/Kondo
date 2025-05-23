import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, MapPin, Clock } from "lucide-react";
import { UserProfile } from "@/hooks/useUserProfile";

interface WelcomeHeaderProps {
  profile: UserProfile | null;
  loading: boolean;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ profile, loading }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-kondo-primary to-kondo-secondary text-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-white/20 rounded w-48 mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-32"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="bg-gradient-to-r from-kondo-primary to-kondo-secondary text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">{getGreeting()}!</h1>
          <p className="text-white/90">{getCurrentDate()}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-kondo-primary to-kondo-secondary text-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/20">
            <AvatarFallback className="bg-white/10 text-white text-lg font-semibold">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">
                {getGreeting()}, {profile.full_name.split(" ")[0]}!
              </h1>
              <Badge
                variant="secondary"
                className={`${
                  profile.role === "sindico"
                    ? "bg-yellow-500/20 text-yellow-100 border-yellow-400/30"
                    : "bg-blue-500/20 text-blue-100 border-blue-400/30"
                }`}
              >
                {profile.role === "sindico" ? "Síndico" : "Morador"}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span className="text-sm">
                  Bloco {profile.block}, Apt {profile.apartment}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span className="text-sm">{getCurrentDate()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 right-8 w-20 h-20 bg-white/5 rounded-full translate-y-10"></div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
