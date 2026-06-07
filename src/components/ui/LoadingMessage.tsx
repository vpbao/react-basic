type LoadingMessageProps = {
  message?: string;
};

function LoadingMessage({ message = "Loading..." }: LoadingMessageProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingMessage;
