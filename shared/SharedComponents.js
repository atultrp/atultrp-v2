export const sectionHeading = (subTitle, Title) => {
  return (
    <>
      <h3 className='text-lg sm:text-2xl font-semibold text-gray-300 italic'>{subTitle}</h3>
      <h2 className='text-3xl sm:text-5xl font-bold text-white'>{Title}</h2>
    </>
  )
}