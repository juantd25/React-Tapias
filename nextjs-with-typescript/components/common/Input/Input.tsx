
type Props = {
type:string,
placeholder:string,

}

export default function Input ({type, placeholder}:Props) {
    return (
    <input  type={type} placeholder={placeholder}  />
    )
}
