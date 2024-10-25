import { FaExclamationTriangle } from 'react-icons/fa'

interface FormErroProps {
  errorMessage : string
}

const FormError = ({
  errorMessage
} : FormErroProps) => {
  return (
    <div className="flex items-center gap-x-2 text-sm bg-destructive/10 text-destructive shadow-sm rounded-lg p-2" >
      <FaExclamationTriangle className='h-5 w-5'/>
      <p>{errorMessage}</p>
    </div>
  )
}

export default FormError