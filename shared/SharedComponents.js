export const sectionHeading = (subTitle, Title) => {
  return (
    <div>
      <h3 className='text-lg sm:text-2xl font-semibold text-gray-300 italic'>{subTitle}</h3>
      <h2 className='text-4xl font-bold text-white'>{Title}</h2>
    </div>
  )
}