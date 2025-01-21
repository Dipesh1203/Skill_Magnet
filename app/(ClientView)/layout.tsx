export default function ClientView({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full m-0 p-0 h-full">{children}</div>
    </>
  );
}
