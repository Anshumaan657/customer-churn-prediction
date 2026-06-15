import ThemeToggle from "./ThemeToggle";

export default function Header({ theme, onThemeChange }) {
  return (
    <header className="app-header">
      <div className="header-copy">
        <div className="header-toolbar">
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>
        <h1>Credit card churn risk workspace</h1>
        <p className="header-text">
          Enter raw customer details and review a clear churn risk summary for
          retention decisions.
        </p>
      </div>
    </header>
  );
}
