import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ChangePasswordDialog } from "@/components/profile/ChangePasswordDialog";
import PageLayout from "@/components/layout/PageLayout";

const Profile: React.FC = () => {
  const { refreshUser } = useAuth();
  const { profile, loading, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleSave = async (
    data: Partial<Omit<UserProfile, "role" | "id" | "email">>
  ) => {
    const result = await updateProfile(data);
    if (!result.error) {
      setIsEditing(false);
      refreshUser();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <PageLayout title="Perfil">
        <div className="h-64 flex items-center justify-center">
          Carregando informações do perfil...
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout title="Perfil">
        <div className="h-64 flex items-center justify-center">
          Erro ao carregar o perfil. Por favor, tente novamente.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Perfil"
      subtitle="Gerencie suas informações pessoais e configurações de conta"
    >
      <Card className="max-w-2xl">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle>Informações pessoais</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ProfileForm
            profile={profile}
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditClick={() => setIsEditing(true)}
          />

          {/* Add change password button when not editing */}
          {!isEditing && (
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setChangePasswordOpen(true)}
              >
                Alterar Senha
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </PageLayout>
  );
};

export default Profile;
