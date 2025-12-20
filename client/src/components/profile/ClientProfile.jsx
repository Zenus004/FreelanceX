import { useState } from 'react';
import { Building, MapPin, Globe, Mail, Star } from 'lucide-react';
import ReviewList from './ReviewList';

const ClientProfile = ({ user, isOwnProfile, onEdit }) => {
    const profile = user.profile || {};

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Company Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-10 h-10 text-blue-600" />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profile.companyName || user.name}</h1>
                                <div className="flex items-center mt-2 space-x-6 text-gray-600">
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1.5" />
                                        {profile.companyLocation || 'Remote'}
                                    </span>
                                    {profile.companyWebsite && (
                                        <a href={profile.companyWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                                            <Globe className="w-4 h-4 mr-1.5" />
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                            {isOwnProfile && (
                                <button
                                    onClick={onEdit}
                                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium transition"
                                >
                                    Edit Company Info
                                </button>
                            )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">About the Company</h3>
                            <p className="text-gray-700 leading-relaxed max-w-3xl">
                                {profile.companyDescription || 'No company description added yet.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Stats */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Client Stats</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-2xl font-bold text-gray-900">{profile.rating?.toFixed(1) || '0.0'}</span>
                                <div className="flex text-yellow-400 my-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`w-4 h-4 ${star <= (profile.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">{profile.reviewCount || 0} reviews</span>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Total Spent</span>
                                    <span className="font-bold text-gray-900">${(user.stats?.totalSpent || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Jobs Posted</span>
                                    <span className="font-bold text-gray-900">{user.stats?.totalJobs || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Reviews */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <ReviewList userId={user._id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
