import { useState, useEffect } from 'react';
import { X, Save, MapPin, Building, Globe } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const EditClientProfileModal = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        location: '',
        companyWebsite: '',
        companyDescription: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                companyName: user.profile?.companyName || user.name || '',
                location: user.profile?.location || '',
                companyWebsite: user.profile?.companyWebsite || '',
                companyDescription: user.profile?.companyDescription || ''
            });
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = {
                name: formData.companyName,
                profile: {
                    companyName: formData.companyName,
                    location: formData.location,
                    companyWebsite: formData.companyWebsite,
                    companyDescription: formData.companyDescription
                }
            };

            const res = await api.patch('/users/profile', updateData);

            toast.success('Company profile updated!');
            onSave(res.data);
            onClose();
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Edit Company Info</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="Acme Inc."
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Headquarters Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g. San Francisco, CA"
                                />
                            </div>
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    name="companyWebsite"
                                    value={formData.companyWebsite}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            About Company
                        </label>
                        <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                            placeholder="Describe your company's mission and culture..."
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClientProfileModal;
