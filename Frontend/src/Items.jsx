import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { color, motion } from 'framer-motion';
import { urlFor, client } from './client';
import './Items.scss';

const Items = () => {

  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1});
  const [items, setItems] = useState([]);
  const [filterItem, setFilterItem] = useState([]);

  useEffect(() => {
    const query = '*[_type == "items"]';

    client.fetch(query)
      .then((data) => {
        setItems(data);
        setFilterItem(data);
    });
  }, []);

  const handleItemFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y: 100, opacity: 0}]);
    
    setTimeout(() => {
      setAnimateCard([{y: 0, opacity: 1}]);

      if (item === 'All') {
        setFilterItem(items);
      } else {
        setFilterItem(items.filter((item) => item.tags.includes(item)));
      }
    }, 500);
  }

  return (
    <div className='app__items app__container app__flex app__primarybg'>
      <h2 className='head-text'><span>Education Hub</span></h2>
      <div className='app__item-filter'>
        {['HTML', 'CSS', 'Python', 'Other'].map((item, index) => (
          <div 
          key={index}
          onClick={() => handleItemFilter(item)}
          className={`app__item-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className='app__item-portfolio'
      >
        {filterItem?.map((item, index) => (
          <div className='app__item-item app__flex' key={index}>
            <div className='app__item-img app__flex'>
              <img src={urlFor(item.imgUrl)} alt={item.name} />

              <motion.div
                whileHover={{opacity: [0, 1]}}
                transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                className='app__item-hover app__flex'
              >
                <a href={item.resourceLink} target='_blank' rel="noreferrer">
                  <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{scale: [1, 0.9]}}
                    transition={{duration: 0.25}}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* Project name and details */}
            <div className='app__item-content app__flex'>
              <h4 className='bold-text'>{item.title}</h4>
              <p className='p-text' style={{marginTop: 10}}>{item.description}</p>

              <div className='app__item-tag app__flex'>
                <p className='p-text'>{item.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Items;