import Skeleton from "react-loading-skeleton";

const SkeletonCard = ({ lines = 4, width = "100%", height = "20px", gap = "10px" }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array(lines).fill(null).map((_, i) => (
        <Skeleton key={i} width={width} height={height} />
      ))}
    </div>
  );
};

export default SkeletonCard;
