

export default function Button({
  className = "",
  children,
  variant = "primary", // primary | secondary | ghost      // sm | md | lg
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50 p-2 cursor-pointer";
  // const sizes = {
  //   sm: "h-9 px-3 text-sm",
  //   md: "h-11 px-5",
  //   lg: "h-12 px-6 text-lg",
  // };
  const variants = {
    primary: "bg-sandy-beige text-white hover:opacity-80 shadow",
    secondary: "bg-white text-sandy-beige border border-sandy-beige hover:opacity-80",
    ghost: "bg-transparent hover:opacity-80",
  };

  return (
    <button className={`${variants[variant]} ${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
