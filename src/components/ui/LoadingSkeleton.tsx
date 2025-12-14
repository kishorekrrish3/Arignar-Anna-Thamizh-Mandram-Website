import { motion } from "framer-motion";

interface LoadingSkeletonProps {
    count?: number;
    className?: string;
}

export function LoadingSkeleton({ count = 3, className = "" }: LoadingSkeletonProps) {
    return (
        <div className={`grid gap-8 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl bg-beige-dark"
                >
                    <div className="animate-pulse">
                        <div className="h-48 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark" />
                        <div className="p-6 space-y-3">
                            <div className="h-6 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-3/4" />
                            <div className="h-4 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-1/2" />
                            <div className="h-4 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-2/3" />
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                </motion.div>
            ))}
        </div>
    );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl bg-beige-dark ${className}`}>
            <div className="animate-pulse p-6 space-y-4">
                <div className="h-12 w-12 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded-full" />
                <div className="space-y-2">
                    <div className="h-8 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-2/3" />
                    <div className="h-4 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-full" />
                    <div className="h-4 bg-gradient-to-r from-beige-dark via-gold/10 to-beige-dark rounded w-5/6" />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
        </div>
    );
}
