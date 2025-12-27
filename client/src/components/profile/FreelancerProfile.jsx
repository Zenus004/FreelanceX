import { useState } from 'react';
import { Briefcase, DollarSign, Star, MapPin, Globe, Award, CheckCircle } from 'lucide-react';
import ReviewList from './ReviewList';

const FreelancerProfile = ({ user, isOwnProfile, onEdit }) => {
    const profile = user.profile || {};

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Identity Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-indigo-600">{user.name.charAt(0)}</span>
                </div>

                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-xl text-gray-600 font-medium mt-1">{profile.title || 'Freelancer'}</p>
                            <div className="flex items-center mt-3 space-x-6">
                                <span className="flex items-center text-gray-500">
                                    <MapPin className="w-4 h-4 mr-1.5" />
                                    {profile.location || 'Remote'}
                                </span>
                                <span className="flex items-center text-yellow-600 font-medium">
                                    <Star className="w-4 h-4 mr-1.5 fill-current" />
                                    {profile.rating?.toFixed(1) || 'NEW'} ({profile.reviewCount || 0} reviews)
                                </span>
                                {profile.hourlyRate && (
                                    <span className="flex items-center text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {profile.hourlyRate}/hr
                                    </span>
                                )}
                            </div>
                        </div>
                        {isOwnProfile && (
                            <button
                                onClick={onEdit}
                                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">About Me</h3>
                        <p className="text-gray-700 leading-relaxed max-w-3xl">
                            {profile.bio || 'No bio added yet.'}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {profile.skills?.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Stats & Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Availability</h3>
                        <div className="flex items-center text-green-700 bg-green-50 p-3 rounded-lg mb-4">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Available for work</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total Earnings</span>
                                <span className="font-bold text-gray-900">${(user.stats?.totalEarnings || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Jobs Completed</span>
                                <span className="font-bold text-gray-900">{user.stats?.jobsCompleted || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Portfolio & Reviews */}
                <div className="md:col-span-2 space-y-8">
                    {/* Portfolio Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                            {isOwnProfile && (
                                <button className="text-indigo-600 text-sm font-medium hover:underline">
                                    + Add Item
                                </button>
                            )}
                        </div>

                        {(!profile.portfolio || profile.portfolio.length === 0) ? (
                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500">No portfolio items yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.portfolio.map((item, index) => (
                                    <div key={index} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                                        {item.image && (
                                            <div className="h-40 bg-gray-100 overflow-hidden">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <ReviewList userId={user._id} />
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfile;
