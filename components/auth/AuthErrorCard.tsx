
import CardWrapper from "@/components/auth/CardWrapper";

const AuthErrorCard = () => {

  return (
    <CardWrapper
      headerLabel="Unauthorized Authentication"
      backButtonHref="/"
      backButtonLabel="Go to Home"
    >
      <div className="text-center" >
        ❌❌❌❌❌❌
      </div>
    </CardWrapper>
  )
}

export default AuthErrorCard