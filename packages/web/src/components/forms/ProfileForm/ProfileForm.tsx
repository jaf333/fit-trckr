import React from 'react';
import { useForm } from 'react-hook-form';
import { ProfileFormData } from '../../../types/profile';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => void;
  isLoading?: boolean;
}

const activityLevels = [
  { value: 'SEDENTARY', label: 'Sedentary' },
  { value: 'LIGHT', label: 'Light Activity' },
  { value: 'MODERATE', label: 'Moderate Activity' },
  { value: 'VERY_ACTIVE', label: 'Very Active' },
  { value: 'EXTREME', label: 'Extreme Activity' }
];

const fitnessGoalsOptions = [
  'Weight Loss',
  'Muscle Gain',
  'Endurance',
  'Flexibility',
  'General Fitness'
];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName', { required: 'First name is required' })}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName', { required: 'Last name is required' })}
          error={errors.lastName?.message}
        />
      </div>

      <Input
        type="date"
        label="Date of Birth"
        {...register('dateOfBirth', { required: 'Date of birth is required' })}
        error={errors.dateOfBirth?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          label="Height (cm)"
          {...register('height', {
            required: 'Height is required',
            min: { value: 50, message: 'Height must be at least 50cm' },
            max: { value: 300, message: 'Height must be less than 300cm' }
          })}
          error={errors.height?.message}
        />
        <Input
          type="number"
          label="Current Weight (kg)"
          {...register('weight', {
            required: 'Weight is required',
            min: { value: 20, message: 'Weight must be at least 20kg' },
            max: { value: 500, message: 'Weight must be less than 500kg' }
          })}
          error={errors.weight?.message}
        />
        <Input
          type="number"
          label="Goal Weight (kg)"
          {...register('goalWeight', {
            required: 'Goal weight is required',
            min: { value: 20, message: 'Goal weight must be at least 20kg' },
            max: { value: 500, message: 'Goal weight must be less than 500kg' }
          })}
          error={errors.goalWeight?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Activity Level
        </label>
        <select
          {...register('activityLevel', { required: 'Activity level is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select activity level</option>
          {activityLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        {errors.activityLevel && (
          <p className="text-red-500 text-sm">{errors.activityLevel.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Fitness Goals
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {fitnessGoalsOptions.map(goal => (
            <label key={goal} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={goal}
                {...register('fitnessGoals')}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
};
