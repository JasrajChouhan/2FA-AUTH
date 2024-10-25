import { FaCheckCircle } from 'react-icons/fa'

interface FormSuccessProps {
  successMessage: string
}

const FormSuccess = ({
  successMessage
}: FormSuccessProps) => {
  return (
    <div className="flex items-center gap-x-2 text-sm bg-emerald-500/15  text-emerald shadow-sm rounded-lg p-2" >
      <FaCheckCircle className='h-5 w-5' />
      <p>{successMessage}</p>
    </div>
  )
}

export default FormSuccess