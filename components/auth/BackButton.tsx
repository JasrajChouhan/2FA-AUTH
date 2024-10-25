import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  backButtonHref: string;
  backButtonLabel: string;
}

const BackButton = ({
  backButtonHref,
  backButtonLabel
}: BackButtonProps) => {
  return (
    <Button
      variant={"link"}
      className="w-full font-normal"
      asChild
      size={"sm"}
    >
      <Link href={backButtonHref} > {backButtonLabel}
      </Link>
    </Button>
  )
}

export default BackButton