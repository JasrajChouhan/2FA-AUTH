'use client';

interface HeaderProps {
  headerLabel: string;
}

const Header = ({
  headerLabel
}: HeaderProps) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center space-y-6"
    >
      <h1
        className="text-3xl text-center font-semibold"
      >🔒 Auth</h1>
      <p>
        {headerLabel}
      </p>
    </div>
  )
}

export default Header