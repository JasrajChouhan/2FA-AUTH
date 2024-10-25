"use client";

import BackButton from "@/components/auth/BackButton";
import Header from "@/components/auth/Header";
import Social from "@/components/auth/Social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  showSocial?: boolean;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
}

const CardWrapper = ({
  children,
  showSocial,
  headerLabel,
  backButtonHref,
  backButtonLabel
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md ">
      <CardHeader>
        <Header headerLabel={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {
        showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )
      }
      <CardFooter>
        <BackButton
          backButtonLabel={backButtonLabel}
          backButtonHref={backButtonHref}
        />
      </CardFooter>

    </Card>
  )
}

export default CardWrapper