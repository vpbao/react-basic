import { Link } from "react-router";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
};

function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div>
      <h3>{title}</h3>

      {description && <p>{description}</p>}

      {actionLabel && actionTo && (
        <Link to={actionTo}>{actionLabel}</Link>
      )}
    </div>
  );
}

export default EmptyState;
