// Skeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton circle height={128} width={128} />
      <Skeleton height={30} width="80%" />
      <Skeleton height={20} width="60%" />
      <Skeleton height={20} width="90%" />
      <Skeleton height={20} width="100%" />
    </div>
  );
};

export default SkeletonLoader;
