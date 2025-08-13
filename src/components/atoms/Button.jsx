

export default function Button({
  children,
  variant = "primary", // primary | secondary | ghost
  size = "md",         // sm | md | lg
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50";
  // const sizes = {
  //   sm: "h-9 px-3 text-sm",
  //   md: "h-11 px-5",
  //   lg: "h-12 px-6 text-lg",
  // };
  const variants = {
    primary: "bg-sandy-beige text-white hover:opacity-80 shadow",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200",
    ghost: "bg-transparent hover:bg-amber-50",
  };

  return (
    <button className={`bg-sandy-beige text-white hover:opacity-80 shadow ${base}`} {...props}>
      {children}
    </button>
  );
}
