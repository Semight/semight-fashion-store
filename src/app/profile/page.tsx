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

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return await response.json();
};

const updateUserProfile = async (userId: string, userProfile: UserProfile): Promise<UserProfile> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

  // Assuming user ID is available somehow
  const userId = "some-user-id";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(userId);
        setProfile(userProfile);
        setUpdatedProfile(userProfile);
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

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
        const updated = await updateUserProfile(userId, updatedProfile);
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

      <div className="shadow-custom border p-5 flex items-center m-[10rem]">
      <div>
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {isLoading && <p>Loading profile...</p>}
        {error && <p className="text-danger">{error}</p>}
        {profile && !isLoading && !error && (
          <Form>
            <Form.Group controlId="formProfileName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={isEditing ? updatedProfile?.name || "" : profile.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formProfileEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={isEditing ? updatedProfile?.email || "" : profile.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formProfilePassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={isEditing ? updatedProfile?.password || "" : "••••••••"}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              {isEditing ? (
                <>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave} className="ml-2">
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
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
