const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <div className="h-full flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgba(2,0,36,1)] to-[rgba(68,65,66,1)]" >
    {
      children
    }
  </div>
}

export default AuthLayout 