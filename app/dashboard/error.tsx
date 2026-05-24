'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Une erreur est survenue</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 16px',
          background: '#1B8C3E',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
