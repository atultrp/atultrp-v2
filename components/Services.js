import ServiceCard from '@/shared/ServiceCard'
import Accordion from '@/shared/ServiceCard'
import { sectionHeading } from '@/shared/SharedComponents'
import React from 'react'

const Services = () => {
  /*
  Are you looking to establish a strong online presence for your business or showcase your work through a stunning personal website? Look no further! As a passionate web developer, I specialize in crafting high-quality, bespoke websites that leave a lasting impression.

What I Offer:

1. Custom Website Design: I believe in the power of uniqueness. With an eye for aesthetics and a keen understanding of user experience, I create visually captivating designs that resonate with your brand and engage your visitors.

2. Responsive Development: In today's mobile-centric world, a website must look flawless on any device. I employ responsive design techniques to ensure that your website seamlessly adapts to different screen sizes, providing an optimal user experience across all platforms.

3. Cutting-edge Technologies: Staying up-to-date with the latest web technologies is my passion. I harness the power of modern frameworks like ReactJS, Next.js, and cutting-edge front-end tools to build dynamic and interactive websites.

4. Performance Optimization: Speed matters! I optimize websites for lightning-fast loading times, ensuring that your visitors stay engaged and don't bounce due to slow loading pages.

5. SEO-friendly Development: Boost your online visibility and rank higher on search engines. I implement SEO best practices to make your website search engine friendly, helping you reach a wider audience.

6. E-commerce Solutions: Looking to venture into the world of e-commerce? I can create secure and feature-rich online stores that streamline your business operations and delight your customers.

7. Content Management Systems (CMS): Take control of your website's content with a user-friendly CMS. I integrate systems like WordPress to empower you to manage and update your website effortlessly.

8. Ongoing Support: My services don't end with website deployment. I offer ongoing support and maintenance to ensure your website continues to perform optimally.

Why Choose Me?

I'm not just a developer; I'm a partner in your online journey. By collaborating closely with my clients, I gain deep insights into their visions, goals, and target audience. This collaborative approach allows me to deliver customized solutions that reflect your uniqueness and help you achieve your business objectives.

Let's bring your ideas to life and create a digital presence that makes an impact. Reach out to me, and together, we'll build a website that sets you apart from the competition. Your success is my priority!
  */

  const accordionData = [
    {
      title: 'Custom Website Design',
      content: 'Visually engaging websites reflecting your brand and user-focused experience.'
    },
    {
      title: 'Responsive Development',
      content: 'Websites that adapt seamlessly to all devices for optimal user experience.'
    },
    {
      title: 'Cutting-edge Tech',
      content: 'Dynamic websites with ReactJS, Next.js & modern front-end tools.'
    },
    {
      title: 'Performance Optimization',
      content: 'Lightning-fast performance optimized websites for quick loading and user engagement.'
    },
    {
      title: 'SEO-friendly Development',
      content: ' Boost online visibility with search engine friendly websites.'
    },
    {
      title: 'Ongoing Support',
      content: 'Ensure optimal website performance beyond deployment.'
    },
  ]

  return (
    <div>
      {sectionHeading('What I can do', 'Services')}
      <div className='my-3'>
        Are you looking to establish a strong online presence for your business or showcase your work through a stunning personal website? Look no further! As a passionate web developer, I specialize in crafting high-quality, bespoke websites that leave a lasting impression.
      </div>
      <div>
        <h3 className='text-xl font-semibold mt-2'>What I Offer</h3>
        <div className='flex flex-wrap'>
          {accordionData.map((item, index) => (
            <div className='my-3 lg:mr-5 sm:mr-3 mr-1 flex lg:justify-normal justify-center'>
              <ServiceCard key={index} title={item.title} content={item.content} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className='text-xl font-semibold my-3'>Why Choose Me?</h3>
        <div className='space-y-2'>
          <p>
            I'm not just a developer, I'm your online journey partner. Through close collaboration, I understand your vision, goals, and audience. Together, we'll create a unique website that reflects your business objectives and sets you apart.
          </p>
          <p>
            Reach out to me, and let's bring your ideas to life!
          </p>

        </div>
      </div>

    </div>
  )
}

export default Services