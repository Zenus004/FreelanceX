import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import FreelancerProfile from '../components/profile/FreelancerProfile';
import ClientProfile from '../components/profile/ClientProfile';
import { Loader2, Star, Mail, Briefcase, MapPin, Calendar, Edit, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { id } = useParams();
    const { user: authUser } = useAuth();
    const navigate = useNavigate();

    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // If id is 'me' or undefined, show own profile
    const isOwnProfile = !id || id === 'me' || id === authUser?._id;

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                let targetId = id;
                if (isOwnProfile) {
                    if (!authUser) {
                        navigate('/login');
                        return;
                    }
                    targetId = authUser._id;
                }

                // Always fetch fresh data from API to ensure stats are up-to-date
                const res = await api.get(`/users/${targetId}`);
                setProfileUser(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError('User not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, authUser, isOwnProfile, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading profile...</p>
            </div>
        </div>
    );

    if (error || !profileUser) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
                <button onClick={() => navigate(-1)} className="text-indigo-600 hover:underline">Go Back</button>
            </div>
        </div>
    );

    const handleEdit = () => {
        setIsEditing(true);
        // Implement modal logic or navigate to settings
        toast('Edit functionality would open a modal here to update fields like Title, Bio, and Hourly Rate.', {
            icon: 'ℹ️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {profileUser.role === 'client' ? (
                <ClientProfile user={profileUser} isOwnProfile={isOwnProfile} onEdit={handleEdit} />
            ) : (
                <FreelancerProfile user={profileUser} isOwnProfile={isOwnProfile} onEdit={handleEdit} />
            )}
        </div>
    );
};

export default Profile;
