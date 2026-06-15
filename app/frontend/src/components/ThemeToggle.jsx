import { Laptop, Moon, Sun } from "lucide-react";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export default function ThemeToggle({ theme, onThemeChange }) {
  return (
    <div className="theme-toggle" aria-label="Theme preference">
      {themeOptions.map(({ value, label, icon: Icon }) => (
        <button
          type="button"
          key={value}
          className={theme === value ? "active" : ""}
          onClick={() => onThemeChange(value)}
          aria-pressed={theme === value}
          title={`${label} theme`}
        >
          <Icon size={16} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
