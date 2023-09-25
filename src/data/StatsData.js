import React from 'react'
import { GiEarthAmerica } from 'react-icons/gi'
import { MdAirplanemodeActive } from 'react-icons/md'
import { AiFillApi } from 'react-icons/ai'
import { FaMoneyCheck } from 'react-icons/fa'
export const StatsData = [
  {
    icon: (<GiEarthAmerica />),
    title: "Over 100 Destinations",
    desc: "Travel to over 100 unique places",
    css: 'color: #3fffa8;'
  },
  {
    icon: (<MdAirplanemodeActive />),
    title: "1 Million Trips Made",
    desc: "Over 1 million trips completed last year",
    css: 'color: #f3a82e;'
  },
  {
    icon: (<AiFillApi />),
    title: "Faster Support",
    desc: "Access our support team 24/7",
    css: 'color: #f34f2e;'
  },
  {
    icon: (<FaMoneyCheck />),
    title: "Best Deals",
    desc: "We offer the best prices",
    css: 'color: #3af576;'
  },

]