import './Skeleton.css';

export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '6px', style = {} }) => (
  <div
    className="skeleton"
    style={{ width, height, borderRadius, ...style }}
  />
);

export const CardSkeleton = () => (
  <div className="card-skeleton">
    <Skeleton height="200px" borderRadius="12px 12px 0 0" />
    <div style={{ padding: '1.25rem' }}>
      <Skeleton height="1.2rem" width="70%" style={{ marginBottom: '0.75rem' }} />
      <Skeleton height="0.9rem" width="40%" style={{ marginBottom: '1rem' }} />
      <Skeleton height="0.85rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton height="0.85rem" width="85%" />
    </div>
  </div>
);
