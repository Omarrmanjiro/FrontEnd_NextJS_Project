export default function ProjectNotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Projet introuvable</h1>
      <p>Ce projet n'existe pas ou a été supprimé.</p>
      <a href="/dashboard" style={{ color: '#1B8C3E' }}>
        ← Retour au Dashboard
      </a>
    </div>
  );
}
