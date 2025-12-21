import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewList = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await api.get(`/reviews/${userId}`);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchReviews();
        }
    }, [userId]);

    if (loading) return <div className="text-center p-4">Loading reviews...</div>;

    if (reviews.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Reviews ({reviews.length})</h3>
            <div className="grid gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={review._id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                                    <User className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{review.reviewer.name}</p>
                                    <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="font-bold text-yellow-700">{review.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                        {review.engagement && (
                            <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-500">
                                Project: <span className="font-medium">{review.engagement.job?.title || 'Contract Work'}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
