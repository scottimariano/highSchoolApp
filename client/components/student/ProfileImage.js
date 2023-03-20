import Image from 'next/image'

const loaderProp = ({ src, width, height }) => {
  return src
}

export default function ProfileImage(props) {
    console.log(props)
  return (
    <Image
      loader={loaderProp}
      src={props.src}
      alt={props.alt}
      width={50}
      height={50}
      unoptimized
    />
  )
}