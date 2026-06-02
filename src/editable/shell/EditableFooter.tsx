'use client'

import Link from 'next/link'
import { Facebook, Rss, Twitter } from 'lucide-react'
import logo from '@/editable/assets/capsigrow-logo.png'

const footerDomain = 'capsigrow.com'

const footerCategories = [
  'Electronics & Gadgets',
  'Air Conditioners & Coolers',
  'Mobiles & Accessories',
  'Computers - Hardware',
  'Cameras',
  'Real Estate',
  'Property for sale',
  'Property for Rent',
  'Commercial Space',
  'Home & Living',
  'Office Supplies',
  'Food Items',
  'Sports Items',
  'Clothing',
  'Professional & Home Services',
  'Architects',
  'Restaurants',
  'Beauty Parlours',
  'Computer - IT',
  'Event Services',
  'Financial & Legal Services',
  'Other Services',
]

export function EditableFooter() {
  return (
    <footer className="bg-[#f4f4f4] text-[#222]">
      <div className="mx-auto max-w-[1180px] px-4 py-8">
        <p className="text-[10px] leading-5">
          {footerCategories.map((item, index) => (
            <span key={item}>
              <Link href="/classified" className="font-semibold hover:text-[#2098d4]">{item}</Link>
              {index < footerCategories.length - 1 ? ' | ' : ' | '}
            </span>
          ))}
          <Link href="/classified" className="font-bold">view all items</Link>
        </p>

        <div className="mt-10 grid gap-8 text-center md:grid-cols-2">
          <div>
            <img src={typeof logo === 'string' ? logo : logo.src} alt="capsigrow logo" className="mx-auto mb-4 h-16 w-16 rounded-full object-cover shadow-[0_4px_18px_rgba(32,152,212,0.25)]" />
            <h3 className="text-xl font-normal">Pages</h3>
            <div className="mt-3 grid gap-1 text-sm">
              <Link href="/contact">Contact Us</Link>
              <Link href="/about">About Us</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        
        </div>
      </div>
      <div className="bg-[#2098d4] px-4 py-5 text-sm text-white">
        <div className="mx-auto max-w-[1180px]">
          Copyright capsigrow &nbsp;|&nbsp; All Rights Reserved &nbsp;|&nbsp;
          <Link href="/" className="underline">{footerDomain}</Link>
          &nbsp;|&nbsp; 24x7 support &nbsp;|&nbsp; Email us : info[at]{footerDomain}
        </div>
      </div>
    </footer>
  )
}
