import { useState, useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateUserFormData, FormErrors } from "@/utils/types/formTypes";

import { createUser } from "@/utils/api/create/user";

const initialFormData: CreateUserFormData = {
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 25,
  gender: "male",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  bloodGroup: "",
  height: undefined,
  weight: undefined,
  eyeColor: "",
  role: "user",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  companyName: "",
  department: "",
  title: "",
};

function validateForm(data: CreateUserFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "Имя обязательно";
  if (!data.lastName.trim()) errors.lastName = "Фамилия обязательна";
  if (!data.email.trim()) errors.email = "Email обязателен";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Неправильный формат email";
  if (!data.phone.trim()) errors.phone = "Телефон обязателен";
  if (!data.username.trim()) errors.username = "Никнейм обязателен";
  if (!data.password.trim()) errors.password = "Пароль обязателен";
  else if (data.password.length < 6) errors.password = "Пароль должен содержать как минимум 6 символов";
  if (!data.birthDate) errors.birthDate = "Дата рождения обязательная";
  if (data.age < 18 || data.age > 100) errors.age = "Возраст должен быть от 18 до 100";

  return errors;
}

interface UseCreateUserReturn {
  formData: CreateUserFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  updateField: <K extends keyof CreateUserFormData>(field: K, value: CreateUserFormData[K]) => void;
  handleSubmit: () => void;
  resetForm: () => void;
}

export function useCreateUser(onSuccess?: () => void): UseCreateUserReturn {
  const [formData, setFormData] = useState<CreateUserFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateUserFormData) => {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        maidenName: data.maidenName,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        username: data.username,
        password: data.password,
        birthDate: data.birthDate,
        bloodGroup: data.bloodGroup || "O+",
        height: data.height || 170,
        weight: data.weight || 70,
        eyeColor: data.eyeColor || "Карие",
        role: data.role,
        address: {
          address: data.address || "Улица Пушкина 8",
          city: data.city || "Москва",
          state: data.state || "Россия",
          stateCode: "Msc",
          postalCode: data.postalCode || "10001",
          coordinates: { lat: 40.7128, lng: -74.006 },
          country: "Россия",
        },
        company: {
          name: data.companyName || "Новая компания",
          department: data.department || "Общий",
          title: data.title || "Работник",
          address: {
            address: data.address || "Улица Пушкина 8",
            city: data.city || "Москва",
            state: data.state || "Россия",
            stateCode: "Msc",
            postalCode: data.postalCode || "10001",
            coordinates: { lat: 40.7128, lng: -74.006 },
            country: "Россия",
          },
        },
      };
      
      return createUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setIsSuccess(true);
      onSuccess?.();
    },
  });

  const updateField = useCallback(<K extends keyof CreateUserFormData>(
    field: K, 
    value: CreateUserFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    
    createMutation.mutate(formData);
  }, [formData, createMutation]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    
    setErrors({});
    setIsSuccess(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting: createMutation.isPending,
    isSuccess,
    updateField,
    handleSubmit,
    resetForm,
  };
}