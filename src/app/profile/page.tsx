"use client";
import Navbar from "@/components/Navbar/NavBar";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('http://localhost:8000/api/users/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return await response.json();
};

const updateUserProfile = async (userProfile: UserProfile): Promise<UserProfile> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('http://localhost:8000/api/users/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userProfile),
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  return await response.json();
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setUpdatedProfile(userProfile);
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedProfile) {
      setUpdatedProfile({
        ...updatedProfile,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (updatedProfile) {
      try {
        const updated = await updateUserProfile(updatedProfile);
        setProfile(updated);
        setIsEditing(false);
      } catch (error) {
        setError('Failed to save profile');
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-[5rem]"></div>

      <div className="shadow-custom border-none rounded-xl p-5 flex items-center m-[10rem]">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          {isLoading && <p>Loading profile...</p>}
          {error && <p className="text-danger">{error}</p>}
          {profile && !isLoading && !error && (
            <Form>
              <Form.Group controlId="formProfileName" className="flex items-center gap-1 mb-2">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={isEditing ? updatedProfile?.name || "" : profile.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="text-lg text-secondary font-semibold pl-2"
                />
              </Form.Group>
              <Form.Group controlId="formProfileEmail" className="flex items-center gap-1 mb-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={isEditing ? updatedProfile?.email || "" : profile.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="text-lg text-secondary font-semibold pl-2"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                {isEditing ? (
                  <>
                    <Button variant="secondary" onClick={() => setIsEditing(false)} className="px-4 p-2 rounded-lg text-white bg-danger">
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} className="px-4 p-2 rounded-lg text-white bg-secondary ml-2">
                      Save
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => setIsEditing(true)} className="px-4 p-2 rounded-lg text-white bg-secondary">
                    Edit
                  </Button>
                )}
              </Form.Group>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
