export default function Avatar({ imageUrl, name, className='' }) {
  return (
    <img
      className={`inline-block h-10 w-10 rounded-full ${className}`}
      src={imageUrl}
      alt={name}
    />
  )
}