interface Iprops {
msg:string,
}
const ErrorsMessage = ({msg}:Iprops) => {
  return msg ? <span className="block text-red-700 text-sm">{msg}</span>:null
}

export default ErrorsMessage