import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status, type = 'default' }) => {
    const styles = {
        open: 'bg-green-100 text-green-800',
        active: 'bg-blue-100 text-blue-800',
        completed: 'bg-indigo-100 text-indigo-800',
        closed: 'bg-gray-100 text-gray-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
    };

    const icons = {
        open: CheckCircle,
        active: Clock,
        completed: CheckCircle,
        closed: XCircle,
        accepted: CheckCircle,
        rejected: XCircle,
        pending: AlertCircle
    };

    const StatusIcon = icons[status] || AlertCircle;
    const styleClass = styles[status] || 'bg-gray-100 text-gray-800';

    // Override for completed job status in proposals
    if (type === 'job_completed') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
            </span>
        );
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styleClass}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusBadge;
