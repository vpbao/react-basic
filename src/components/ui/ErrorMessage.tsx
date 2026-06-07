type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({
  message = "Something went wrong.",
}: ErrorMessageProps) {
  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
