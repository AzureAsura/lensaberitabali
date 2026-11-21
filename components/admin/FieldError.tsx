const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-sm font-medium text-red-500">{msg}</p> : null

export default FieldError
