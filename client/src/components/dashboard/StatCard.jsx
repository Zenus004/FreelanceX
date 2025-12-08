import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

const StatCard = ({ icon: Icon, title, value, bgColor, action }) => (
    <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-center justify-between mb-4">
            <div
                className="p-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: bgColor }}
            >
                <Icon className="w-6 h-6 text-white" />
            </div>
            {action}
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </motion.div>
);

export default StatCard;
