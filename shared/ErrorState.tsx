import "@/styles/shared/errorState.css";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Что-то пошло не так", 
  message = "Произошла неизвестная ошибка", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="error-state">
      <svg className="error-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>

      <h3 className="error-state__title">{title}</h3>

      <p className="error-state__message">{message}</p>

      {onRetry && (
        <div className="error-state__action">
          <button
            onClick={onRetry}
            className="error-state__retry-button"
          >
            Попробовать еще
          </button>
        </div>
      )}
    </div>
  );
}