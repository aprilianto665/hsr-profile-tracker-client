interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-bold text-red-500">{error}</div>
    </div>
  );
}