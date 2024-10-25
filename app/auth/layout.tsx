const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <div className="h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#000000] to-[#201f1f] " >
    {
      children
    }
  </div>
}

export default AuthLayout 