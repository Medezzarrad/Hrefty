import React from 'react'
import Feature from './Feature'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMagnifyingGlass, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import '..//..//..//style/homePage/Features/Features.scss'


const Features = () => {
    const content = [
        {
            id : 1,
            title : 'بحث سريع',
            paragraph : 'يوفر الموقع طريقة سهلة وسريعة للعثور على الحرفيين المؤهلين حسب التخصص والموقع الجغرافي، مما يسهل تنفيذ المشاريع والخدمات المطلوبة.',
            icon : faMagnifyingGlass,
        },{
            id : 2,
            title : 'إدارة بسيطة للطلبات',
            paragraph : 'تمكّن من إنشاء وتتبع وإدارة الطلبات والعروض بسهولة باستخدام لوحة تحكم مخصصة لكل مستخدم لمراقبة عملياته بشكل فعال.',
            icon : faBriefcase,
        },{
            id : 3,
            title : 'نظام دفع آمن',
            paragraph : 'يتيح الموقع خيارات دفع آمنة ومرنة لتسهيل المعاملات بين العملاء والحرفيين، مما يوفر تجربة مريحة وخالية من المخاطر لجميع الأطراف.',
            icon : faCreditCard,
        }
    ]
  return (
    <div className='Features'>
      <h1>~ لماذا تختارنا ~</h1>
      <div className='items'>
        {
          content.map((e, index) => <Feature featureId={e.id} featureIcon={e.icon} featureTitle={e.title} featureParagraph={e.paragraph} key={index}/>)
        }
      </div>
    </div>
  )
}

export default Features
