type CardProps = {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Card({ title, footer, children }: CardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-md overflow-hidden">
      {title && (
        <div className="px-6 py-4">
          {title}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 flex gap-2">
          {footer}
        </div>
      )}
    </div>
  );
}
