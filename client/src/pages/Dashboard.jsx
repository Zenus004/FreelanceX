import { useAuth } from '../context/AuthContext';
import ClientDashboard from './ClientDashboard';
import FreelancerDashboard from './FreelancerDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    if (user.role === 'admin') {
        window.location.href = '/admin';
        return null;
    }

    if (user.role === 'client') {
        return <ClientDashboard />;
    }

    if (user.role === 'freelancer') {
        return <FreelancerDashboard />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Unknown Role</h2>
                <p className="text-gray-500 mt-2">Your account role is not recognized.</p>
            </div>
        </div>
    );
};

export default Dashboard;
