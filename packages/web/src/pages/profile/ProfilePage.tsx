import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProfile, createProfile, updateProfile } from '../../features/profile/profileSlice';
import { ProfileForm } from '../../components/forms/ProfileForm/ProfileForm';
import { Card } from '@/components/ui/Card';
import type { ProfileFormData } from '../../types/profile';
import type { RootState } from '../../types/store';


export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: profile, loading, error } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSubmit = async (formData: ProfileFormData) => {
    if (profile) {
      await dispatch(updateProfile(formData));
    } else {
      await dispatch(createProfile(formData));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {profile ? 'Edit Profile' : 'Create Profile'}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <Card>
        <ProfileForm
          initialData={profile || undefined}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </Card>
    </div>
  );
};
