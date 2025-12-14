import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            <div className="h-20 w-20 rounded-full bg-maroon/10 flex items-center justify-center mb-6">
                <Icon className="h-10 w-10 text-maroon" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-3">{title}</h3>
            <p className="text-charcoal-light max-w-md">{description}</p>
        </motion.div>
    );
}
